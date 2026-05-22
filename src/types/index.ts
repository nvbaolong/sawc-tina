export interface HeroContent {
  badgeText?: string
  mainHeading?: string
  subtext?: string
  backgroundImage?: string
  videoUrl?: string
}

export interface TvShow {
  _sys?: { filename: string }
  title: string
  description?: string
  image?: string
  airDate?: string
  videoUrl?: string
  category?: 'full-episode' | 'clip' | 'behind-the-scenes'
  orderRank?: number
}

export interface Event {
  _sys?: { filename: string }
  title: string
  date: string
  venue?: string
  time?: string
  price?: string
  type?: string
  shortDescription?: string
  coverImage?: string
  bookingUrl?: string
  orderRank?: number
}


