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

export interface FwbContent {
  badgeText?: string
  titleLine1?: string
  titleLine2?: string
  subtext?: string
  buttonText?: string
  buttonLink?: string
  price?: string
  backgroundImage?: string
  cosiImage?: string
  card1Title?: string
  card1Description?: string
  card2Title?: string
  card2Description?: string
}

