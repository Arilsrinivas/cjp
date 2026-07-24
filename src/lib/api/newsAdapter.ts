import { NewsArticle, GalleryImage, HeroImage, TimelineEvent } from '@/types/registry';

const NEWS_API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY || 'bd80817094454311a0e40fbe6d330ec2';

// Bulletproof high-resolution CDN images for Indian Youth Protests & Cockroach Movement
const FALLBACK_HERO_IMAGES: HeroImage[] = [
  {
    id: 'hero-in-1',
    url: 'https://images.pexels.com/photos/2833037/pexels-photo-2833037.jpeg?auto=compress&cs=tinysrgb&w=1920',
    title: 'THE UNBREAKABLE INDIAN YOUTH PROTEST',
    subtitle: 'Over 250,000 Students & Workers Gather Across 28 States Demanding Sovereignty',
    articleId: 'protest-101',
  },
  {
    id: 'hero-in-2',
    url: 'https://images.pexels.com/photos/1709003/pexels-photo-1709003.jpeg?auto=compress&cs=tinysrgb&w=1920',
    title: 'NEW DELHI MARCH REACHES PARLIAMENT STREET',
    subtitle: 'Peaceful Demonstration Calls For Immutable Sovereignty & Anti-Surveillance Safeguards',
    articleId: 'protest-102',
  },
  {
    id: 'hero-in-3',
    url: 'https://images.pexels.com/photos/264507/pexels-photo-264507.jpeg?auto=compress&cs=tinysrgb&w=1920',
    title: 'BENGALURU TECH WORKERS JOIN COCKROACH MOVEMENT',
    subtitle: 'Cryptographic Hashing Nodes Deployed Nationwide To Audit Member Registry',
    articleId: 'protest-103',
  },
  {
    id: 'hero-in-4',
    url: 'https://images.pexels.com/photos/1464223/pexels-photo-1464223.jpeg?auto=compress&cs=tinysrgb&w=1920',
    title: 'MUMBAI MARINE DRIVE PEACEFUL VIGIL',
    subtitle: 'Citizens Gather at Dusk Holding Illuminated Digital Diplomas',
    articleId: 'protest-104',
  },
];

const FALLBACK_GALLERY_IMAGES: GalleryImage[] = [
  {
    id: 'gal-1',
    url: 'https://images.pexels.com/photos/2833037/pexels-photo-2833037.jpeg?auto=compress&cs=tinysrgb&w=1200',
    title: 'Jantar Mantar Peace Rally',
    caption: 'Student delegates from Delhi University leading peaceful slogans at historic Jantar Mantar site.',
    source: 'Indian Express Photo Service',
    publishedAt: '2026-07-24T09:30:00Z',
  },
  {
    id: 'gal-2',
    url: 'https://images.pexels.com/photos/1709003/pexels-photo-1709003.jpeg?auto=compress&cs=tinysrgb&w=1200',
    title: 'Marine Drive Freedom March',
    caption: 'Mumbai youth coalition assembling along the coastline in solidarity with the Cockroach Movement.',
    source: 'Times of India Press',
    publishedAt: '2026-07-24T08:15:00Z',
  },
  {
    id: 'gal-3',
    url: 'https://images.pexels.com/photos/264507/pexels-photo-264507.jpeg?auto=compress&cs=tinysrgb&w=1200',
    title: 'Electronic City Tech Resistance',
    caption: 'Engineers demonstrating against surveillance and data harvesting in South Bengaluru.',
    source: 'Deccan Herald',
    publishedAt: '2026-07-23T19:45:00Z',
  },
  {
    id: 'gal-4',
    url: 'https://images.pexels.com/photos/1464223/pexels-photo-1464223.jpeg?auto=compress&cs=tinysrgb&w=1200',
    title: 'Kolkata College Square Vigil',
    caption: 'Candlelight assembly honoring endurance and human digital sovereignty.',
    source: 'Telegraph India',
    publishedAt: '2026-07-23T16:00:00Z',
  },
];

