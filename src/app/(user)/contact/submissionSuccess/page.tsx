import { Dancing_Script } from "@next/font/google"
import Link from "next/link"
type Props = {}
const dancing_script = Dancing_Script({ subsets: ['latin'] })

function FormSubmissionSuccess({ }: Props) {
    return (
        <main className="mt-10">
            <h1 className={`text-7xl ${dancing_script.className} text-center`}>Contact Author</h1>
            <div className="flex flex-col justify-center gap-2 items-center font-semibold text-center my-4 max-w-2xl mx-auto text-gray-500">
                <p>Thank you for sending me a message, I will get back to you as soon as possible.</p>
                <Link className="px-4 py-2 bg-[#E7E247] text-black flex items-center  p-2 rounded-md hover:bg-[#E7E247] hover:text-white transition-colors duration-200 ease-in" href="/">Go to home</Link>
            </div>
        </main>

    )
}

export default FormSubmissionSuccess