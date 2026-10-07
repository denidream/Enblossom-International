export interface NavItem {
  id: string;
  labelJa: string;
  labelEn: string;
  href: string;
}

export interface ServiceItem {
  id: string;
  titleJa: string;
  titleEn: string;
  description?: string;
  image: string;
  iconType: 'tourism' | 'halal' | 'export' | 'matching';
  features: string[];
  details: {
    overview: string;
    highlights: string[];
    targetAudience: string;
  };
}

export interface AdvantageItem {
  number: string;
  title: string;
  subtitle: string;
  description: string;
}

export interface TeamMember {
  role: string;
  name: string;
  furigana: string;
  phone: string;
  email: string;
  note?: string;
}

export interface ContactInfo {
  phone1: { label: string; number: string; link: string };
  phone2: { label: string; number: string; link: string };
  email1: string;
  email2: string;
  website: string;
  postalCode: string;
  address: string;
  description?: string;
}

export interface HeroContent {
  taglineEn: string;
  subTaglineJa: string;
  mainHeadingLine1: string;
  mainHeadingLine2: string;
  subHeadingLine1: string;
  subHeadingLine2: string;
  bridgeText: string;
  backgroundImage?: string;
}

export interface AboutContent {
  sectionEn: string;
  sectionJa: string;
  description: string;
  moreButtonText: string;
  advantagesHeading: string;
  earthImage?: string;
  advantages: AdvantageItem[];
}

export interface NewsItem {
  date: string;
  category: string;
  title: string;
}

export interface GalleryStripItem {
  title: string;
  image: string;
}

export interface BrandingContent {
  customLogoUrl?: string; // base64 or URL for custom uploaded logo PNG
  brandName: string;
  brandSub: string;
  brandTagline: string;
  brandJp: string;
}

export interface SiteContentState {
  branding: BrandingContent;
  hero: HeroContent;
  services: ServiceItem[];
  about: AboutContent;
  team: {
    sectionEn: string;
    sectionJa: string;
    members: TeamMember[];
  };
  galleryStrip: GalleryStripItem[];
  contact: ContactInfo;
  news: NewsItem[];
}
