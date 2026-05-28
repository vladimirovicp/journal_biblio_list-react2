function getXmlEncoding(xml: string): string {
  const match = xml.match(/^<\?xml\s+[^>]*encoding=["']([^"']+)["']/i)
  return match?.[1].toLowerCase() ?? 'utf-8'
}

function encodeUtf16LeWithBom(xml: string): ArrayBuffer {
  const buffer = new ArrayBuffer(2 + xml.length * 2)
  const bytes = new Uint8Array(buffer)
  bytes[0] = 0xff
  bytes[1] = 0xfe

  for (let i = 0; i < xml.length; i += 1) {
    const code = xml.charCodeAt(i)
    const offset = 2 + i * 2
    bytes[offset] = code & 0xff
    bytes[offset + 1] = code >> 8
  }

  return buffer
}

function createXmlBlob(xml: string): Blob {
  const encoding = getXmlEncoding(xml)

  if (encoding === 'utf-16' || encoding === 'utf-16le') {
    return new Blob([encodeUtf16LeWithBom(xml)], {
      type: 'application/xml;charset=utf-16',
    })
  }

  return new Blob([xml], { type: `application/xml;charset=${encoding}` })
}

export function downloadXml(xml: string, filename: string): void {
  const blob = createXmlBlob(xml)
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
