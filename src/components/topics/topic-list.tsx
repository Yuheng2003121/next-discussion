import React from "react";
import { Badge, Chip } from "@heroui/react";
import Link from "next/link";
import { getTopics } from "@/prisma/query/topics";

export const ListBoxWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className=" p-4 rounded-small border-2 border-gray-300 mt-4 flex flex-wrap gap-3">
      {children}
    </div>
  );
};
export default async function TopicList() {
  //使用 ​​Prisma ORM​​ 从数据库中查询 topic 表的所有记录，并同时关联查询每个 topic 关联的 posts 数量。
  const topics = await getTopics();
  

  return (
    // <div className="max-w-[260px] p-4 rounded-small border-1 border-gray-300 mt-4 flex flex-wrap gap-3">
    //   {topics.map((topic) => (
    //     <Chip color="default" variant="shadow" key={topic.id}>
    //       <Link href={`/topics/${topic.name}`}>{topic.name}</Link>
    //     </Chip>
    //   ))}
    // </div>
    <ListBoxWrapper>
      {topics.map((topic) => (
        <Badge
          color="primary"
          content={topic._count.posts}
          key={topic.id}
          shape="circle"
          size="sm"
        >
          <Chip color="default" variant="shadow">
            <Link href={`/topics/${topic.name}`}>{topic.name}</Link>
          </Chip>
        </Badge>
      ))}
    </ListBoxWrapper>
  );
}
