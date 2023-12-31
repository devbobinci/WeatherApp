import { SunIcon } from "@heroicons/react/solid";

export default function Loading() {
  return (
    <div className="bg-gradient-to-br from-[#437843] to-[#0f301d] min-h-screen flex flex-col items-center justify-center text-slate-500">
      <SunIcon className="h-24 w-24 animate-bounce text-yellow-500" />

      <h1 className="text-6xl font-bold text-center mb-10 animate-pulse text-gray-200">
        Loading City Weather Information
      </h1>
      <h2 className="text-xl font-bold text-center mb-10 animate-pulse text-white/30">
        Hold on, we are crunching the numbers & generating an AI summary of the
        Weather!
      </h2>
    </div>
  );
}
