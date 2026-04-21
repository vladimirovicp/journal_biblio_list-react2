import { Typography } from 'antd'

import CustomSelect from '@/components/ui/CustomSelect'
import { SITE_OPTIONS } from '@/features/generator/data/siteOptions'

interface SiteSelectorSectionProps {
  value: string | null
  onChange: (url: string | null) => void
}

export default function SiteSelectorSection({
  value,
  onChange,
}: SiteSelectorSectionProps) {
  return (
    <section className="generator-section">
      <div className="generator-section__header">
        <Typography.Title level={5}>Выбор сайта</Typography.Title>
        <Typography.Paragraph type="secondary">
          Выберите URL из ручного списка. Выбранное значение сохранится в
          состоянии и будет использоваться в следующих шагах.
        </Typography.Paragraph>
      </div>

      <CustomSelect<string>
        allowClear
        className="generator-section__select"
        options={SITE_OPTIONS}
        placeholder="Выберите URL сайта"
        size="large"
        value={value ?? undefined}
        onChange={(nextValue) => onChange(nextValue ?? null)}
      />
    </section>
  )
}
