import Image from "next/image"
import Link from "next/link"
import { Dancing_Script } from "@next/font/google"

type Props = {}
const dancing_script = Dancing_Script({ subsets: ['latin'] })
function Header({ }: Props) {
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
            <div>
                <Link href="/contact" className={`${dancing_script.className} font-bold text-2xl`} > Contact Author </Link>
            </div>
        </header>
    )
}

export default Header