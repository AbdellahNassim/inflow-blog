import { Dancing_Script } from "@next/font/google"
type Props = {}
const dancing_script = Dancing_Script({ subsets: ['latin'] })
function Banner({}: Props) {
  return (
    <div className="mt-10 md:mt-5 flex text-center flex-col md:flex-row md:text-left items-center justify-between space-x-2 px-10 py-2">
        <div>
            <h1 className={`${dancing_script.className} text-7xl font-bold`}>Inflow Daily Blog</h1>
             <h2 className="mt-8 md:mt-4 text-2xl">
              Welcome to {" "}
              <span className="underline decoration-4 decoration-[#E7E247] font-bold">Every Technology Enthusiast</span>
             </h2>
        </div>
        <p className="mt-5 md:mt-2 text-gray-400 max-w-sm">
            <span className={`${dancing_script.className} text-xl font-bold`}>Inflow</span> the right place to get your daily dose of technical knowledge
        </p>
    </div>
  )
}

export default Banner