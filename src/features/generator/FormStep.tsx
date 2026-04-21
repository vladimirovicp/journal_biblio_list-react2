import { Alert, Form, Input, Typography } from 'antd'

interface FormStepProps {
  selectedSiteUrl: string | null
}

export default function FormStep({ selectedSiteUrl }: FormStepProps) {
  const isDisabled = !selectedSiteUrl

  return (
    <section
      className={`generator-section generator-form-step${isDisabled ? ' generator-form-step--disabled' : ''}`}
    >
      <div className="generator-section__header">
        <Typography.Title level={5}>Форма обработки</Typography.Title>
        <Typography.Paragraph type="secondary">
          Основные поля следующего шага будут располагаться здесь. URL сайта
          уже доступен в состоянии и может использоваться в дальнейшей логике.
        </Typography.Paragraph>
      </div>

      {isDisabled ? (
        <Alert
          showIcon
          className="generator-form-step__message"
          description="Сначала выберите URL сайта в секции выше, после этого шаг станет активным."
          message="Форма временно заблокирована"
          type="info"
        />
      ) : null}

      <Form disabled={isDisabled} layout="vertical">
        <Form.Item label="Выбранный сайт">
          <Input
            placeholder="Сначала выберите URL сайта"
            readOnly
            value={selectedSiteUrl ?? ''}
          />
        </Form.Item>
      </Form>

      <div
        className={`generator-form-step__placeholder${isDisabled ? ' generator-form-step__placeholder--disabled' : ''}`}
      >
        <Typography.Text type="secondary">
          Здесь можно разместить оставшиеся поля формы, завязанные на выбранный
          URL.
        </Typography.Text>
      </div>
    </section>
  )
}
