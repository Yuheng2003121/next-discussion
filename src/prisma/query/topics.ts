import { prisma } from "@/prisma";
export async function getTopics() {
   //使用 ​​Prisma ORM​​ 从数据库中查询 topic 表的所有记录，并同时关联查询每个 topic 关联的 posts 数量。
  const topics = await prisma.topic.findMany({
    include: {
      _count: {
        select: {
          posts: true,
        },
      },
    },
  });
   //console.log(topics);
    //[{"id":"cmcmuieoc0001vhv89n917kbf","name":"javascript","description":"I love js","createdAt":"2025-07-03T03:48:21.325Z","updatedAt":"2025-07-03T03:48:21.325Z","userId":"cmckkt2f90000vhd4rg7w5cfo","_count":{"posts":0}},{"id":"cmcmv4k320003vhv8s9njt2k0","name":"react","description":"学习react","createdAt":"2025-07-03T04:05:34.767Z","updatedAt":"2025-07-03T04:05:34.767Z","userId":"cmckkt2f90000vhd4rg7w5cfo","_count":{"posts":0}}]
  return topics;
}

