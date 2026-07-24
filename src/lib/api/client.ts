import axios from 'axios';
import { API_ENDPOINTS } from './endpoints';
import { mockApiServices } from './mockAdapter';
import { newsServices } from './newsAdapter';
import { getCertificateFromFirestore } from '@/lib/firebase/services';
import { SendOtpPayload, VerifyOtpPayload } from '@/types/registry';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const registryApi = {
  sendOtp: async (payload: SendOtpPayload) => {
    try {
      const res = await apiClient.post('/api/auth/send-otp', payload);
      return res.data;
    } catch (err: any) {
      if (err.response?.data) return err.response.data;
      return mockApiServices.sendOtp(payload);
    }
  },

  verifyOtp: async (payload: VerifyOtpPayload) => {
    try {
      const res = await apiClient.post('/api/auth/verify-otp', payload);
      return res.data;
    } catch (err: any) {
      if (err.response?.data) throw new Error(err.response.data.message || 'OTP verification failed');
      return mockApiServices.verifyOtp(payload);
    }
  },

  getMemberMe: async () => {
    try {
      const res = await apiClient.get(API_ENDPOINTS.MEMBER_ME);
      return res.data;
    } catch {
      return mockApiServices.getLatestMemberCertificate();
    }
  },

  getCertificate: async (certificateId?: string) => {
    if (certificateId) {
      try {
        const firestoreCert = await getCertificateFromFirestore(certificateId);
        if (firestoreCert) return firestoreCert;
      } catch (e) {
        console.warn('Firestore lookup notice:', e);
      }

      try {
        const res = await apiClient.get(API_ENDPOINTS.VERIFY_CERTIFICATE(certificateId));
        return res.data;
      } catch {
        return mockApiServices.getCertificateById(certificateId);
      }
    }
    try {
      const res = await apiClient.get(API_ENDPOINTS.MEMBER_CERTIFICATE);
      return res.data;
    } catch {
      return mockApiServices.getLatestMemberCertificate();
    }
  },

  getStatistics: async () => {
    try {
      const res = await apiClient.get(API_ENDPOINTS.ADMIN_STATISTICS);
      return res.data;
    } catch {
      return mockApiServices.getStatistics();
    }
  },

  getNews: async () => {
    try {
      const res = await apiClient.get(API_ENDPOINTS.NEWS);
      return res.data;
    } catch {
      return newsServices.fetchNews();
    }
  },

  getFeaturedNews: async () => {
    try {
      const res = await apiClient.get(API_ENDPOINTS.NEWS_FEATURED);
      return res.data;
    } catch {
      return newsServices.fetchFeaturedNews();
    }
  },

  getTrendingNews: async () => {
    try {
      const res = await apiClient.get(API_ENDPOINTS.NEWS_TRENDING);
      return res.data;
    } catch {
      return newsServices.fetchTrendingNews();
    }
  },

  getGalleryImages: async () => {
    try {
      const res = await apiClient.get(API_ENDPOINTS.GALLERY);
      return res.data;
    } catch {
      return newsServices.fetchGalleryImages();
    }
  },

  getHeroImages: async () => {
    try {
      const res = await apiClient.get('/news/hero-images');
      return res.data;
    } catch {
      return newsServices.fetchHeroImages();
    }
  },

  getTimelineEvents: async () => {
    try {
      const res = await apiClient.get(API_ENDPOINTS.TIMELINE);
      return res.data;
    } catch {
      return newsServices.fetchTimelineEvents();
    }
  },

  getArticleById: async (id: string) => {
    try {
      const res = await apiClient.get(`/news/${encodeURIComponent(id)}`);
      return res.data;
    } catch {
      return newsServices.getArticleById(id);
    }
  },
};
