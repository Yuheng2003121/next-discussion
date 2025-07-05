import { Comment } from "@prisma/client";
import { prisma } from "..";
import { cache } from "react";


export type  CommentListItem =  {
  User: {
      name: string | null;
      id: string;
      image: string | null;
  } | null;
} & Comment;


//cache: 对相同参数的函数调用，返回缓存结果而不是重新执行 (记住在修改数据的formAction中使用revalidatePath)
export const getCommentsByPostid = cache(
  async (postId: string): Promise<CommentListItem[]> => {
    return await prisma.comment.findMany({
      where: {
        postId,
      },
      include: {
        User: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
    });
  }
);