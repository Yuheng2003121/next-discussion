"use server";

import { auth } from "@/auth";
import { z } from "zod";
import { prisma } from "@/prisma";
import { revalidatePath } from "next/cache";

const formSchema = z.object({
  content: z.string().min(5).max(2000),
});

interface CreateCommentFormState {
  errors?: {
    content?: string[];
    validation?: string[];
  };
}
export async function createComment(
  { postId, parentId }: { postId: string; parentId?:string },
  prevState: CreateCommentFormState,
  formData: FormData
): Promise<CreateCommentFormState> {
  const content = formData.get("content") as string;

  //表单验证
  const result = formSchema.safeParse({ content });
  if (!result.success) {
    return {
      ...prevState,
      errors: result.error.flatten().fieldErrors,
    };
  }

  //判断是否登录
  const session = await auth();
  if (!session || !session.user) {
    return {
      ...prevState,
      errors: {
        validation: ["You must be signed in to create a post"],
      },
    };
  }
  console.log(content + " " + session.user.id);

  //身份验证成功
  //提交该comment到数据库
  try {
    await prisma.comment.create({
      data: {
        content: result.data.content,
        userId: session.user.id,
        postId,
        parentId,
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      return {
        errors: {
          validation: [error.message],
        },
      };
    } else {
      return {
        errors: {
          validation: ["Something went wrong"],
        },
      };
    }
  }

  // 查找包含指定 postId 的 Topic
  const topic = await prisma.topic.findFirst({
    where: {
      posts: {
        some: {
          id: postId,
        },
      },
    },
  });
  if (!topic) {
    return {
      errors: {
        validation: ["Failed to find topic"],
      },
    };
  }

  //添加完成之后, 使指定路径的缓存失效，强制重新生成该页面的内容
  revalidatePath(`/topics/${topic?.name}/posts/${postId}`);

  // 添加成功后的返回值
  return {
    ...prevState,
    errors: undefined, // 清空错误
  };
}
