"use client";
import Image from "next/image";
import Link from "next/link";
import { Dancing_Script } from "@next/font/google";
import { useSession, signIn, signOut } from "next-auth/react";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/solid";
type Props = {};
const dancing_script = Dancing_Script({ subsets: ["latin"] });
function Header({}: Props) {
  const { data: session } = useSession();
  return (
    <header className="sticky left-0 top-0 z-50 flex items-center justify-between space-x-2 rounded-b-2xl bg-slate-50 bg-opacity-20 px-2 py-2 font-bold drop-shadow-lg backdrop-blur-md lg:px-10">
      <div>
        <Link href="/" className="flex items-center gap-2">
          <span className={`${dancing_script.className} text-4xl font-bold`}>
            Inflow
          </span>
          <Image
            src={"/double-arrows.png"}
            alt="Inflow Logo"
            width={50}
            height={50}
          />
        </Link>
      </div>

      <div className="flex items-center gap-2">
        <div className="rounded-lg bg-[#E7E247] p-2">
          {session ? (
            <>
              <button
                title="signout"
                className="flex items-center gap-1 text-slate-900"
                onClick={(e) => signOut()}
              >
                <Image
                  className="rounded-full"
                  src={session.user?.image!}
                  alt={session.user?.name!}
                  width={30}
                  height={30}
                />
                <ArrowRightOnRectangleIcon className="hidden w-6 md:block" />
              </button>
            </>
          ) : (
            <button
              className="flex items-center gap-1 text-slate-900"
              title="signin"
              onClick={(e) => signIn()}
            >
              {" "}
              <p className="hidden md:block">Sign in</p>
              <ArrowRightOnRectangleIcon className="w-6" />
            </button>
          )}
        </div>
        <Link
          href="/contact"
          className={`${dancing_script.className} text-2xl font-bold`}
        >
          {" "}
          Contact Author{" "}
        </Link>
      </div>
    </header>
  );
}

export default Header;
