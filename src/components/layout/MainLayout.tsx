import type { ReactNode } from 'react'
import { Layout } from 'antd'

import Footer from '@/components/layout/Footer'
import Header from '@/components/layout/Header'
import './MainLayout.css'

interface MainLayoutProps {
  children: ReactNode
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <Layout className="app-layout">
      <Header />
      <Layout.Content className="app-layout__content">
        <div className="app-layout__main">{children}</div>
      </Layout.Content>
      <Footer />
    </Layout>
  )
}
