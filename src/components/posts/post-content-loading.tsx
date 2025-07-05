import { Skeleton } from '@heroui/react'
import React from 'react'

export default function PostContentLoading() {
  return (
    <div>
      <div className="my-3">
        <Skeleton className="h-8 w-48" />
      </div>
      <div className="border border-default-200 p-3 rounded-md">
        <Skeleton className="h-6 " />
      </div>
    </div>
  );
}
