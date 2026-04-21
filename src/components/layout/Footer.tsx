import { Layout, Typography } from 'antd'

export default function Footer() {
  return (
    <Layout.Footer className="app-layout__footer">
      <div className="app-layout__container">
        <Typography.Text className="app-layout__footer-text">
          Journal Biblio List
        </Typography.Text>
      </div>
    </Layout.Footer>
  )
}
