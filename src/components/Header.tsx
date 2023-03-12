"use client"
import Image from "next/image"
import Link from "next/link"
import { Dancing_Script } from "@next/font/google"
import { useSession, signIn, signOut } from "next-auth/react"
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/solid"
type Props = {}
const dancing_script = Dancing_Script({ subsets: ['latin'] })
function Header({ }: Props) {

    const { data: session } = useSession()
    return (
        <header className="flex items-center justify-between space-x-2 font-bold px-10 py-2">
            <div>
                <Link href="/" className="flex items-center gap-2">
                    <span className={`${dancing_script.className} font-bold text-4xl`}>Inflow</span>
                    <Image
                        src={"/double-arrows.png"}
                        alt="Inflow Logo"
                        width={50}
                        height={50}
                    />

                </Link>
            </div>

            <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-[#E7E247]">
                    {session ? (<>
                        <div className="flex items-center gap-1">

                            <Image
                                className="rounded-full"
                                src={session.user?.image!}
                                alt={session.user?.name!}
                                width={30}
                                height={30}
                            />
                            <button title="signout" className="text-slate-900" onClick={(e) => signOut()}><ArrowRightOnRectangleIcon className="w-6" /></button>
                        </div>
                    </>) : (
                        <button className="flex gap-1 items-center text-slate-900" title="signin" onClick={(e) => signIn()}> <p>Sign in</p><ArrowRightOnRectangleIcon className="w-6" /></button>
                    )}
                </div>
                <Link href="/contact" className={`${dancing_script.className} font-bold text-2xl`} > Contact Author </Link>
            </div>
        </header>
    )
}

export default Header