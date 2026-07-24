import crypto from 'crypto';

const SECRET_KEY = process.env.OTP_SECRET_KEY || 'cockroach_registry_super_secret_hmac_key_2026';

export interface OtpSession {
  sessionId: string;
  sessionToken: string;
  otpCode: string;
  expiresAt: number;
}

export function generate6DigitOtp(): string {
  const array = new Uint32Array(1);
  crypto.getRandomValues(array);
  const code = (array[0] % 900000) + 100000;
  return code.toString();
}

export function createHmacToken(payload: {
  sessionId: string;
  otpCode: string;
  phoneNumber: string;
  expiresAt: number;
}): string {
  const data = `${payload.sessionId}:${payload.otpCode}:${payload.phoneNumber}:${payload.expiresAt}`;
  const hmac = crypto.createHmac('sha256', SECRET_KEY);
  hmac.update(data);
  const signature = hmac.digest('hex');
  return `${Buffer.from(data).toString('base64')}.${signature}`;
}

export function verifyHmacToken(
  sessionToken: string,
  providedOtp: string,
  providedPhone: string
): { valid: boolean; reason?: string } {
  try {
    const [base64Data, signature] = sessionToken.split('.');
    if (!base64Data || !signature) {
      return { valid: false, reason: 'Malformed session token.' };
    }

    const rawData = Buffer.from(base64Data, 'base64').toString('utf-8');
    const [sessionId, expectedOtp, expectedPhone, expiresAtStr] = rawData.split(':');

    const expiresAt = parseInt(expiresAtStr, 10);
    if (Date.now() > expiresAt) {
      return { valid: false, reason: 'OTP code has expired. Please request a new code.' };
    }

    // Verify HMAC Signature
    const hmac = crypto.createHmac('sha256', SECRET_KEY);
    hmac.update(rawData);
    const expectedSignature = hmac.digest('hex');

    if (signature !== expectedSignature) {
      return { valid: false, reason: 'Invalid or tampered session token.' };
    }

    // Compare OTP code
    if (expectedOtp !== providedOtp.trim()) {
      return { valid: false, reason: 'Incorrect OTP code entered.' };
    }

    // Compare Phone
    const cleanExpected = expectedPhone.replace(/\D/g, '');
    const cleanProvided = providedPhone.replace(/\D/g, '');
    if (cleanExpected !== cleanProvided) {
      return { valid: false, reason: 'Phone number mismatch.' };
    }

    return { valid: true };
  } catch (err) {
    return { valid: false, reason: 'Failed to parse OTP session token.' };
  }
}
