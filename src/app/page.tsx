import PostList from "@/components/posts/post-list";
import TopicCreateFromBtn from "@/components/topics/topic-create-form";
import TopicList from "@/components/topics/topic-list";
import { getTopPosts } from "@/prisma/query/posts";
import React from "react";

export default async function Page() {
  const topPosts = await getTopPosts()
  return (
    <div className="flex justify-between">
      <div className="w-2/5">
        <h1 className="text-xl">TOP posts</h1>
        <PostList posts={topPosts}/>
      </div>
      <div className="w-1/5">
        <TopicCreateFromBtn />
        <TopicList />
      </div>
    </div>
  );
}
