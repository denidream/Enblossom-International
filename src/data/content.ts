import { NavItem, ServiceItem, AdvantageItem, TeamMember, ContactInfo } from '../types';
import { IMAGES } from '../assets/images';

export const NAV_ITEMS: NavItem[] = [
  { id: 'home', labelJa: 'ホーム', labelEn: 'HOME', href: '#home' },
  { id: 'business', labelJa: '事業内容', labelEn: 'BUSINESS', href: '#business' },
  { id: 'about', labelJa: '私たちについて', labelEn: 'ABOUT US', href: '#about' },
  { id: 'news', labelJa: 'お知らせ', labelEn: 'NEWS', href: '#news' },
  { id: 'team', labelJa: 'チーム', labelEn: 'TEAM', href: '#team' },
  { id: 'contact', labelJa: 'お問い合わせ', labelEn: 'CONTACT', href: '#contact' },
];

export const HERO_CONTENT = {
  taglineEn: 'Blossoming Connections',
  subTaglineJa: 'ご縁を咲かせる',
  mainHeadingLine1: '日本と世界をつなぎ、',
  mainHeadingLine2: 'ご縁を未来へ。',
  subHeadingLine1: '人・企業・地域の新しいご縁を、',
  subHeadingLine2: 'ともに育てます。',
  bridgeText: 'Japan × Indonesia and the World',
};

export const SERVICES: ServiceItem[] = [
  {
    id: 'tourism',
    titleJa: 'ツーリズム事業',
    titleEn: 'Tourism Services',
    image: IMAGES.serviceTourism,
    iconType: 'tourism',
    features: [
      '企業視察・工場見学・医療ツーリズム',
      'インセンティブツアー・ハラール対応',
      '国内・海外の企画・紹介・手配',
      '特別な体験プログラムの提案',
    ],
    details: {
      overview: '日本とインドネシアをはじめとする世界各国を結ぶオーダーメイドのツーリズム事業。一般的な観光にとどまらず、産業視察、最新医療施設の見学、ムスリムフレンドリーな特別研修旅行までトータルにサポートいたします。',
      highlights: [
        '日本の先端技術・ものづくり現場を見学する企業視察・工場見学',
        '最先端の日本の医療技術・健診を体験する医療ツーリズムコーディネート',
        '礼拝環境やハラール食を完全配慮したムスリム向けインセンティブツアー',
        '現地専任スタッフによるきめ細やかなアテンド・通訳手配'
      ],
      targetAudience: '海外展開を検討されている日本企業、日本の技術・サービスを学びたい海外企業や団体、ムスリム旅行客の皆様'
    }
  },
  {
    id: 'halal',
    titleJa: 'ハラール事業',
    titleEn: 'Halal Business',
    image: IMAGES.serviceHalal,
    iconType: 'halal',
    features: [
      'ハラール認証取得支援・飲食店支援',
      'ハラール商品の企画・開発',
      'ムスリム受入環境づくり',
      'トータルでサポートします。',
    ],
    details: {
      overview: '巨大な成長を続けるイスラム圏・ムスリム市場への進出と受入環境の整備を包括支援。インドネシアBPJPH認証取得をはじめ、飲食店でのムスリムフレンドリー対応や商品開発を現場目線でサポートします。',
      highlights: [
        'インドネシアBPJPHや国際ハラール基準に沿った認証取得コンサルティング',
        '日本の調味料や食材を活用したハラール対応新商品の企画・レシピ開発',
        'ホテル・飲食店・商業施設における礼拝スペース・ハラール厨房環境整備',
        '従業員向けムスリム文化・ハラール理解研修の実施'
      ],
      targetAudience: '食品メーカー、ホテル・レストラン、自治体、イスラム市場への販路拡大を目指す事業者様'
    }
  },
  {
    id: 'export',
    titleJa: '輸出入・食品事業',
    titleEn: 'Import, Export & Food Business',
    image: IMAGES.serviceExport,
    iconType: 'export',
    features: [
      '食品・飲料等の輸出入',
      '商品企画・開発・加工・包装・配送',
      '海外市場への展開をサポートします。',
    ],
    details: {
      overview: '安心・安全で高品質な日本食材の海外展開、およびインドネシア等の優良農産品・特産品の日本市場への導入を支援。輸出入通関から現地流通・ブランディングまで一貫して手掛けます。',
      highlights: [
        '日本の上質なお茶、米、調味料、水産加工品の東南アジア・グローバル輸出',
        'インドネシアの高品質なコーヒー豆、スパイス、伝統食品の日本への輸入販売',
        '現地法規制や輸入ライセンス、ラベル表示基準への完全適合サポート',
        '現地スーパー、ECモール、専門店への販路開拓および共同商品開発'
      ],
      targetAudience: '自社商品を海外に輸出したい生産者様、東南アジアのユニークな優良素材を仕入れたい企業様'
    }
  },
  {
    id: 'matching',
    titleJa: 'ビジネスマッチング・事業開発',
    titleEn: 'Business Development & Matching',
    image: IMAGES.serviceMatching,
    iconType: 'matching',
    features: [
      '企業紹介・商談支援',
      '海外企業とのマッチング・視察コーディネート',
      '商品開発・市場開拓をサポートします。',
    ],
    details: {
      overview: '日本とインドネシアの確かな信頼ネットワークを活かし、双方のニーズに応じた最適なパートナー企業との提携・商談を創出。単なる紹介にとどまらず、成約・事業化まで伴走いたします。',
      highlights: [
        '貴社の事業規模・強みに合致する現地優良パートナーの厳選リサーチ',
        'バイリンガル専門スタッフによる商談同席・通訳・合意形成サポート',
        '現地官公庁・経済団体・自治体への表敬訪問や現地市場視察の企画運営',
        'JV（合弁会社）設立や現地法人立ち上げに向けたアドバイザリー業務'
      ],
      targetAudience: '東南アジア進出を加速させたい日本企業様、日本企業との提携を希望する海外企業様'
    }
  },
];

