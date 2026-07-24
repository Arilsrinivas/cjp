export const API_ENDPOINTS = {
  SEND_OTP: '/auth/send-otp',
  VERIFY_OTP: '/auth/verify-otp',
  MEMBER_ME: '/member/me',
  MEMBER_CERTIFICATE: '/member/certificate',
  MEMBER_PDF: '/member/pdf',
  VERIFY_CERTIFICATE: (id: string) => `/verify/${encodeURIComponent(id)}`,
  ADMIN_STATISTICS: '/admin/statistics',
  
  // Protest News & Gallery Endpoints
  NEWS: '/news',
  NEWS_FEATURED: '/news/featured',
  NEWS_TRENDING: '/news/trending',
  NEWS_LATEST: '/news/latest',
  GALLERY: '/gallery',
  TIMELINE: '/timeline',
};
