import {
  auth,
  db,
  googleProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  doc,
  setDoc,
  getDoc,
  getDocs,
  collection,
  query,
  where,
  ConfirmationResult,
} from './config';
import { Certificate } from '@/types/registry';
import { generateMockHash } from '@/lib/utils';

// Firestore collection references
const CERTIFICATES_COLLECTION = 'certificates';
const MEMBERS_COLLECTION = 'members';

/**
 * 1. Google OAuth Sign-In
 */
export async function loginWithGoogle(): Promise<{
  user: any;
  certificate: Certificate;
  isExisting: boolean;
}> {
  const result = await signInWithPopup(auth, googleProvider);
  const user = result.user;

  if (!user || !user.email) {
    throw new Error('Google Sign-In did not return a valid user identity.');
  }

  // Check if certificate already exists in Firestore for this email
  const existingCert = await getCertificateByEmailFromFirestore(user.email);
  if (existingCert) {
    return { user, certificate: existingCert, isExisting: true };
  }

  // Create new lifetime certificate
  const certNumber = `CRC-2026-${Math.floor(10000 + Math.random() * 90000)}`;
  const newCert: Certificate = {
    id: certNumber,
    certificateNumber: certNumber,
    memberName: user.displayName || user.email.split('@')[0],
    email: user.email,
    phoneNumber: `Google Verified (${user.email})`,
    country: 'India',
    issueDate: new Date().toISOString(),
    hash: generateMockHash(`${certNumber}-${user.email}-${user.uid}`),
    verificationUrl: `https://registry.cockroach.org/verify/${certNumber}`,
    qrData: `https://registry.cockroach.org/verify/${certNumber}`,
    signature: `SIG_COCKROACH_ED25519_${Math.random().toString(36).substring(2, 18)}`,
    photoUrl: user.photoURL || undefined,
    status: 'VALID',
  };

  await saveCertificateToFirestore(newCert);
  return { user, certificate: newCert, isExisting: false };
}

/**
 * 2. Email & Password Authentication
 */
export async function registerWithEmail(
  email: string,
  pass: string,
  fullName: string
): Promise<{ user: any; certificate: Certificate }> {
  const creds = await createUserWithEmailAndPassword(auth, email, pass);
  const user = creds.user;

  const certNumber = `CRC-2026-${Math.floor(10000 + Math.random() * 90000)}`;
  const newCert: Certificate = {
    id: certNumber,
    certificateNumber: certNumber,
    memberName: fullName || email.split('@')[0],
    email: email,
    phoneNumber: `Email Verified (${email})`,
    country: 'India',
    issueDate: new Date().toISOString(),
    hash: generateMockHash(`${certNumber}-${email}-${user.uid}`),
    verificationUrl: `https://registry.cockroach.org/verify/${certNumber}`,
    qrData: `https://registry.cockroach.org/verify/${certNumber}`,
    signature: `SIG_COCKROACH_ED25519_${Math.random().toString(36).substring(2, 18)}`,
    status: 'VALID',
  };

  await saveCertificateToFirestore(newCert);
  return { user, certificate: newCert };
}

export async function loginWithEmail(
  email: string,
  pass: string
): Promise<{ user: any; certificate: Certificate | null }> {
  const creds = await signInWithEmailAndPassword(auth, email, pass);
  const user = creds.user;
  const cert = await getCertificateByEmailFromFirestore(user.email || email);
  return { user, certificate: cert };
}

/**
 * 3. Phone OTP Authentication
 */
export function initRecaptcha(containerId: string): RecaptchaVerifier {
  if (typeof window === 'undefined') throw new Error('Recaptcha requires browser window context');
  return new RecaptchaVerifier(auth, containerId, {
    size: 'invisible',
    callback: () => {},
  });
}

export async function sendPhoneOtp(
  phoneNumber: string,
  recaptchaVerifier: RecaptchaVerifier
): Promise<ConfirmationResult> {
  return await signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier);
}

