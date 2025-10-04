import React from 'react'
import axios from "axios"
import ButtStore from '../store/Rename';
import FileStore from '../store/FileStore';
import Curr from '../store/Curr';
import Out from '../store/Output';
import { BugPlayIcon } from 'lucide-react';


const SubmitButton = () => {
    const { current, Updateme } = ButtStore((state) => state);
    const { currCont } = FileStore((state) => state);
    const { ActiveTab } = Curr((state) => state);
    const { Output ,setOutput } = Out((state) => state);


  async function StressItUP() {
    if (!currCont || !currCont[ActiveTab]) {
      setOutput("Error: Files not yet loaded from storage.");
      return;
    }
    
    const data = {
      brute: currCont[`brute.cpp`].value,
      optimal: currCont["optimal.cpp"].value,
      generative: currCont["generate.cpp"].value,
    };
    
    Updateme(`Loading...`);
    setOutput(`Running the stress tester kindly wait till we find your cases....(Made by nish)`);

    try {
      const url = import.meta.env.VITE_API_URL;
      const resp = await axios.post(`${url}run-code`, data);
      setOutput(resp.data.output);
      Updateme(`Stress-me`);
    } catch (error) {
      setOutput(`Error has occurred Please Raise a issue: ${error.message}`);
      Updateme(`Stress-me`);
    }
  }


  return (
    <button
      className={`
        px-2 py-1 my-1.5 rounded-lg font-medium text-sm transition-all duration-200 ease-out
        bg-white text-black border border-gray-200
        hover:bg-gray-400 hover:border-gray-950 hover:shadow-sm
        active:bg-gray-100 active:scale-[0.98]
        focus:outline-none focus:ring-2 focus:ring-gray-200 focus:ring-offset-2
        flex items-center gap-2 min-w-fit whitespace-nowrap
        shadow-sm
      `}
      onClick={StressItUP}
    >
      <BugPlayIcon className="w-4 h-5 text-blue-500 " />
      {current}
    </button>
  )
}

export default SubmitButton 