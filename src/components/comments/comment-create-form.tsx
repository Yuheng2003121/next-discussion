"use client"
import { createComment } from "@/actions/create-comment";
import { Button, Textarea } from "@heroui/react";
import { Alert } from "antd";
import React, { startTransition, useActionState, useEffect, useRef, useState } from "react";

export default function CommentsForm({
  postId,
  isOpen,
  parentId,
}: {
  postId: string;
  isOpen?: boolean;
  parentId?: string;
}) {
  const [open, setOpen] = useState(isOpen);
  const [state, formAction, isPending] = useActionState(
    createComment.bind(null, { postId, parentId }),
    {
      errors: {},
    }
  );

  const formRef = useRef<HTMLFormElement | null>(null);
  // 重置表单方案: 1.使用form的action而不是onSubmit  2.使用useEffect调用表单的reset
  useEffect(() => {
    // 只有表单验证没错误的时候才清除表单(如果验证失败有错误, 则不清除表单,让用户继续输入)
    if (!state.errors) {
      formRef.current?.reset();
    }
  }, [state]);
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    startTransition(() => {
      formAction(formData);
    });
  }
  return (
    <div className="space-y-3 mt-3">
      {!open && (
        <Button size="sm" variant="shadow" onClick={() => setOpen(!open)}>
          Reply
        </Button>
      )}
      {open && (
        <form
          onSubmit={handleSubmit}
          noValidate
          className="space-y-3 mt-3"
          ref={formRef}
        >
          {/* 提交表单后失败的提示 */}
          {state.errors?.validation ? (
            <Alert
              type="error"
              message={state.errors?.validation.join(",")}
              banner
            />
          ) : null}

          <Textarea
            name="content"
            label="Reply"
            labelPlacement="inside"
            placeholder="Enter your reply"
            isInvalid={!!state.errors?.content}
            errorMessage={state.errors?.content?.join(",")}
          ></Textarea>
          <Button type="submit" isLoading={isPending}>
            Create your comment
          </Button>
        </form>
      )}
    </div>
  );
}
