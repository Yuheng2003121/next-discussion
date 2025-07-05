import PostCreateFromBtn from "@/components/posts/post-create-form";
import PostList from "@/components/posts/post-list";
import { getPostsByTopicName } from "@/prisma/query/posts";
import React from "react";

type Params = Promise<{ name: string }>;

export default async function TopicPage({ params }: { params: Params }) {
  const topic = (await params).name;
  const posts = await getPostsByTopicName(topic)

  return (
    <div className="flex justify-between">
      <div className="w-3/5">
        <h1 className="text-xl">{topic}</h1>
        <PostList posts={posts}/>
      </div>
      <div>
        <PostCreateFromBtn topicName={topic} />
      </div>
    </div>
  );
}
