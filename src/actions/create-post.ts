"use server";

import { auth } from "@/auth";
import { z } from "zod";
import { prisma } from "@/prisma";
import type { Post } from "@prisma/client";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

const formSchema = z.object({
  title: z
    .string()
    .min(3)
    .regex(/^[a-zA-Z0-9_\-\s]+$/, {
      message:
        "Title can only contain letters, numbers, underscores, and dashes",
    }),
  content: z.string().min(5).max(2000),
});

interface CreatePostFormState {
  errors?: {
    title?: string[];
    content?: string[];
    validation?: string[];
  };
}
export async function createPost(
  topicName: string,
  prevState: CreatePostFormState,
  formData: FormData,
  
): Promise<CreatePostFormState> {
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;

  const result = formSchema.safeParse({ title, content });
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
  console.log(title + " " + content + " " + session.user.id);

  //身份验证成功
  //从topic数据库查询该postName所对应的topicId
  const topic = await prisma.topic.findUnique({
    where: {
      name: topicName,
    },
  });
  //如果topic不存在，则返回错误信息
  if (!topic) {
    return {
      ...prevState,
      errors: {
        validation: ["Topic does not exist"],
      },
    };
  }


  //提交该post到数据库
  let post: Post;
  try {
    post = await prisma.post.create({
      data: {
        title: result.data.title,
        content: result.data.content,
        userId: session.user.id,
        topicId: topic.id,
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

  revalidatePath('/')

  //添加完成之后, 跳转到对应topic页
  redirect(`/topics/${topic.name}/posts/${post.id}`);
}
