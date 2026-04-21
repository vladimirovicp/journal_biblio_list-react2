import { Typography } from 'antd'

interface XmlPreviewProps {
  selectedSiteUrl: string | null
}

export default function XmlPreview({ selectedSiteUrl }: XmlPreviewProps) {
  return (
    <section className="generator-section generator-preview">
      <div className="generator-section__header">
        <Typography.Title level={5}>XML Preview</Typography.Title>
        <Typography.Paragraph type="secondary">
          Секция предпросмотра может использовать выбранный URL как часть
          последующей генерации и запроса данных.
        </Typography.Paragraph>
      </div>

      {selectedSiteUrl ? (
        <span className="generator-preview__meta">
          Активный сайт: {selectedSiteUrl}
        </span>
      ) : (
        <Typography.Text type="secondary">
          Сайт пока не выбран. После выбора URL здесь можно выводить результат
          генерации.
        </Typography.Text>
      )}
    </section>
  )
}
