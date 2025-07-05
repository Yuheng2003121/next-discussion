"use client"
import { PostListItem } from "@/prisma/query/posts";
import { Avatar, Listbox, ListboxItem } from "@heroui/react";
import { useRouter } from "next/navigation";
import React from "react";

interface Props {
  posts: PostListItem[];
}
export default function PostList(props: Props) {
  const { posts } = props;
  const router = useRouter()!;
  return (
    <Listbox
      className="p-0"
      aria-label="Post List"
      itemClasses={{
        base: "border-small border-default-200 mt-4",
      }}
    >
      {posts.map((post: PostListItem) => {
        const topicName = post.Topic!.name;
        if(!topicName) {
          throw new Error("Topic name is required");
        }
        return (
          <ListboxItem
            key={post.id}
            startContent={post.User?.image && <div><Avatar src={post.User?.image} className="w-8 h-8"/></div>}
            description={<p className="text-small mt-3">By {post.User?.name}</p>}
            endContent={
              <span className="text-small text-gray-400 whitespace-nowrap self-end">
                {post._count!.comments} comments
              </span>
            }
            onPress={() => {
              router.push(`/topics/${post.Topic?.name}/posts/${post.id}`)
            }}
          >
            {post.title}
          </ListboxItem>
        );
      })}
     
    </Listbox>
  );
}


