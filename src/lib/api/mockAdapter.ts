import { Certificate, RegistryStatistics, SendOtpPayload, SendOtpResponse, VerifyOtpPayload, VerifyOtpResponse } from '@/types/registry';
import { generateMockHash } from '@/lib/utils';

const LOCAL_STORAGE_KEY = 'cockroach_registry_db_v1';
const SESSION_STORAGE_KEY = 'cockroach_registry_sessions_v1';

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

function saveSessionData(sessionId: string, payload: SendOtpPayload) {
  if (typeof window === 'undefined') return;
  try {
    const raw = sessionStorage.getItem(SESSION_STORAGE_KEY) || '{}';
    const sessions = JSON.parse(raw);
    sessions[sessionId] = payload;
    sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(sessions));
  } catch (e) {
    console.warn('SessionStorage error:', e);
  }
}

function getSessionData(sessionId: string): SendOtpPayload | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = sessionStorage.getItem(SESSION_STORAGE_KEY);
    if (!raw) return null;
    const sessions = JSON.parse(raw);
    return sessions[sessionId] || null;
  } catch {
    return null;
  }
}

export const mockApiServices = {
  sendOtp: async (payload: SendOtpPayload): Promise<SendOtpResponse> => {
    await new Promise((r) => setTimeout(r, 600));
    const list = getStoredCertificates();
    const cleanInputPhone = payload.phoneNumber.replace(/\D/g, '');
    
    const existing = list.find((c) => {
      const cleanCertPhone = c.phoneNumber.replace(/\D/g, '');
      return cleanCertPhone && cleanCertPhone === cleanInputPhone;
    });

    const sessionId = `SES_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    saveSessionData(sessionId, payload);

    if (existing) {
      return {
        success: true,
        message: 'Mobile number recognized. Existing lifetime certificate retrieved.',
        sessionId,
        existingCertificateId: existing.id,
      };
    }

    return {
      success: true,
      message: 'OTP code sent successfully to your mobile phone number.',
      sessionId,
    };
  },

  verifyOtp: async (payload: VerifyOtpPayload): Promise<VerifyOtpResponse> => {
    await new Promise((r) => setTimeout(r, 800));

    const cleanOtp = payload.otp.trim();
    if (!cleanOtp || cleanOtp.length !== 6 || isNaN(Number(cleanOtp))) {
      throw new Error('Invalid OTP code. Please enter 6 numeric digits.');
    }

    const sessionData = getSessionData(payload.sessionId);
    const list = getStoredCertificates();
    const cleanInputPhone = payload.phoneNumber.replace(/\D/g, '');

    const existing = list.find((c) => {
      const cleanCertPhone = c.phoneNumber.replace(/\D/g, '');
      return cleanCertPhone && cleanCertPhone === cleanInputPhone;
    });

    if (existing) {
      return {
        success: true,
        message: 'OTP verified. Existing lifetime certificate retrieved.',
        certificate: existing,
        isExisting: true,
      };
    }

    const certNumber = `CRC-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;
    const memberName = sessionData?.fullName || 'Verified Cockroach Member';
    const country = sessionData?.country || 'India';

    const newCert: Certificate = {
      id: certNumber,
      certificateNumber: certNumber,
      memberName: memberName,
      phoneNumber: payload.phoneNumber,
      country: country,
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
    await new Promise((r) => setTimeout(r, 400));
    const list = getStoredCertificates();
    const query = certificateId.trim().toUpperCase();
    const found = list.find((c) => c.id.toUpperCase() === query || c.certificateNumber.toUpperCase() === query || c.hash.toLowerCase() === certificateId.toLowerCase());
    return found || null;
  },

  getLatestMemberCertificate: async (): Promise<Certificate | null> => {
    await new Promise((r) => setTimeout(r, 300));
    const list = getStoredCertificates();
    return list[0] || null;
  },

  getStatistics: async (): Promise<RegistryStatistics> => {
    await new Promise((r) => setTimeout(r, 300));
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
