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

function describeValue(value: unknown): string {
  if (value === null) return 'null'
  if (value === undefined) return 'undefined'
  try {
    return JSON.stringify(value)
  } catch {
    return Object.prototype.toString.call(value)
  }
}

function assertArray<T>(
  value: T[] | null | undefined,
  fieldPath: string,
  context: string,
): T[] {
  if (Array.isArray(value)) return value

  const type = value === null ? 'null' : typeof value
  throw new Error(
    `[Metaphor XML] ${context}: поле "${fieldPath}" должно быть массивом, получено ${type}. Значение: ${describeValue(value)}`,
  )
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
  const context = `статья id=${article.id}`

  const authorsXml = assertArray(
    article.autor,
    'article.autor',
    context,
  ).map(buildMetaphorAuthor).join('\n')

  const keywordsRu = assertArray(
    article.key_words?.ru_page,
    'article.key_words.ru_page',
    context,
  )
    .map((kw) => `            <keyword>${esc(kw.ru)}</keyword>`)
    .join('\n')

  const keywordsEn = assertArray(
    article.key_words?.en_page,
    'article.key_words.en_page',
    context,
  )
    .map((kw) => `            <keyword>${esc(kw.en)}</keyword>`)
    .join('\n')

  const refsXml = assertArray(
    article.literature,
    'article.literature',
    context,
  )
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
            <secTitle lang="RUS">${esc(article.heading.ru)}</secTitle>
        </article>`
}

export function buildMetaphorXml(
  metadata: JournalMetadata,
  journalNumberData: JournalNumber,
  articles: JournalArticleDetail[],
): string {
  const checkedArticles = assertArray(
    articles,
    'articles',
    `журнал id=${journalNumberData.id}`,
  )
  const cntArticle = String(checkedArticles.length)
  const now = new Date()
  const dateStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`

  const articlesXml = checkedArticles.map(buildMetaphorArticle).join('\n')

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
    <journalInfo lang="RUS">
        <title>${esc(metadata.elibraryTitle.ru)}</title>
        <abbrTitle>${esc(metadata.abbrTitle)}</abbrTitle>
        <publ>${esc(metadata.publ)}</publ>
        <placePubl>${esc(metadata.placePubl)}</placePubl>
        <address>${esc(metadata.address)}</address>
    </journalInfo>
    <journalInfo lang="ENG">
        <title>${esc(metadata.elibraryTitle.en)}</title>
        <abbrTitle>${esc(metadata.abbrTitle)}</abbrTitle>
        <publ>${esc(metadata.publ)}</publ>
        <placePubl>${esc(metadata.placePubl)}</placePubl>
    </journalInfo>
    <issue>
        <volume>${esc(journalNumberData.volume)}</volume>
        <number>${esc(journalNumberData.number)}</number>
        <dateUni>${esc(journalNumberData.year)}</dateUni>
        <part></part>
        <pages>${pages}</pages>
        <issTitle lang="RUS">${esc(journalNumberData.title.ru)}</issTitle>
        <issTitle lang="ENG">${esc(journalNumberData.title.en)}</issTitle>
        <files>
            <file desc="fullText">${UNDEF}</file>
        </files>
        <articles>
${articlesXml}
        </articles>
    </issue>
</journal>`
}