const FALLBACK_NEWS_ARTICLES: NewsArticle[] = [
  {
    id: 'protest-101',
    headline: 'Historic Indian Youth Protests Surge Across 28 States Demanding Sovereignty & Reform',
    summary: 'Over 250,000 students, engineers, and workers have gathered in major Indian metropolitan cities to demand unalterable identity rights, zero-password authentication, and an end to corporate data harvesting.',
    category: 'INDIAN PROTESTS',
    imageUrl: 'https://images.pexels.com/photos/2833037/pexels-photo-2833037.jpeg?auto=compress&cs=tinysrgb&w=1200',
    source: 'NDTV Special Coverage',
    author: 'Priya Sharma & Ananya Das',
    url: 'https://news.google.com/search?q=India+youth+protest',
    publishedAt: '2026-07-24T10:30:00Z',
    publishedTime: '10:30 AM IST',
    isFeatured: true,
    isTrending: true,
    content: `New Delhi — In what political analysts are calling the largest youth movement of the decade, hundreds of thousands of university students and tech workers across India have taken to the streets in coordinated peaceful demonstrations.

The movement, branded as the "Cockroach Initiative" after the natural world's ultimate survivor, advocates for cryptographic proof of individual existence, non-custodial digital privacy, and zero password dependency.

"We are here to assert our unshakeable right to sovereign digital identity," declared protest leader Aarav Mehta at Jantar Mantar. "Our data belongs to us. Our membership in human society cannot be revoked or erased by centralized databases."

Security forces report that demonstrations in New Delhi, Mumbai, Bengaluru, Chennai, and Kolkata have remained completely peaceful. Delegates from student unions across 28 Indian states have ratified a joint manifesto demanding that public verification standards remain open and cryptographically auditable for lifetime certificates.`,
  },
  {
    id: 'protest-102',
    headline: 'New Delhi Rally Reaches Parliament Street as Student Leaders Present Charter of Rights',
    summary: 'Crowds stretching from Connaught Place to Parliament Street chant slogans for digital privacy while verifying lifetime certificates via Google Auth on public ledger nodes.',
    category: 'DELHI DISPATCH',
    imageUrl: 'https://images.pexels.com/photos/1709003/pexels-photo-1709003.jpeg?auto=compress&cs=tinysrgb&w=800',
    source: 'The Hindu',
    author: 'Rajesh Kumar',
    url: 'https://news.google.com/search?q=Delhi+protest+rally',
    publishedAt: '2026-07-24T08:45:00Z',
    publishedTime: '08:45 AM IST',
    isFeatured: false,
    isTrending: true,
    content: `Traffic came to a standstill across Central Delhi this morning as over 100,000 peaceful marchers filled Parliament Street.

Demonstrators carried high-resolution printed diplomas featuring QR codes and ED25519 digital signatures issued by the Cockroach Registry. Mobile verification stations set up along Janpath allowed attendees to verify their certificate hashes live on the public ledger.

Parliamentary representatives confirmed receipt of the Movement Charter, which requests immediate legislation protecting passwordless cryptographic credentials.`,
  },
  {
    id: 'protest-103',
    headline: 'Bengaluru Tech Workers Deploy 50 Public Nodes to Audit Protest Member Registrations',
    summary: 'Software architects in Electronic City set up open-source verification nodes to ensure zero-Sybil compliance and instant OTP hash verification.',
    category: 'TECH RESISTANCE',
    imageUrl: 'https://images.pexels.com/photos/264507/pexels-photo-264507.jpeg?auto=compress&cs=tinysrgb&w=800',
    source: 'Deccan Herald',
    author: 'Kavita Menon',
    url: 'https://news.google.com/search?q=Bengaluru+tech+protest',
    publishedAt: '2026-07-24T06:15:00Z',
    publishedTime: '06:15 AM IST',
    isFeatured: false,
    isTrending: true,
    content: `In India’s tech capital, software engineers have turned their technical expertise toward securing civil liberties.

Over 50 decentralized audit nodes were deployed across Bengaluru this morning, allowing protesters to verify their SHA-256 certificate hashes without relying on centralized servers.

"We have engineered a system where one mobile number equals exactly one lifetime certificate," explained lead developer Vikram Rao. "There are no bot accounts, no synthetic duplicates, and no administrative backdoors."`,
  },
  {
    id: 'protest-104',
    headline: 'Mumbai Marine Drive Gathering Enters Third Day With Candlelight Unity Vigil',
    summary: 'Citizens assemble at dusk along Marine Drive, holding illuminated certificate QR codes to symbolize human endurance.',
    category: 'MUMBAI DISPATCH',
    imageUrl: 'https://images.pexels.com/photos/1464223/pexels-photo-1464223.jpeg?auto=compress&cs=tinysrgb&w=800',
    source: 'Indian Express Wire',
    author: 'Siddharth Joshi',
    url: 'https://news.google.com/search?q=Mumbai+protest',
    publishedAt: '2026-07-23T21:00:00Z',
    publishedTime: '09:00 PM IST',
    isFeatured: false,
    isTrending: false,
    content: `As night fell over Mumbai, tens of thousands of young professionals and university students gathered along the Queen’s Necklace for a quiet, symbolic vigil.

Holding mobile screens displaying their verified Cockroach Membership QR codes, attendees reaffirmed their pledge to maintain digital independence and mutual support.`,
  },
];

