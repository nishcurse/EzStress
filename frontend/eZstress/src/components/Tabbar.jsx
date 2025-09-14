import { FileCode2 } from "lucide-react"
import Curr from "../store/Curr"
import SubmitButton from "./SubmitButton"


const Tabbar = () => {
  const { ActiveTab, setActiveTab } = Curr((state) => state)

  const handleTabClick = (tabId) => {
    setActiveTab(tabId)
  }

  const tabs = [
    { id: "generate", label: "generate.cpp" },
    { id: "optimal", label: "optimal.cpp" },
    { id: "brute", label: "brute.cpp" },
  ]

  return (
    <div className="flex justify-between">
      <div className="inline-flex items-center bg-black border border-gray-800 rounded-lg p-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab.label)}
            className={`
              flex flex-row items-center relative px-3 py-2 m-0.5 text-sm font-medium rounded-md transition-all duration-150 ease-out
              ${
                ActiveTab === tab.label
                  ? "bg-white text-black shadow-sm hover:bg-gray-400"
                  : "text-gray-400 hover:text-white hover:bg-gray-900"
              }
            `}
          >
          <FileCode2 className="w-4 h-4 text-blue-500 pr-1" />
            {tab.label}
          </button>
        ))}
      </div>
      <SubmitButton/>
    </div>
  )
}

export default Tabbar