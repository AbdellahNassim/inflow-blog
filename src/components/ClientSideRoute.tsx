"use client";

import Link from "next/link"
import { PropsWithChildren } from "react"
import { Url } from "url"
type Props = PropsWithChildren<{
    route : Url | string
}>

function ClientSideRoute({children,route,...props}: Props) {
  return (
    <Link href={route} {...props}>{children}</Link>
  )
}

export default ClientSideRoute