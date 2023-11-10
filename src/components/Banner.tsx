import { Dancing_Script } from "@next/font/google";
type Props = {};
const dancing_script = Dancing_Script({ subsets: ["latin"] });
function Banner({}: Props) {
  return (
    <div className="mt-10 flex flex-col items-center justify-between space-x-2 px-10 py-2 text-center md:mt-5 md:flex-row md:text-left">
      <div>
        <h1 className={`${dancing_script.className} text-7xl font-bold`}>
          Inflow Weekly Blog
        </h1>
        <h2 className="mt-8 text-2xl md:mt-4">
          Welcome to{" "}
          <span className="font-bold underline decoration-[#E7E247] decoration-4">
            Every Technology Enthusiast
          </span>
        </h2>
      </div>
      <p className="mt-5 max-w-sm text-gray-400 md:mt-2">
        <span className={`${dancing_script.className} text-xl font-bold`}>
          Inflow
        </span>{" "}
        the right place to get your weekly dose of technical knowledge
      </p>
    </div>
  );
}

export default Banner;
