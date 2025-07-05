import { search } from '@/actions/search';
import { Input } from '@heroui/react';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

export default function HeaderInput() {
  const params = useSearchParams()
  const pnameorcon = params.get('pnameorcon') || ''
  const [searchCon, setSearchCon] = useState(pnameorcon)
  
  useEffect(() => {
    setSearchCon(params.get("pnameorcon") || "");
  }, [params])

  return (
    <div className="w-[200px] rounded-2xl flex justify-center items-center bg-gradient-to-tr from-blue-500 to-white-500 text-white">
      <form action={search}>
        <Input
          value={searchCon}
          onChange={(e) => setSearchCon(e.target.value)}
          name="pnameorcon"
          isClearable
          classNames={{
            input: [
              "bg-transparent",
              "text-black/90 dark:text-white/90",
              "placeholder:text-default-700/50 dark:placeholder:text-white/60",
            ],
            innerWrapper: "bg-transparent",
            inputWrapper: [
              "shadow-xl",
              "bg-default-200/50",
              "dark:bg-default/60",
              "backdrop-blur-xl",
              "backdrop-saturate-200",
              "!cursor-text",
            ],
          }}
          placeholder="Type to search..."
          radius="lg"
        />
      </form>
    </div>
  );
}
