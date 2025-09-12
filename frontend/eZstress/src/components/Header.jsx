import { Terminal } from "lucide-react"

export default function Header() {
  return (
    <div className="bg-neutral-900 border-b border-neutral-800 px-6 py-4">
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-8 h-8 bg-white rounded-lg">
          <Terminal className="w-5 h-5 text-black" />
        </div>
        <h1 className="text-xl font-bold text-white tracking-tight">Ezstress</h1>
        <div className="ml-auto text-xs text-neutral-400">C++ Stress Testing Platform - nish</div>
      </div>
    </div>
  )
}
