export interface HeroContent {
  badgeText?: string
  mainHeading?: string
  subtext?: string
  backgroundImage?: any
  videoUrl?: string
}

export interface TvShow {
  _id?: string
  _sys?: { filename: string }
  title: string
  description?: string
  image?: any
  airDate?: string
  videoUrl?: string
  category?: 'full-episode' | 'clip' | 'behind-the-scenes'
  orderRank?: number
}

export interface Event {
  _id?: string
  _sys?: { filename: string }
  title: string
  date: string
  venue?: string
  time?: string
  price?: string
  type?: string
  shortDescription?: string
  coverImage?: any
  bookingUrl?: string
  orderRank?: number
}


