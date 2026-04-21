import type { ReactNode } from 'react'

import Footer from '@/components/layout/Footer'
import Header from '@/components/layout/Header'

interface MainLayoutProps {
  children: ReactNode
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  )
}
