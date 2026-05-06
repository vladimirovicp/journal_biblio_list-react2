import { useState } from 'react'

import FormStep from '@/features/generator/FormStep'
import XmlPreview from '@/features/generator/XmlPreview'
import SiteSelectorSection from '@/features/generator/components/SiteSelectorSection'
import JournalSelectorSection from '@/features/generator/components/JournalSelectorSection'
import './generator.css'

export default function GeneratorFeature() {
  const [selectedSiteUrl, setSelectedSiteUrl] = useState<string | null>(null)
  const [selectedJournalId, setSelectedJournalId] = useState<string | null>(null)

  return (
    <section className="generator-feature">
      <SiteSelectorSection
        value={selectedSiteUrl}
        onChange={(url) => {
          setSelectedSiteUrl(url)
          setSelectedJournalId(null)
        }}
      />
      <JournalSelectorSection
        siteUrl={selectedSiteUrl}
        value={selectedJournalId}
        onChange={setSelectedJournalId}
      />
      <FormStep selectedSiteUrl={selectedSiteUrl} />
      <XmlPreview selectedSiteUrl={selectedSiteUrl} />
    </section>
  )
}
