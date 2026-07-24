export interface Member {
  id: string;
  fullName: string;
  email?: string;
  phoneNumber?: string;
  countryCode?: string;
  country: string;
  certificateNumber: string;
  issueDate: string;
  hash: string;
  verificationUrl: string;
  photoUrl?: string;
  status: 'ACTIVE' | 'REVOKED' | 'SUSPENDED';
}

export interface Certificate {
  id: string;
  certificateNumber: string;
  memberName: string;
  email?: string;
  phoneNumber?: string;
  country: string;
  issueDate: string;
  hash: string;
  verificationUrl: string;
  qrData: string;
  signature: string;
  photoUrl?: string;
  status: 'VALID' | 'INVALID' | 'EXPIRED';
}

export interface GoogleAuthPayload {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  country?: string;
}

export interface GoogleAuthResponse {
  success: boolean;
  message: string;
  certificate: Certificate;
  isExisting: boolean;
}

export interface SendOtpPayload {
  fullName: string;
  phoneNumber: string;
  countryCode: string;
  country: string;
}

export interface SendOtpResponse {
  success: boolean;
  message: string;
  sessionId: string;
  existingCertificateId?: string;
}

export interface VerifyOtpPayload {
  sessionId: string;
  otp: string;
  phoneNumber: string;
}

export interface VerifyOtpResponse {
  success: boolean;
  message: string;
  certificate: Certificate;
  isExisting: boolean;
}

export interface RegistryStatistics {
  totalCertificates: number;
  todaysCertificates: number;
  countriesCount: number;
  latestMembershipNumber: string;
  latestHash: string;
}

export interface NewsArticle {
  id: string;
  headline: string;
  summary: string;
  category: string;
  imageUrl?: string;
  source: string;
  author?: string;
  url: string;
  publishedAt: string;
  publishedTime?: string;
  isFeatured?: boolean;
  isTrending?: boolean;
  content?: string;
}

export interface GalleryImage {
  id: string;
  url: string;
  title: string;
  caption: string;
  source: string;
  publishedAt: string;
}

export interface HeroImage {
  id: string;
  url: string;
  title: string;
  subtitle: string;
  articleId?: string;
}

export interface TimelineEvent {
  id: string;
  date: string;
  headline: string;
  description: string;
  imageUrl?: string;
  category: string;
}
