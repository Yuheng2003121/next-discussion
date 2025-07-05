"use client"

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
import { createTopics } from "@/actions";
import { Alert } from "antd";


//表单提交+验证使用useActionState/useFormState
export default function TopicCreateFromBtn() {

  const [state, formAction, isPending] = useActionState(createTopics, {errors: {}});
 
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
          New Topic
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        {/*  <form action={formAction}> */}
        {/* 表单提交后保留表单内容 */}
        <form onSubmit={handleSubmit} noValidate>
          <div className="flex flex-col gap-4 p-4 w-80">
            <h3 className="text-lg border-b-1 border-gray-300">
              Create a topic
            </h3>
            {/* 提交后身份验证失败的提示 */}
            {state.errors?.validation ? (
              <Alert
                type="error"
                message={state.errors?.validation.join(",")}
                banner
              />
            ) : null}
            <Input
              name="name"
              label="Name"
              labelPlacement="outside"
              placeholder="name"
              isInvalid={!!state.errors?.name}
              errorMessage={state.errors?.name?.join(",")}
            />
            <Textarea
              name="description"
              label="description"
              labelPlacement="outside"
              placeholder="Describe your topic"
              isInvalid={!!state.errors?.description}
              errorMessage={state.errors?.description?.join(",")}
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
