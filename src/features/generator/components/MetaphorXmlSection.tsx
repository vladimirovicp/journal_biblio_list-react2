import { useEffect, useState } from 'react'

import { Alert, Button, Space, Spin, Typography } from 'antd'

import { fetchArticleDetail, fetchJournalMetadata } from '@/api/client'
import type {
  JournalArticleDetail,
  JournalMetadata,
  JournalNumber,
} from '@/api/types'
import { buildMetaphorXml } from '@/utils/metaphorXmlBuilder'
import { downloadXml } from '@/utils/fileHelper'

interface MetaphorXmlSectionProps {
  siteUrl: string | null
  journalNumberData: JournalNumber | null
  articleIds: number[]
}

function validateMetadata(metadata: JournalMetadata): string | null {
  if (!metadata.titleid) return 'titleid не обнаружен, процесс остановлен.'
  if (!metadata.issnPrint) return 'issnPrint не обнаружен, процесс остановлен.'
  if (!metadata.issnOnline) return 'issnOnline не обнаружен, процесс остановлен.'
  if (!metadata.elibraryTitle?.ru) return 'elibraryTitle.ru не обнаружен, процесс остановлен.'
  if (!metadata.elibraryTitle?.en) return 'elibraryTitle.en не обнаружен, процесс остановлен.'
  return null
}

export default function MetaphorXmlSection({
  siteUrl,
  journalNumberData,
  articleIds,
}: MetaphorXmlSectionProps) {
  const [xml, setXml] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [generatedKey, setGeneratedKey] = useState<string | null>(null)

  const key = siteUrl && journalNumberData && articleIds.length > 0
    ? `metaphor-${siteUrl}-${journalNumberData.id}-${articleIds.join(',')}`
    : null

  const loading = !!key && key !== generatedKey && !error

  useEffect(() => {
    if (!siteUrl || !journalNumberData || articleIds.length === 0) return

    let cancelled = false
    let metadata: JournalMetadata

    fetchJournalMetadata(siteUrl)
      .then((meta) => {
        if (cancelled) return
        const validationError = validateMetadata(meta)
        if (validationError) {
          setError(validationError)
          return
        }
        metadata = meta
        return articleIds.reduce<Promise<JournalArticleDetail[]>>(
          (chain, id, index) =>
            chain.then((results) => {
              if (cancelled) return results
              console.log(`[Метафора] Загрузка статьи ${index + 1} из ${articleIds.length}...`)
              return fetchArticleDetail(siteUrl, id).then((detail) => [
                ...results,
                detail,
              ])
            }),
          Promise.resolve([]),
        )
      })
      .then((articles) => {
        if (cancelled || !articles || !metadata) return
        const result = buildMetaphorXml(metadata, journalNumberData, articles)
        setXml(result)
        setGeneratedKey(
          `metaphor-${siteUrl}-${journalNumberData.id}-${articleIds.join(',')}`,
        )
        setError(null)
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Ошибка генерации XML')
        }
      })

    return () => {
      cancelled = true
    }
  }, [siteUrl, journalNumberData, articleIds])

  const handleDownload = () => {
    if (!xml || !journalNumberData) return
    const filename = `${journalNumberData.title.en}-metaphor.xml`
    downloadXml(xml, filename)
  }

  const handleCopy = async () => {
    if (!xml) return
    await navigator.clipboard.writeText(xml)
  }

  if (!siteUrl || !journalNumberData || articleIds.length === 0) {
    return null
  }

  return (
    <section className="generator-section">
      <div className="generator-section__header">
        <Typography.Title level={5}>
          Генерация XML для Метафоры
        </Typography.Title>
        <Typography.Paragraph type="secondary">
          Автоматическая генерация XML-файла формата journal3 на основе данных журнала и статей.
          Отсутствующие поля отмечены как «ДАННЫЕ НЕ ОПРЕДЕЛЕНЫ!».
        </Typography.Paragraph>
      </div>

      {error && (
        <Alert
          showIcon
          description={error}
          title="Ошибка"
          type="error"
          className="elibrary-xml__alert"
        />
      )}

      {loading && (
        <div className="elibrary-xml__loading">
          <Spin />
          <Typography.Text type="secondary">
            Загрузка данных и генерация XML...
          </Typography.Text>
        </div>
      )}

      {xml && (
        <div className="elibrary-xml__result">
          <textarea
            className="elibrary-xml__textarea"
            readOnly
            value={xml}
          />
          <Space className="elibrary-xml__actions">
            <Button type="primary" onClick={handleCopy}>
              Скопировать
            </Button>
            <Button onClick={handleDownload}>
              Скачать XML
            </Button>
          </Space>
        </div>
      )}
    </section>
  )
}
