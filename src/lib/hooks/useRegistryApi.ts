import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { registryApi } from '../api/client';
import { SendOtpPayload, VerifyOtpPayload } from '@/types/registry';

export const QUERY_KEYS = {
  STATISTICS: ['registry', 'statistics'],
  CERTIFICATE: (id?: string) => ['registry', 'certificate', id || 'me'],
  MEMBER: ['registry', 'member'],
  NEWS: ['registry', 'news'],
  NEWS_FEATURED: ['registry', 'news', 'featured'],
  NEWS_TRENDING: ['registry', 'news', 'trending'],
  ARTICLE: (id: string) => ['registry', 'article', id],
  GALLERY: ['registry', 'gallery'],
  HERO_IMAGES: ['registry', 'hero-images'],
  TIMELINE: ['registry', 'timeline'],
};

export function useRegistryStatistics() {
  return useQuery({
    queryKey: QUERY_KEYS.STATISTICS,
    queryFn: () => registryApi.getStatistics(),
    staleTime: 1000 * 60 * 5,
    refetchInterval: 1000 * 30,
  });
}

export function useCertificate(id?: string) {
  return useQuery({
    queryKey: QUERY_KEYS.CERTIFICATE(id),
    queryFn: () => registryApi.getCertificate(id),
    enabled: true,
  });
}

export function useSendOtpMutation() {
  return useMutation({
    mutationFn: (payload: SendOtpPayload) => registryApi.sendOtp(payload),
  });
}

export function useVerifyOtpMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: VerifyOtpPayload) => registryApi.verifyOtp(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.STATISTICS });
      queryClient.invalidateQueries({ queryKey: ['registry', 'certificate'] });
    },
  });
}

// 60-Minute Background Auto-Refresh Configuration (3,600,000 ms)
const ONE_HOUR_MS = 1000 * 60 * 60;

export function useLatestNews() {
  return useQuery({
    queryKey: QUERY_KEYS.NEWS,
    queryFn: () => registryApi.getNews(),
    staleTime: ONE_HOUR_MS,
    refetchInterval: ONE_HOUR_MS,
  });
}

export function useFeaturedNews() {
  return useQuery({
    queryKey: QUERY_KEYS.NEWS_FEATURED,
    queryFn: () => registryApi.getFeaturedNews(),
    staleTime: ONE_HOUR_MS,
    refetchInterval: ONE_HOUR_MS,
  });
}

export function useTrendingNews() {
  return useQuery({
    queryKey: QUERY_KEYS.NEWS_TRENDING,
    queryFn: () => registryApi.getTrendingNews(),
    staleTime: ONE_HOUR_MS,
    refetchInterval: ONE_HOUR_MS,
  });
}

export function useArticle(id: string) {
  return useQuery({
    queryKey: QUERY_KEYS.ARTICLE(id),
    queryFn: () => registryApi.getArticleById(id),
    enabled: Boolean(id),
  });
}

export function useGalleryImages() {
  return useQuery({
    queryKey: QUERY_KEYS.GALLERY,
    queryFn: () => registryApi.getGalleryImages(),
    staleTime: ONE_HOUR_MS,
    refetchInterval: ONE_HOUR_MS,
  });
}

export function useHeroImages() {
  return useQuery({
    queryKey: QUERY_KEYS.HERO_IMAGES,
    queryFn: () => registryApi.getHeroImages(),
    staleTime: ONE_HOUR_MS,
    refetchInterval: ONE_HOUR_MS,
  });
}

export function useTimelineEvents() {
  return useQuery({
    queryKey: QUERY_KEYS.TIMELINE,
    queryFn: () => registryApi.getTimelineEvents(),
    staleTime: ONE_HOUR_MS,
    refetchInterval: ONE_HOUR_MS,
  });
}
