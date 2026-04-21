import { useState } from 'react'

import FormStep from '@/features/generator/FormStep'
import XmlPreview from '@/features/generator/XmlPreview'
import SiteSelectorSection from '@/features/generator/components/SiteSelectorSection'
import './generator.css'

export default function GeneratorFeature() {
  const [selectedSiteUrl, setSelectedSiteUrl] = useState<string | null>(null)

  return (
    <section className="generator-feature">
      <SiteSelectorSection
        value={selectedSiteUrl}
        onChange={setSelectedSiteUrl}
      />
      <FormStep selectedSiteUrl={selectedSiteUrl} />
      <XmlPreview selectedSiteUrl={selectedSiteUrl} />
    </section>
  )
}
