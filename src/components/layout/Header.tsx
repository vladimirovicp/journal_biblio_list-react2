import { Layout, Typography } from 'antd'

export default function Header() {
  return (
    <Layout.Header className="app-layout__header">
      <div className="app-layout__container">
        <Typography.Title className="app-layout__title" level={4}>
          Journal Biblio List
        </Typography.Title>
      </div>
    </Layout.Header>
  )
}
