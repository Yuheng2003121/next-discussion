import React from 'react'
import { getPostById } from '@/prisma/query/posts';
import { notFound } from 'next/navigation';
import { sleep } from '@/utils';


export default async function PostContent({postId}: {postId: string}) {
  await sleep(3000)
  const post = await getPostById(postId)
  if (!post) {
    notFound();
  }
  return (
    <div>
      <h1 className="text-2xl font-bold my-3">{post.title}</h1>
      <p className="border border-default-200 p-3 rounded-md">{post.content}</p>
    </div>
  );
}
