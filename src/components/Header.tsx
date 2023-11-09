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
    <header className="sticky top-0 left-0 z-50 flex items-center justify-between space-x-2 rounded-b-2xl bg-slate-50 bg-opacity-20 px-10 py-2 font-bold drop-shadow-lg backdrop-blur-md">
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
              <div className="flex items-center gap-1">
                <Image
                  className="rounded-full"
                  src={session.user?.image!}
                  alt={session.user?.name!}
                  width={30}
                  height={30}
                />
                <button
                  title="signout"
                  className="text-slate-900"
                  onClick={(e) => signOut()}
                >
                  <ArrowRightOnRectangleIcon className="w-6" />
                </button>
              </div>
            </>
          ) : (
            <button
              className="flex items-center gap-1 text-slate-900"
              title="signin"
              onClick={(e) => signIn()}
            >
              {" "}
              <p>Sign in</p>
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