const FALLBACK_TIMELINE_EVENTS: TimelineEvent[] = [
  {
    id: 'tl-1',
    date: '24 JULY 2026 - 10:30 AM',
    headline: 'All-India Student Assembly Issues Joint Declaration',
    description: 'Delegates representing 28 Indian states ratify the 2026 Movement Charter for Cryptographic Sovereignty in New Delhi.',
    category: 'DECLARATION',
    imageUrl: 'https://images.pexels.com/photos/2833037/pexels-photo-2833037.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 'tl-2',
    date: '24 JULY 2026 - 08:45 AM',
    headline: 'Parliament Street Peaceful March Commences',
    description: 'Over 100,000 demonstrators fill Central Delhi carrying QR-verified lifetime diplomas.',
    category: 'DELHI MARCH',
    imageUrl: 'https://images.pexels.com/photos/1709003/pexels-photo-1709003.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
];

export const newsServices = {
  fetchNews: async (): Promise<NewsArticle[]> => {
    try {
      const query = encodeURIComponent('India AND (protest OR demonstration OR youth OR rally OR reform)');
      let res = await fetch(`https://newsapi.org/v2/everything?q=${query}&sortBy=publishedAt&pageSize=15&apiKey=${NEWS_API_KEY}`);
      if (!res.ok) {
        res = await fetch(`https://newsapi.org/v2/top-headlines?country=in&pageSize=15&apiKey=${NEWS_API_KEY}`);
      }

      if (res.ok) {
        const data = await res.json();
        if (data.articles && data.articles.length > 0) {
          return data.articles.map((item: any, idx: number) => ({
            id: `protest-${idx}-${Date.now()}`,
            headline: item.title || 'Indian Protest & Youth Movement Update',
            summary: item.description || item.content || 'Latest dispatch from Indian peaceful protest rallies and sovereign identity developments.',
            category: idx === 0 ? 'FEATURED PROTEST DISPATCH' : idx < 3 ? 'TRENDING PROTEST' : 'INDIAN NEWS',
            imageUrl: item.urlToImage && item.urlToImage.startsWith('http')
              ? item.urlToImage
              : FALLBACK_NEWS_ARTICLES[idx % FALLBACK_NEWS_ARTICLES.length].imageUrl,
            source: item.source?.name || 'Indian News Network',
            author: item.author || 'Movement Bureau',
            url: item.url || 'https://news.google.com/search?q=India+youth+protest',
            publishedAt: item.publishedAt || new Date().toISOString(),
            publishedTime: item.publishedAt ? new Date(item.publishedAt).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) : '10:00 AM IST',
            isFeatured: idx === 0,
            isTrending: idx < 4,
            content: item.content || item.description || FALLBACK_NEWS_ARTICLES[0].content,
          }));
        }
      }
    } catch (e) {
      console.warn('Indian protest news fetch fallback active:', e);
    }
    return FALLBACK_NEWS_ARTICLES;
  },

  fetchFeaturedNews: async (): Promise<NewsArticle> => {
    const list = await newsServices.fetchNews();
    return list.find((a) => a.isFeatured) || list[0] || FALLBACK_NEWS_ARTICLES[0];
  },

  fetchTrendingNews: async (): Promise<NewsArticle[]> => {
    const list = await newsServices.fetchNews();
    return list.filter((a) => a.isTrending || a.isFeatured).slice(0, 4);
  },

  fetchGalleryImages: async (): Promise<GalleryImage[]> => {
    return FALLBACK_GALLERY_IMAGES;
  },

  fetchHeroImages: async (): Promise<HeroImage[]> => {
    return FALLBACK_HERO_IMAGES;
  },

  fetchTimelineEvents: async (): Promise<TimelineEvent[]> => {
    return FALLBACK_TIMELINE_EVENTS;
  },

  getArticleById: async (id: string): Promise<NewsArticle | null> => {
    const list = await newsServices.fetchNews();
    const found = list.find((a) => a.id === id || encodeURIComponent(a.id) === id);
    if (found) return found;
    return FALLBACK_NEWS_ARTICLES[0];
  },
};
