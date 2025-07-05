import { CommentListItem, getCommentsByPostid } from '@/prisma/query/comments';
import dayjs from 'dayjs';
import Image from 'next/image';
import CommentsForm from './comment-create-form';

export default async function CommentListContent({comment}: {comment: CommentListItem}) {
  //从所有comments列表中, 找出parentId为comment.id的comments
  const comments = await getCommentsByPostid(comment.postId as string)
  const commentsChildren = comments?.filter((item) => item.parentId === comment.id)

  return (
    <div className="border-2 border-black dark:border-white p-4 rounded mt-3">
      <div className="flex gap-3">
        {/* <Image /> */}
        <Image
          src={comment.User?.image ?? ""}
          alt="User avatar"
          width={40}
          height={40}
          className="w-10 h-10 rounded-full bg-black"
        />
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-400">
            {comment.User?.name}
          </p>
          <p className="flex justify-between items-center">
            <span className="flex-1">{comment.content}</span>
            <span className="text-gray-400">
              {dayjs(comment.createdAt).format("YYYY/MM/DD HH:mm:ss")}
            </span>
          </p>
          <CommentsForm
            postId={comment.postId as string}
            isOpen={false}
            parentId={comment.id as string}
          />

          {/* 递归嵌套子评论, 导致该组件会被渲染多次,  */}
          {commentsChildren.map((item) => (
            <CommentListContent comment={item} key={item.id}/>
          ))}
        </div>
      </div>
    </div>
  );
}
