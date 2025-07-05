import { Post } from "@prisma/client";
import { prisma } from "..";

export type PostListItem = {
  User?: {
    name: string | null;
    id?: string;
    image?: string | null;
  } | null;
  Topic?: {
    name: string;
    id?: string;
  } | null;
  _count?: {
    comments: number;
  };
} & Post;


export async function getPostsByTopicName(name: string):Promise<PostListItem[]> {
  const posts = await prisma.post.findMany({
    where: {
      Topic: {
        name: name, // 筛选关联话题名称为`name`的帖子
      },
    },
    include: {
      // 可选：包含关联数据
      User: {
        select: {
          id: true,
          name: true,
        },
      },
      Topic: {
        select: {
          id: true,
          name: true,
        },
      },
      _count: {
        select: {
          comments: true, // 计算每篇帖子关联的评论数量
        },
      },
    },
  });

  //[{"id":"post1","title":"Prisma入门指南","content":"...","createdAt":"2023-01-01T00:00:00Z","Topic":{},"User":{"id":"user1","name":"Alice"},"_count":{"comments":5}}]
  return posts;
}


 // 按评论数量排序(倒叙)
export async function getTopPosts(): Promise<PostListItem[]> {
  const posts = await prisma.post.findMany({
    orderBy: {
      comments: {
        _count: "desc",
      },
    },
    take: 5,
    include: {
      // 可选：包含关联数据
      User: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
      Topic: {
        select: {
          id: true,
          name: true,
        },
      },
      _count: {
        select: {
          comments: true, // 计算每篇帖子关联的评论数量
        },
      },
    },
  });

  return posts;
}

export async function getPostById(postId: string) {
  const post = await prisma.post.findUnique({
    where: { 
      id: postId
     },
    include: {
      User: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

  return post;
}

export async function getPostByPnameorcon(pnameorcon: string) {
  const posts = await prisma.post.findMany({
    where: {
      OR: [
        { title: { contains: pnameorcon } },
        { content: { contains: pnameorcon } },
      ],
    },
    include: {
      User: {
        select: {
          name: true,
          image: true
        },
      },
      Topic: {
        select: {
          name: true
        }
      },
      _count: {
        select: {
          comments: true
        }
      }
    },
  });
  return posts;
  
}