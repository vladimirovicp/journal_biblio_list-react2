import type {
  ArticleAuthor,
  JournalArticleDetail,
  JournalMetadata,
  JournalNumber,
} from '@/api/types'

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function buildAuthorXml(author: ArticleAuthor): string {
  let codes = ''
  if (author.researcherid) codes += `                <researcherid>${escapeXml(author.researcherid)}</researcherid>\n`
  if (author.spin) codes += `                <spin>${escapeXml(author.spin)}</spin>\n`
  if (author.scopusid) codes += `                <scopusid>${escapeXml(author.scopusid)}</scopusid>\n`
  if (author.orcid) codes += `                <orcid>${escapeXml(author.orcid)}</orcid>\n`

  return `            <author num="${author.num}">
            <authorCodes>
${codes}            </authorCodes>
            <individInfo lang="RUS">
                <surname>${escapeXml(author.surname.ru)}</surname>
                <initials>${escapeXml(author.initials.ru)}</initials>
                <orgName>${escapeXml(author.company.data.orgName.ru)}</orgName>
                <address>${escapeXml(author.company.data.address.ru)}</address>
            </individInfo>
            <individInfo lang="ENG">
                <surname>${escapeXml(author.surname.en)}</surname>
                <initials>${escapeXml(author.initials.en)}</initials>
                <orgName>${escapeXml(author.company.data.orgName.en)}</orgName>
                <address>${escapeXml(author.company.data.address.en)}</address>
            </individInfo>
        </author>`
}

function buildArticleXml(article: JournalArticleDetail): string {
  const authorsXml = article.autor.map(buildAuthorXml).join('\n')

  const keywordsRu = article.key_words.ru_page
    .map((kw) => `            <keyword>${escapeXml(kw.ru)}</keyword>`)
    .join('\n')

  const keywordsEn = article.key_words.en_page
    .map((kw) => `            <keyword>${escapeXml(kw.en)}</keyword>`)
    .join('\n')

  const refsXml = article.literature
    .map((lit) => `            <refInfo lang="ANY">
                <text>${escapeXml(lit.text)}</text>
            </refInfo>`)
    .join('\n')

  return `        <section>
            <secTitle lang="RUS">${escapeXml(article.heading.ru)}</secTitle>
            <secTitle lang="ENG">${escapeXml(article.heading.en)}</secTitle>
        </section>
        <article>
            <pages>${escapeXml(article.page_no)}-${escapeXml(article.page_no_to)}</pages>
            <artType>${escapeXml(article.typersci.abbreviation)}</artType>
            <authors>
${authorsXml}
            </authors>
            <artTitles>
                <artTitle lang="RUS">${escapeXml(article.title.ru)}</artTitle>
                <artTitle lang="ENG">${escapeXml(article.title.en)}</artTitle>
            </artTitles>
            <abstracts>
                <abstract lang="RUS">${escapeXml(article.body.ru)}</abstract>
                <abstract lang="ENG">${escapeXml(article.body.en)}</abstract>
            </abstracts>
            <text lang="ANY">${escapeXml(article.fulltext)}</text>
            <codes>
                <udk>${escapeXml(article.udk)}</udk>
                <doi>${escapeXml(article.doi)}</doi>
                <edn>${escapeXml(article.edn)}</edn>
            </codes>
            <keywords>
                <kwdGroup lang="RUS">
${keywordsRu}
                </kwdGroup>
                <kwdGroup lang="ENG">
${keywordsEn}
                </kwdGroup>
            </keywords>
            <dates>
                <dateReceived>${escapeXml(article.date_received)}</dateReceived>
                <dateAccepted>${escapeXml(article.accepted)}</dateAccepted>
                <datePublication>${escapeXml(article.published)}</datePublication>
            </dates>
            <references>
                <reference>
${refsXml}
                </reference>
            </references>
            <files>
                <file desc="fullText">${escapeXml(article.text_pdf.filename)}</file>
            </files>
        </article>`
}

export function buildElibraryXml(
  metadata: JournalMetadata,
  journalNumberData: JournalNumber,
  articles: JournalArticleDetail[],
): string {
  const articlesXml = articles.map(buildArticleXml).join('\n')

  return `<?xml version="1.0" encoding="utf-16" standalone="no"?>
<journal>
    <titleid>${escapeXml(metadata.titleid)}</titleid>
    <issn>${escapeXml(metadata.issnPrint)}</issn>
    <eissn>${escapeXml(metadata.issnOnline)}</eissn>
    <journalInfo lang="RUS">
        <title>${escapeXml(metadata.elibraryTitle.ru)}</title>
    </journalInfo>
    <journalInfo lang="ENG">
        <title>${escapeXml(metadata.elibraryTitle.en)}</title>
    </journalInfo>
    <issue>
        <volume>${escapeXml(journalNumberData.volume)}</volume>
        <number>${escapeXml(journalNumberData.number)}</number>
        <dateUni>${escapeXml(journalNumberData.year)}</dateUni>
        <pages>${escapeXml(journalNumberData.journal_no_start)}-${escapeXml(journalNumberData.journal_no_end)}</pages>
        <articles>
${articlesXml}
        </articles>
    </issue>
</journal>`
}
