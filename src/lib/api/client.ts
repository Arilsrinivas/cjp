import axios from 'axios';
import { API_ENDPOINTS } from './endpoints';
import { mockApiServices } from './mockAdapter';
import { newsServices } from './newsAdapter';
import { SendOtpPayload, VerifyOtpPayload } from '@/types/registry';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.cockroach.org/v1';

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
      const res = await apiClient.post(API_ENDPOINTS.SEND_OTP, payload);
      return res.data;
    } catch {
      return mockApiServices.sendOtp(payload);
    }
  },

  verifyOtp: async (payload: VerifyOtpPayload) => {
    try {
      const res = await apiClient.post(API_ENDPOINTS.VERIFY_OTP, payload);
      return res.data;
    } catch {
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

  // Live Protest News & Imagery REST Handlers
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
