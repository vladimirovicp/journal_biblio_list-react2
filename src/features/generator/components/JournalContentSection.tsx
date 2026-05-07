import { useEffect, useState } from 'react'

import { Alert, Spin, Typography } from 'antd'

import { fetchJournalArticles } from '@/api/client'
import type { JournalArticle } from '@/api/types'

interface JournalContentSectionProps {
  siteUrl: string | null
  journalId: string | null
  onArticlesLoaded: (ids: number[]) => void
}

export default function JournalContentSection({
  siteUrl,
  journalId,
  onArticlesLoaded,
}: JournalContentSectionProps) {
  const [articles, setArticles] = useState<JournalArticle[]>([])
  const [error, setError] = useState<string | null>(null)
  const [fetchedId, setFetchedId] = useState<string | null>(null)

  const loading = !!journalId && fetchedId !== journalId && !error

  useEffect(() => {
    if (!siteUrl || !journalId) return

    let cancelled = false

    fetchJournalArticles(siteUrl, journalId)
      .then((data) => {
        if (!cancelled) {
          setArticles(data)
          setFetchedId(journalId)
          setError(null)
          onArticlesLoaded(data.map((a) => a.id))
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Ошибка загрузки')
        }
      })

    return () => {
      cancelled = true
    }
  }, [siteUrl, journalId, onArticlesLoaded])

  if (!journalId) {
    return null
  }

  const sorted = [...articles].sort(
    (a, b) => Number(a.page_no) - Number(b.page_no),
  )

  return (
    <section className="generator-section">
      <div className="generator-section__header">
        <Typography.Title level={5}>Содержание</Typography.Title>
        <Typography.Paragraph type="secondary">
          Список статей выбранного журнала ({articles.length}{' '}
          {articles.length === 1 ? 'статья' : 'статей'})
        </Typography.Paragraph>
      </div>

      {error ? (
        <Alert
          showIcon
          description={error}
          title="Не удалось загрузить статьи"
          type="error"
        />
      ) : (
        <Spin spinning={loading}>
          <ul className="journal-content__list">
            {sorted.map((article) => (
              <li key={article.id} className="journal-content__item">
                <span className="journal-content__title">
                  {article.title.ru}
                </span>
                <span className="journal-content__page">
                  {article.page_no}
                </span>
              </li>
            ))}
          </ul>
        </Spin>
      )}
    </section>
  )
}
