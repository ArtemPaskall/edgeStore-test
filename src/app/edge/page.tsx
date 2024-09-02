'use client'
import React, { useState } from 'react'
import { useEdgeStore } from '@/lib/edgestore'
import Link from 'next/link'

export default function EdgeStoreUpload() {
  const [file, setFile] = useState<File>()
  const { edgestore } = useEdgeStore()
  const [urls, setUrls] = useState<{
    url: string,
    thumbnailUrl: string | null
  }>()


  return (
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'start'}}>
      <input 
        type="file" 
        placeholder="Enter file" 
        onChange={e => setFile(e.target.files?.[0])}
      />

      <button
        onClick={ async (e) => {
          if (file) {
            const res = await edgestore.myPublicImages.upload({ file })

            setUrls({url: res.url, thumbnailUrl: res.thumbnailUrl})
          }
        }}
      >
        Uploud
      </button>

      {urls?.url && <Link href={urls.url} target='_blanc'>URL</Link>}
      {urls?.thumbnailUrl && <Link href={urls.thumbnailUrl} target='_blanc'>thumbnailUrl</Link>}
    </div>
  )
}
