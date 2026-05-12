import { useCallback, useState } from 'react'

import SiteSelectorSection from '@/features/generator/components/SiteSelectorSection'
import JournalSelectorSection from '@/features/generator/components/JournalSelectorSection'
import JournalContentSection from '@/features/generator/components/JournalContentSection'
import ElibraryXmlSection from '@/features/generator/components/ElibraryXmlSection'
import MetaphorXmlSection from '@/features/generator/components/MetaphorXmlSection'
import type { JournalNumber } from '@/api/types'
import './generator.css'

export default function GeneratorFeature() {
  const [selectedSiteUrl, setSelectedSiteUrl] = useState<string | null>(null)
  const [selectedJournalData, setSelectedJournalData] = useState<JournalNumber | null>(null)
  const [journalArticleListID, setJournalArticleListID] = useState<number[]>([])

  const handleArticlesLoaded = useCallback((ids: number[]) => {
    setJournalArticleListID(ids)
  }, [])

  return (
    <section className="generator-feature">
      <SiteSelectorSection
        value={selectedSiteUrl}
        onChange={(url) => {
          setSelectedSiteUrl(url)
          setSelectedJournalData(null)
          setJournalArticleListID([])
        }}
      />
      <JournalSelectorSection
        siteUrl={selectedSiteUrl}
        value={selectedJournalData?.id ?? null}
        onChange={(journal) => {
          setSelectedJournalData(journal)
          setJournalArticleListID([])
        }}
      />
      <JournalContentSection
        siteUrl={selectedSiteUrl}
        journalId={selectedJournalData?.id ?? null}
        onArticlesLoaded={handleArticlesLoaded}
      />
      <ElibraryXmlSection
        siteUrl={selectedSiteUrl}
        journalNumberData={selectedJournalData}
        articleIds={journalArticleListID}
      />
      <MetaphorXmlSection
        siteUrl={selectedSiteUrl}
        journalNumberData={selectedJournalData}
        articleIds={journalArticleListID}
      />
    </section>
  )
}
