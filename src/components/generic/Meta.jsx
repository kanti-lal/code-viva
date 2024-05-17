import React from 'react'
import Head from 'next/head'

function Meta({
  title,
  keyword,
  description,
  img,
  imgDescription,
  canonicalUrl,
}) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="keywords" content={keyword} />
      <meta name="description" content={description} />
      {img && <meta property="og:image" content={img} />}
      {imgDescription && (
        <meta property="og:description" content={imgDescription} />
      )}
      <link rel="canonical" href={canonicalUrl} />
    </Head>
  )
}



export default Meta
