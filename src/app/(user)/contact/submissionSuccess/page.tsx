import { Dancing_Script } from "@next/font/google";
import Link from "next/link";
type Props = {};
const dancing_script = Dancing_Script({ subsets: ["latin"] });

function FormSubmissionSuccess({}: Props) {
  return (
    <main className="mt-10 min-h-screen">
      <h1 className={`text-7xl ${dancing_script.className} mt-4 text-center`}>
        Contact Author
      </h1>
      <div className="mx-auto my-4 flex max-w-2xl flex-col items-center justify-center gap-6 text-center font-semibold text-gray-500">
        <p>
          Thank you for sending me a message, I will get back to you as soon as
          possible.
        </p>
        <Link
          className="flex items-center rounded-md bg-[#E7E247] p-2 px-4  py-2 text-black transition-colors duration-200 ease-in hover:bg-[#E7E247] hover:text-white"
          href="/"
        >
          Go to home
        </Link>
      </div>
    </main>
  );
}

export default FormSubmissionSuccess;