export async function verifyPhoneOtp(
  confirmationResult: ConfirmationResult,
  otpCode: string,
  fullName: string
): Promise<{ user: any; certificate: Certificate }> {
  const res = await confirmationResult.confirm(otpCode);
  const user = res.user;

  const existingCert = await getCertificateByPhoneFromFirestore(user.phoneNumber || '');
  if (existingCert) {
    return { user, certificate: existingCert };
  }

  const certNumber = `CRC-2026-${Math.floor(10000 + Math.random() * 90000)}`;
  const newCert: Certificate = {
    id: certNumber,
    certificateNumber: certNumber,
    memberName: fullName || 'Verified Cockroach Member',
    phoneNumber: user.phoneNumber || 'Mobile Verified',
    country: 'India',
    issueDate: new Date().toISOString(),
    hash: generateMockHash(`${certNumber}-${user.phoneNumber}-${user.uid}`),
    verificationUrl: `https://registry.cockroach.org/verify/${certNumber}`,
    qrData: `https://registry.cockroach.org/verify/${certNumber}`,
    signature: `SIG_COCKROACH_ED25519_${Math.random().toString(36).substring(2, 18)}`,
    status: 'VALID',
  };

  await saveCertificateToFirestore(newCert);
  return { user, certificate: newCert };
}

/**
 * 4. Firestore Database Operations
 */
export async function saveCertificateToFirestore(cert: Certificate): Promise<void> {
  try {
    const certRef = doc(db, CERTIFICATES_COLLECTION, cert.id);
    await setDoc(certRef, cert, { merge: true });

    // Also mirror to local storage for offline resilience
    if (typeof window !== 'undefined') {
      const key = 'cockroach_registry_db_v1';
      const raw = localStorage.getItem(key) || '[]';
      const list: Certificate[] = JSON.parse(raw);
      const idx = list.findIndex((c) => c.id === cert.id);
      if (idx >= 0) list[idx] = cert;
      else list.unshift(cert);
      localStorage.setItem(key, JSON.stringify(list));
    }
  } catch (err) {
    console.warn('Firestore save notice:', err);
  }
}

export async function getCertificateFromFirestore(idOrHashOrEmail: string): Promise<Certificate | null> {
  try {
    const queryTerm = idOrHashOrEmail.trim();

    // 1. Search by document ID
    const docRef = doc(db, CERTIFICATES_COLLECTION, queryTerm.toUpperCase());
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data() as Certificate;
    }

    // 2. Query by email
    const emailQuery = query(collection(db, CERTIFICATES_COLLECTION), where('email', '==', queryTerm.toLowerCase()));
    const emailSnap = await getDocs(emailQuery);
    if (!emailSnap.empty) {
      return emailSnap.docs[0].data() as Certificate;
    }

    // 3. Query by certificateNumber
    const certQuery = query(collection(db, CERTIFICATES_COLLECTION), where('certificateNumber', '==', queryTerm.toUpperCase()));
    const certSnap = await getDocs(certQuery);
    if (!certSnap.empty) {
      return certSnap.docs[0].data() as Certificate;
    }
  } catch (err) {
    console.warn('Firestore query notice:', err);
  }
  return null;
}

export async function getCertificateByEmailFromFirestore(email: string): Promise<Certificate | null> {
  try {
    const q = query(collection(db, CERTIFICATES_COLLECTION), where('email', '==', email.toLowerCase()));
    const snap = await getDocs(q);
    if (!snap.empty) {
      return snap.docs[0].data() as Certificate;
    }
  } catch (e) {
    console.warn('Firestore email query notice:', e);
  }
  return null;
}

export async function getCertificateByPhoneFromFirestore(phone: string): Promise<Certificate | null> {
  try {
    const q = query(collection(db, CERTIFICATES_COLLECTION), where('phoneNumber', '==', phone));
    const snap = await getDocs(q);
    if (!snap.empty) {
      return snap.docs[0].data() as Certificate;
    }
  } catch (e) {
    console.warn('Firestore phone query notice:', e);
  }
  return null;
}
