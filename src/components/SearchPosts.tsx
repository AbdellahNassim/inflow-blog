"use client";
import { MagnifyingGlassIcon, ArrowDownIcon } from "@heroicons/react/24/solid";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import Link from "next/link";
import React from "react";
type Props = {};

function SearchPosts({}: Props) {
  const pathname = usePathname();
  const params = useSearchParams();
  const [search, setSearch] = React.useState<string>(
    String(params.get("search") ?? "")
  );
  const [categories, setCategories] = React.useState<string>(
    String(params.get("categories") ?? "")
  );
  return (
    <div className="flex gap-4">
      <div
        style={{ flex: 5 }}
        className="group flex w-full cursor-pointer items-center gap-2 rounded-md border-2 border-gray-300 p-2 transition-colors duration-200 ease-in focus-within:border-[#E7E247] focus-within:outline-[#E7E247] group-hover:outline-[#E7E247]"
      >
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="text to search"
          className="w-full outline-none focus:outline-none"
        />
        <Link href={{ pathname: pathname, query: { search, categories } }}>
          <MagnifyingGlassIcon className="h-6 w-6" />
        </Link>
      </div>
      <div
        style={{ flex: 1 }}
        className="group flex w-full cursor-pointer items-center gap-2 rounded-md border-2 border-gray-300 p-2 transition-colors duration-200 ease-in focus-within:border-[#E7E247] focus-within:outline-[#E7E247] group-hover:outline-[#E7E247]"
      >
        <input
          type="text"
          value={categories}
          onChange={(e) => setCategories(e.target.value)}
          placeholder="CS, AI, ML, etc."
          className="w-full outline-none focus:outline-none"
        />
        <Link href={{ pathname: pathname, query: { search, categories } }}>
          <ArrowDownIcon className="h-6 w-6" />
        </Link>
      </div>
    </div>
  );
}

export default SearchPosts;
