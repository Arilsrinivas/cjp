import { Certificate, RegistryStatistics, SendOtpPayload, SendOtpResponse, VerifyOtpPayload, VerifyOtpResponse } from '@/types/registry';
import { generateMockHash } from '@/lib/utils';

const LOCAL_STORAGE_KEY = 'cockroach_registry_db_v1';

const INITIAL_CERTIFICATES: Certificate[] = [
  {
    id: 'CRC-2026-89421',
    certificateNumber: 'CRC-2026-89421',
    memberName: 'Alex Rivera',
    phoneNumber: '+1 555-0198',
    country: 'United States',
    issueDate: '2026-03-15T10:30:00Z',
    hash: '0x8f4b9a12c4e78d90f11a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e',
    verificationUrl: 'https://registry.cockroach.org/verify/CRC-2026-89421',
    qrData: 'https://registry.cockroach.org/verify/CRC-2026-89421',
    signature: 'SIG_COCKROACH_ED25519_8f4b9a12c4e78d90f11a2b3c4d5e',
    status: 'VALID',
  },
  {
    id: 'CRC-2026-00001',
    certificateNumber: 'CRC-2026-00001',
    memberName: 'Elena Rostova',
    phoneNumber: '+44 7700 900077',
    country: 'United Kingdom',
    issueDate: '2026-01-01T00:00:00Z',
    hash: '0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b',
    verificationUrl: 'https://registry.cockroach.org/verify/CRC-2026-00001',
    qrData: 'https://registry.cockroach.org/verify/CRC-2026-00001',
    signature: 'SIG_COCKROACH_ED25519_1a2b3c4d5e6f7a8b9c0d1e2f3a4b',
    status: 'VALID',
  }
];

function getStoredCertificates(): Certificate[] {
  if (typeof window === 'undefined') return INITIAL_CERTIFICATES;
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(INITIAL_CERTIFICATES));
      return INITIAL_CERTIFICATES;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_CERTIFICATES;
  }
}

function saveCertificate(cert: Certificate) {
  if (typeof window === 'undefined') return;
  const list = getStoredCertificates();
  const index = list.findIndex(c => c.id === cert.id || c.phoneNumber === cert.phoneNumber);
  if (index >= 0) {
    list[index] = cert;
  } else {
    list.unshift(cert);
  }
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(list));
}

// Temporary in-memory session cache for OTP verification flow
const activeSessions = new Map<string, SendOtpPayload>();

export const mockApiServices = {
  sendOtp: async (payload: SendOtpPayload): Promise<SendOtpResponse> => {
    await new Promise((r) => setTimeout(r, 800)); // Simulate realistic network delay
    const list = getStoredCertificates();
    const existing = list.find((c) => c.phoneNumber.replace(/\s+/g, '') === payload.phoneNumber.replace(/\s+/g, ''));

    const sessionId = `SES_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    activeSessions.set(sessionId, payload);

    if (existing) {
      return {
        success: true,
        message: 'Mobile number recognized. A certificate already exists for this number.',
        sessionId,
        existingCertificateId: existing.id,
      };
    }

    return {
      success: true,
      message: 'OTP sent successfully to your mobile number. (Use demo OTP: 123456)',
      sessionId,
    };
  },

  verifyOtp: async (payload: VerifyOtpPayload): Promise<VerifyOtpResponse> => {
    await new Promise((r) => setTimeout(r, 1000));

    // For demo purposes, any 6 digit code or '123456' works
    if (!payload.otp || payload.otp.length !== 6) {
      throw new Error('Invalid OTP format. Must be 6 digits.');
    }

    const sessionData = activeSessions.get(payload.sessionId);
    const list = getStoredCertificates();
    const existing = list.find((c) => c.phoneNumber.replace(/\s+/g, '') === payload.phoneNumber.replace(/\s+/g, ''));

    if (existing) {
      return {
        success: true,
        message: 'OTP verified. Existing lifetime certificate retrieved.',
        certificate: existing,
        isExisting: true,
      };
    }

    // Create new lifetime certificate
    const certNumber = `CRC-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;
    const newCert: Certificate = {
      id: certNumber,
      certificateNumber: certNumber,
      memberName: sessionData?.fullName || 'Anonymous Cockroach Member',
      phoneNumber: payload.phoneNumber,
      country: sessionData?.country || 'Global',
      issueDate: new Date().toISOString(),
      hash: generateMockHash(`${certNumber}-${payload.phoneNumber}-${Date.now()}`),
      verificationUrl: `https://registry.cockroach.org/verify/${certNumber}`,
      qrData: `https://registry.cockroach.org/verify/${certNumber}`,
      signature: `SIG_COCKROACH_ED25519_${Math.random().toString(36).substring(2, 18)}`,
      status: 'VALID',
    };

    saveCertificate(newCert);

    return {
      success: true,
      message: 'OTP verified! Lifetime certificate issued successfully.',
      certificate: newCert,
      isExisting: false,
    };
  },

  getCertificateById: async (certificateId: string): Promise<Certificate | null> => {
    await new Promise((r) => setTimeout(r, 500));
    const list = getStoredCertificates();
    const query = certificateId.trim().toUpperCase();
    const found = list.find((c) => c.id.toUpperCase() === query || c.certificateNumber.toUpperCase() === query || c.hash.toLowerCase() === certificateId.toLowerCase());
    return found || null;
  },

  getLatestMemberCertificate: async (): Promise<Certificate | null> => {
    await new Promise((r) => setTimeout(r, 400));
    const list = getStoredCertificates();
    return list[0] || null;
  },

  getStatistics: async (): Promise<RegistryStatistics> => {
    await new Promise((r) => setTimeout(r, 400));
    const list = getStoredCertificates();
    return {
      totalCertificates: 48920 + list.length,
      todaysCertificates: 342,
      countriesCount: 148,
      latestMembershipNumber: list[0]?.certificateNumber || 'CRC-2026-89421',
      latestHash: list[0]?.hash || '0x8f4b9a12c4e78d90f11a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e',
    };
  },
};
