import React from 'react'
import axios from "axios"
import ButtStore from '../store/Rename';
import FileStore from '../store/FileStore';
import Curr from '../store/Curr';
import Out from '../store/Output';


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
      const resp = await axios.post(url, data);
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
        relative px-4 py-2.5 rounded-lg font-medium text-sm transition-all duration-200 ease-out
        border backdrop-blur-sm
        flex items-center gap-2 min-w-fit whitespace-nowrap 'bg-neutral-800/40 text- border-black/30 hover:bg-neutral-700/60 hover:text-white hover:border-neutral-600/40 hover:shadow-lg hover:shadow-neutral-900/20 hover:scale-[1.02] bg-white/80 text-blue border-neutral-500/40 shadow-lg shadow-blue-900/30 scale-[1.02] before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-r before:from-neutral-600/90 before:to-white-700/90 before:-z-10
      `}
      onClick={StressItUP}
    >
      <span className="relative z-10 flex items-center gap-1.5">
        {current}
      </span>
    </button>
  )
}

export default SubmitButton 