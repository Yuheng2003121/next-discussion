// import Image from 'next/image'
import React from 'react'
import CommentListContent from './comment-list-content';
import { CommentListItem, getCommentsByPostid } from '@/prisma/query/comments';

export default async function CommentList({ postId }: { postId: string }) {
  const comments = await getCommentsByPostid(postId);

  //从所有的comments中，找出parentId为null的comments
  const topLevelComments = comments.filter((comment) => comment.parentId === null)
  return (
    <div className="mt-6 space-y-3">
      <h1 className="text-lg font-bold">All {comments.length} comments</h1>
      {/* 只有comment.parentId是null的comment才在这里(最外层)显示 */}
      {topLevelComments.map((comment: CommentListItem) => {
        return <CommentListContent comment={comment} key={comment.id}/>;
      })}
    </div>
  );
}
