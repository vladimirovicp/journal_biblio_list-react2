import axios from 'axios'

import { API_ENDPOINTS } from './endpoints'
import type { JournalArticle, JournalNumber } from './types'

const client = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? '/',
})

client.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error),
)

client.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error),
)

export async function fetchJournalNumbers(
  siteUrl: string,
): Promise<JournalNumber[]> {
  const { data } = await client.get<JournalNumber[]>(
    `${siteUrl}${API_ENDPOINTS.JOURNAL_NUMBERS}`,
  )
  return data
}

export async function fetchJournalArticles(
  siteUrl: string,
  journalId: string,
): Promise<JournalArticle[]> {
  const { data } = await client.get<JournalArticle[]>(
    `${siteUrl}${API_ENDPOINTS.JOURNAL_LIST}${journalId}`,
  )
  return data
}

export default client
