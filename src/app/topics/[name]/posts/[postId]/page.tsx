import CommentsForm from '@/components/comments/comment-create-form';
import CommentList from '@/components/comments/comment-list';
import PostContent from '@/components/posts/post-content';
import PostContentLoading from '@/components/posts/post-content-loading';
import React, { Suspense } from 'react'

type Params = Promise<{ postId: string; name: string }>
export default async function PostPage({ params }: {params: Params}) {
  //  name:主题topic名字, postId:帖子id
  const { postId } = await params;
  
  
  return (
    <div>
      <Suspense fallback={<PostContentLoading />}>
        <PostContent postId={postId} />
      </Suspense>
      <CommentsForm postId={postId} isOpen={true}/>
      <CommentList postId={postId} />
    </div>
  );
}
