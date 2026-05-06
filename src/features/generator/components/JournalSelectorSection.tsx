import { useEffect, useState } from 'react'

import { Alert, Spin, Typography } from 'antd'

import { fetchJournalNumbers } from '@/api/client'
import CustomSelect from '@/components/ui/CustomSelect'
import type { JournalNumber } from '@/api/types'

interface JournalSelectorSectionProps {
  siteUrl: string | null
  value: string | null
  onChange: (id: string | null) => void
}

export default function JournalSelectorSection({
  siteUrl,
  value,
  onChange,
}: JournalSelectorSectionProps) {
  const [journals, setJournals] = useState<JournalNumber[]>([])
  const [error, setError] = useState<string | null>(null)
  const [fetchedUrl, setFetchedUrl] = useState<string | null>(null)

  const loading = !!siteUrl && fetchedUrl !== siteUrl && !error

  useEffect(() => {
    if (!siteUrl) return

    let cancelled = false

    fetchJournalNumbers(siteUrl)
      .then((data) => {
        if (!cancelled) {
          setJournals(data)
          setFetchedUrl(siteUrl)
          setError(null)
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
  }, [siteUrl])

  if (!siteUrl) {
    return (
      <section className="generator-section">
        <div className="generator-section__header">
          <Typography.Title level={5}>Выбор журнала</Typography.Title>
          <Typography.Paragraph type="secondary">
            Сначала выберите сайт, чтобы загрузить список журналов.
          </Typography.Paragraph>
        </div>
      </section>
    )
  }

  const options = journals.map((journal) => ({
    label: journal.title.ru,
    value: journal.id,
  }))

  return (
    <section className="generator-section">
      <div className="generator-section__header">
        <Typography.Title level={5}>Выбор журнала</Typography.Title>
        <Typography.Paragraph type="secondary">
          Выберите номер журнала из списка, загруженного с{' '}
          <Typography.Text strong>{siteUrl}</Typography.Text>
        </Typography.Paragraph>
      </div>

      {error ? (
        <Alert
          showIcon
          description={error}
          title="Не удалось загрузить журналы"
          type="error"
        />
      ) : (
        <Spin spinning={loading}>
          <CustomSelect<string>
            allowClear
            className="generator-section__select"
            disabled={loading}
            options={options}
            placeholder="Выберите номер журнала"
            size="large"
            value={value ?? undefined}
            onChange={(nextValue) => onChange(nextValue ?? null)}
          />
        </Spin>
      )}
    </section>
  )
}
