"use server";

import { auth } from "@/auth";
import { z } from "zod";
import { prisma } from "@/prisma";
import type { Topic } from "@prisma/client";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

const formSchema = z.object({
  name: z
    .string()
    .min(3)
    .regex(/^[a-zA-Z0-9_-]+$/, {
      message:
        "Name can only contain letters, numbers, underscores, and dashes",
    }),
  description: z.string().min(5).max(2000),
});

interface CreateTopicFormState {
  errors?: {
    name?: string[];
    description?: string[];
    validation?: string[];
  };
}
export async function createTopics(
  prevState: CreateTopicFormState,
  formData: FormData
): Promise<CreateTopicFormState> {
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const result = formSchema.safeParse({ name, description });
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
        validation: ["You must be signed in to create a topic"],
      },
    };
  }
  console.log(name + " " + description + " " + session.user.id);

  //身份验证成功
  //提交到数据库
  let topic: Topic;
  try {
    topic = await prisma.topic.create({
      data: {
        name: result.data.name,
        description: result.data.description,
        userId: session.user.id,
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
  redirect(`/topics/${topic.name}`);
}
