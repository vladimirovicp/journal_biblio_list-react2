import type {
  ArticleAuthor,
  JournalArticleDetail,
  JournalMetadata,
  JournalNumber,
} from '@/api/types'

const UNDEF = 'ДАННЫЕ НЕ ОПРЕДЕЛЕНЫ!'

function esc(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function buildMetaphorAuthor(author: ArticleAuthor): string {
  let codes = ''
  if (author.scopusid) codes += `            <scopusid>${esc(author.scopusid)}</scopusid>\n`
  if (author.researcherid) codes += `            <researcherid>${esc(author.researcherid)}</researcherid>\n`
  if (author.orcid) codes += `            <orcid>${esc(author.orcid)}</orcid>\n`
  if (author.spin) codes += `            <spin>${esc(author.spin)}</spin>\n`

  return `          <author num="${author.num}">
          <authorCodes>
${codes}          </authorCodes>
          <individInfo lang="RUS">
            <surname>${esc(author.surname.ru)}</surname>
            <initials>${esc(author.initials.ru)}</initials>
            <orgName>${esc(author.company.data.orgName.ru)}</orgName>
            <address>${esc(author.company.data.address.ru)}</address>
          </individInfo>
          <individInfo lang="ENG">
            <surname>${esc(author.surname.en)}</surname>
            <initials>${esc(author.initials.en)}</initials>
            <orgName>${esc(author.company.data.orgName.en)}</orgName>
            <address>${esc(author.company.data.address.en)}</address>
          </individInfo>
        </author>`
}

function buildMetaphorArticle(article: JournalArticleDetail): string {
  const authorsXml = article.autor.map(buildMetaphorAuthor).join('\n')

  const keywordsRu = article.key_words.ru_page
    .map((kw) => `            <keyword>${esc(kw.ru)}</keyword>`)
    .join('\n')

  const keywordsEn = article.key_words.en_page
    .map((kw) => `            <keyword>${esc(kw.en)}</keyword>`)
    .join('\n')

  const refsXml = article.literature
    .map((lit) => `            <refInfo lang="ANY">
              <text>${esc(lit.text)}</text>
            </refInfo>`)
    .join('\n')

  return `        <section>
          <secTitle lang="RUS">${esc(article.heading.ru)}</secTitle>
          <secTitle lang="ENG">${esc(article.heading.en)}</secTitle>
        </section>
        <article>
            <pages>${esc(article.page_no)}-${esc(article.page_no_to)}</pages>
            <artType>${esc(article.typersci.abbreviation)}</artType>
            <authors>
${authorsXml}
            </authors>
            <artTitles>
                <artTitle lang="RUS">${esc(article.title.ru)}</artTitle>
                <artTitle lang="ENG">${esc(article.title.en)}</artTitle>
            </artTitles>
            <abstracts>
                <abstract lang="RUS">${esc(article.body.ru)}</abstract>
                <abstract lang="ENG">${esc(article.body.en)}</abstract>
            </abstracts>
            <text lang="ANY">${esc(article.fulltext)}</text>
            <codes>
                <udk>${esc(article.udk)}</udk>
                <doi>${esc(article.doi)}</doi>
                <edn>${esc(article.edn)}</edn>
                <bbk>${UNDEF}</bbk>
                <vak>${UNDEF}</vak>
                <vak21>${UNDEF}</vak21>
                <jel>${UNDEF}</jel>
                <msc>${UNDEF}</msc>
                <pacs>${UNDEF}</pacs>
                <anycode>${UNDEF}</anycode>
            </codes>
            <keywords>
                <kwdGroup lang="RUS">
${keywordsRu}
                </kwdGroup>
                <kwdGroup lang="ENG">
${keywordsEn}
                </kwdGroup>
            </keywords>
            <rubrics>
                <rubric>${UNDEF}</rubric>
            </rubrics>
            <dates>
                <dateReceived>${esc(article.date_received)}</dateReceived>
                <dateAccepted>${esc(article.accepted)}</dateAccepted>
                <datePublication>${esc(article.published)}</datePublication>
            </dates>
            <references>
                <reference>
${refsXml}
                </reference>
            </references>
            <files>
                <file desc="fullText">${esc(article.text_pdf.filename)}</file>
            </files>
            <fundings>
                <funding lang="RUS">${UNDEF}</funding>
                <funding lang="ENG">${UNDEF}</funding>
            </fundings>
            <artFunding>
                <funding lang="RUS">${UNDEF}</funding>
                <funding lang="ENG">${UNDEF}</funding>
            </artFunding>
            <secTitle lang="RUS">${esc(article.heading.ru)}</secTitle>
        </article>`
}

export function buildMetaphorXml(
  metadata: JournalMetadata,
  journalNumberData: JournalNumber,
  articles: JournalArticleDetail[],
): string {
  const cntArticle = String(articles.length)
  const now = new Date()
  const dateStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`

  const articlesXml = articles.map(buildMetaphorArticle).join('\n')

  const pages = journalNumberData.journal_no_start && journalNumberData.journal_no_end
    ? `${esc(journalNumberData.journal_no_start)}-${esc(journalNumberData.journal_no_end)}`
    : ''

  return `<?xml version="1.0" encoding="utf-16" standalone="no"?>
<journal>
    <operCard>
        <date>${dateStr}</date>
        <cntArticle>${cntArticle}</cntArticle>
        <cs>1</cs>
        <operator>Автогенерация</operator>
    </operCard>
    <titleid>${esc(metadata.titleid)}</titleid>
    <issn>${esc(metadata.issnPrint)}</issn>
    <eissn>${esc(metadata.issnOnline)}</eissn>
    <codeNEB>${UNDEF}</codeNEB>
    <journalInfo lang="RUS">
        <title>${esc(metadata.elibraryTitle.ru)}</title>
        <abbrTitle>${UNDEF}</abbrTitle>
        <publ>${UNDEF}</publ>
        <placePubl>${UNDEF}</placePubl>
        <address>${UNDEF}</address>
    </journalInfo>
    <journalInfo lang="ENG">
        <title>${esc(metadata.elibraryTitle.en)}</title>
        <abbrTitle>${UNDEF}</abbrTitle>
        <publ>${UNDEF}</publ>
        <placePubl>${UNDEF}</placePubl>
    </journalInfo>
    <issue>
        <volume>${esc(journalNumberData.volume)}</volume>
        <number>${esc(journalNumberData.number)}</number>
        <dateUni>${esc(journalNumberData.year)}</dateUni>
        <part></part>
        <pages>${pages}</pages>
        <issTitle lang="RUS">${esc(journalNumberData.title.ru)}</issTitle>
        <issTitle lang="ENG">${esc(journalNumberData.title.en)}</issTitle>
        <codes>
            <doi>${UNDEF}</doi>
            <edn>${UNDEF}</edn>
        </codes>
        <files>
            <file desc="fullText">${UNDEF}</file>
        </files>
        <articles>
${articlesXml}
        </articles>
    </issue>
</journal>`
}
