import PostList from '@/components/posts/post-list'
import { getPostByPnameorcon } from '@/prisma/query/posts'
import { redirect } from 'next/navigation'
import React from 'react'

type SearchParams = Promise<{pnameorcon: string}>
export default async function SearchPage({searchParams}: {searchParams: SearchParams}) {
  const {pnameorcon} = await searchParams
  const posts  = await getPostByPnameorcon(pnameorcon)
  if(!pnameorcon) {
    redirect('/')
  }
  return (
    <div>
      <PostList posts={posts}/>
    </div>
  )
}
