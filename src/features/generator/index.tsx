import { useEffect, useState } from 'react'

import FormStep from '@/features/generator/FormStep'
import XmlPreview from '@/features/generator/XmlPreview'
import SiteSelectorSection from '@/features/generator/components/SiteSelectorSection'
import JournalSelectorSection from '@/features/generator/components/JournalSelectorSection'
import JournalContentSection from '@/features/generator/components/JournalContentSection'
import type { JournalNumber } from '@/api/types'
import './generator.css'

export default function GeneratorFeature() {
  const [selectedSiteUrl, setSelectedSiteUrl] = useState<string | null>(null)
  const [selectedJournalData, setSelectedJournalData] = useState<JournalNumber | null>(null)

  useEffect(() => {
    if (selectedJournalData) {
      console.log('journalNumberData', selectedJournalData)
    }
  }, [selectedJournalData])

  return (
    <section className="generator-feature">
      <SiteSelectorSection
        value={selectedSiteUrl}
        onChange={(url) => {
          setSelectedSiteUrl(url)
          setSelectedJournalData(null)
        }}
      />
      <JournalSelectorSection
        siteUrl={selectedSiteUrl}
        value={selectedJournalData?.id ?? null}
        onChange={setSelectedJournalData}
      />
      <JournalContentSection
        siteUrl={selectedSiteUrl}
        journalId={selectedJournalData?.id ?? null}
      />
      <FormStep selectedSiteUrl={selectedSiteUrl} />
      <XmlPreview selectedSiteUrl={selectedSiteUrl} />
    </section>
  )
}
