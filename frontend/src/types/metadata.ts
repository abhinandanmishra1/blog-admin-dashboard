export interface SocialLinks {
  twitter?: string;
  github?: string;
  linkedin?: string;
  email?: string;
}

export interface Experience {
  title: string;
  company: string;
  period: string;
  highlights: string[];
}

export interface Education {
  degree: string;
  school: string;
  year: string;
  honors?: string;
}

export interface Achievement {
  title: string;
  description: string;
  link: string;
}

export interface Author {
  name: string;
  bio: string;
  avatar: string;
  tagline: string;
  username: string;
  achievements?: Achievement[];
  experience?: Experience[];
  education?: Education[];
  social: SocialLinks;
}

export interface Category {
  title: string;
  description: string;
  tag: string;
  icon: string;
  color: string;
  coverImage: string;
}

export interface Series {
  title: string;
  description: string;
  icon: string;
  color: string;
  rating: number;
  articleCount: number;
  readCount: string;
}

export interface Navigation {
  home: string;
  about: string;
  articles: string;
}

export interface Tag {
  name: string;
  slug: string;
  description: string;
}

export interface SiteInfo {
    title: string;
    description: string;
    siteUrl: string;
}

export interface SiteMetadata {
  title: string;
  description: string;
  siteUrl: string;
  author: Author;
  categories: Category[];
  seriesList: Series[];
  tags: Tag[];
}
