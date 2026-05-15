export interface ApiResponse<T = unknown> {
  data: T
}

export interface JournalNumberTitle {
  ru: string
  en: string
}

export interface JournalNumber {
  id: string
  title: JournalNumberTitle
  year: string
  volume: string
  number: string
  part: string
  journal_no_start: string
  journal_no_end: string
}

export interface JournalArticle {
  id: number
  title: JournalNumberTitle
  page_no: string
}

export interface JournalMetadata {
  titleid: string
  issnPrint: string
  issnOnline: string
  elibraryTitle: {
    ru: string
    en: string
  }
  abbrTitle: string
  publ: string
  placePubl: string
  address: string
}

export interface ArticleAuthor {
  num: number
  surname: { ru: string; en: string }
  initials: { ru: string; en: string }
  researcherid?: string
  spin?: string
  scopusid?: string
  orcid?: string
  company: {
    data: {
      orgName: { ru: string; en: string }
      address: { ru: string; en: string }
    }
  }
}

export interface JournalArticleDetail {
  id: number
  title: { ru: string; en: string }
  body: { ru: string; en: string }
  fulltext: string
  page_no: string
  page_no_to: string
  heading: { ru: string; en: string }
  typersci: { abbreviation: string }
  autor: ArticleAuthor[]
  udk: string
  doi: string
  edn: string
  key_words: {
    ru_page: { ru: string }[]
    en_page: { en: string }[]
  }
  date_received: string
  accepted: string
  published: string
  literature: { text: string }[]
  text_pdf: { filename: string }
}