export const ABOUT_CONTENT = {
  sectionEn: 'ABOUT US',
  sectionJa: '私たちについて',
  description: 'Enblossomは、日本とインドネシアをはじめとする海外をつなぎ、それぞれの文化や価値観を大切にしながら、人・企業・地域を結び、新しい可能性を生み出していく会社です。',
  moreButtonText: '詳しく見る',
  advantagesHeading: 'Enblossomだからできること',
  advantages: [
    {
      number: '01',
      title: '日本×インドネシア×ビジネス',
      subtitle: '',
      description: '新しい価値とご縁を生み出します。両国の文化とビジネス慣習に精通したチームが、持続可能なシナジーを創造します。',
    },
    {
      number: '02',
      title: '企画から実施まで伴走',
      subtitle: '',
      description: '企画・手配・現地対応まで安心してお任せいただけます。机上の提案にとどまらず、現場での実務を徹底的にサポートします。',
    },
    {
      number: '03',
      title: '幅広いネットワーク',
      subtitle: '',
      description: '企業・自治体・教育機関など、国内外の信頼できるパートナーをご紹介します。強固な信頼関係が成功の鍵です。',
    },
  ] as AdvantageItem[],
};

export const TEAM_CONTENT = {
  sectionEn: 'OUR TEAM',
  sectionJa: '日本と世界をつなぐ、私たち',
  members: [
    {
      role: 'Co-CEO',
      name: 'TEGUH WAHYUDI',
      furigana: 'テグー・ワユディ',
      phone: '090-4157-2004',
      email: 'teguh@enblossom.jp',
      note: 'インドネシアと日本の架け橋として、ビジネス・ハラール・国際交流を牽引。'
    },
    {
      role: 'Co-CEO',
      name: '宮澤 喜代',
      furigana: 'Kiyo Miyazawa',
      phone: '090-3560-4188',
      email: 'kiyo@enblossom.jp',
      note: '地域共生とグローバル展開の融合を追求し、企業間の温かなご縁を育む。'
    }
  ] as TeamMember[],
};

export const CONTACT_CONTENT: ContactInfo = {
  phone1: {
    label: 'ユディ',
    number: '090-4157-2004',
    link: 'tel:09041572004'
  },
  phone2: {
    label: '宮澤',
    number: '090-3560-4188',
    link: 'tel:09035604188'
  },
  email1: 'teguh@enblossom.jp',
  email2: 'kiyo@enblossom.jp',
  website: 'https://www.enblossom.jp/',
  postalCode: '〒444-0316',
  address: '愛知県西尾市羽塚町寅山45番地1',
  description: '企業視察・工場見学・医療ツーリズム・ハラール対応・海外展開・輸出入・ビジネスマッチングなど、まずはお気軽にご相談ください。',
};

export const NEWS_ITEMS = [
  {
    date: '2026.10.01',
    category: 'お知らせ',
    title: 'Enblossom公式ウェブサイトをリニューアル公開いたしました。',
  },
  {
    date: '2026.09.18',
    category: '事業展開',
    title: '日本・インドネシア間での新たなハラール食品共同開発プロジェクトが始動しました。',
  },
  {
    date: '2026.08.25',
    category: '視察・ツアー',
    title: '秋季の日本企業向けインドネシア現地視察・ビジネスマッチングツアーの受付を開始しました。',
  }
];

export const INITIAL_SITE_CONTENT = {
  branding: {
    customLogoUrl: '',
    brandName: 'ENBLOSSOM',
    brandSub: 'INTERNATIONAL',
    brandTagline: '~ Blossoming Connections ~',
    brandJp: 'ご縁を咲かせる',
  },
  hero: {
    ...HERO_CONTENT,
    backgroundImage: IMAGES.hero,
  },
  services: SERVICES,
  about: {
    ...ABOUT_CONTENT,
    earthImage: IMAGES.aboutEarth,
  },
  team: TEAM_CONTENT,
  galleryStrip: IMAGES.galleryStrip,
  contact: CONTACT_CONTENT,
  news: NEWS_ITEMS,
};

