"use client";

import { createPost } from "@/actions/create-post";
import React, { startTransition, useActionState } from "react";

import {
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Input,
  Textarea,
  // Chip,
} from "@heroui/react";
import { Alert } from "antd";

interface Props {
  topicName: string;
}

//表单提交+验证使用useActionState/useFormState
export default function PostCreateFeromBtn(props: Props) {
  const { topicName } = props;
  const [state, formAction, isPending] = useActionState(createPost.bind(null, topicName), {
    errors: {},
  });
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    startTransition(() => {
      formAction(formData);
    });
  }
  return (
    <Popover placement="left">
      <PopoverTrigger>
        <Button color="primary" variant="bordered" className="block ml-auto">
          New Post
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        {/*  <form action={formAction}> */}
        {/* 表单提交后保留表单内容 */}
        <form onSubmit={handleSubmit} noValidate>
          <div className="flex flex-col gap-4 p-4 w-80">
            <h3 className="text-lg border-b-1 border-gray-300">
              Create a post
            </h3>
            {/* 提交表单后失败的提示 */}
            {state.errors?.validation ? (
              <Alert
                type="error"
                message={state.errors?.validation.join(",")}
                banner
              />
            ) : null}

            <Input
              name="title"
              label="Title"
              labelPlacement="outside"
              placeholder="Title"
              isInvalid={!!state.errors?.title}
              errorMessage={state.errors?.title?.join(",")}
            />
            <Textarea
              name="content"
              label="Content"
              labelPlacement="outside"
              placeholder="Describe your post"
              isInvalid={!!state.errors?.content}
              errorMessage={state.errors?.content?.join(",")}
            />
            <Button type="submit" isLoading={isPending}>
              Submit
            </Button>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
}
