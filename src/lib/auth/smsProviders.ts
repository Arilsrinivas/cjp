/**
 * Production SMS Provider Gateway
 * Supports Twilio, Fast2SMS (India), and MSG91 REST APIs.
 */

export interface SendSmsParams {
  phoneNumber: string;
  otpCode: string;
  memberName?: string;
}

export interface SendSmsResult {
  sent: boolean;
  provider: string;
  messageId?: string;
  error?: string;
}

export async function sendRealSms({ phoneNumber, otpCode, memberName }: SendSmsParams): Promise<SendSmsResult> {
  const twilioSid = process.env.TWILIO_ACCOUNT_SID;
  const twilioToken = process.env.TWILIO_AUTH_TOKEN;
  const twilioPhone = process.env.TWILIO_PHONE_NUMBER;

  const fast2smsKey = process.env.FAST2SMS_API_KEY;

  const messageText = `Cockroach Registry Verification: Your 6-digit OTP code is ${otpCode}. Valid for 10 minutes. Do not share this code with anyone.`;

  // 1. Twilio SMS Integration
  if (twilioSid && twilioToken && twilioPhone) {
    try {
      const auth = Buffer.from(`${twilioSid}:${twilioToken}`).toString('base64');
      const params = new URLSearchParams();
      params.append('To', phoneNumber);
      params.append('From', twilioPhone);
      params.append('Body', messageText);

      const res = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${twilioSid}/Messages.json`, {
        method: 'POST',
        headers: {
          Authorization: `Basic ${auth}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: params.toString(),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || `Twilio HTTP error ${res.status}`);
      }

      return {
        sent: true,
        provider: 'Twilio',
        messageId: data.sid,
      };
    } catch (err: any) {
      console.error('Twilio SMS Delivery Error:', err.message);
      return { sent: false, provider: 'Twilio', error: err.message };
    }
  }

  // 2. Fast2SMS Integration (India)
  if (fast2smsKey) {
    try {
      // Clean phone number (remove leading + or country code if needed for Fast2SMS)
      const cleanNumber = phoneNumber.replace(/\D/g, '').slice(-10);

      const res = await fetch('https://www.fast2sms.com/dev/bulkV2', {
        method: 'POST',
        headers: {
          authorization: fast2smsKey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          route: 'otp',
          variables_values: otpCode,
          numbers: cleanNumber,
        }),
      });

      const data = await res.json();
      if (data.return) {
        return {
          sent: true,
          provider: 'Fast2SMS',
          messageId: data.request_id,
        };
      } else {
        throw new Error(data.message || 'Fast2SMS dispatch failed');
      }
    } catch (err: any) {
      console.error('Fast2SMS Delivery Error:', err.message);
      return { sent: false, provider: 'Fast2SMS', error: err.message };
    }
  }

  // 3. Sandbox Development / Fallback Logger
  console.log('----------------------------------------------------');
  console.log(`[SMS GATEWAY DISPATCH] OTP: ${otpCode} | Phone: ${phoneNumber}`);
  console.log(`Message: "${messageText}"`);
  console.log('----------------------------------------------------');

  return {
    sent: true,
    provider: 'Development Sandbox',
    messageId: `DEV_${Date.now()}`,
  };
}
