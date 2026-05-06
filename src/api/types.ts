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
