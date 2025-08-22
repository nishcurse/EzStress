import React from "react";
import { Editor } from "@monaco-editor/react";
import Tabbar from "./components/Tabbar";
import files from "./assets/files";
import Curr from "./store/Curr";
import axios from "axios"
import Out from "./store/Output";
import ButtStore from "./store/Rename";

function App() {
  const { ActiveTab} = Curr(state => state);
  function handleEditorChange(newState){
    files[ActiveTab].value = newState;
  }
  const {Output, setOutput} = Out(state => state);
  const {current, Updateme} = ButtStore(state => state);
  console.log(Output);
  async function StressItUP(){
    const data = {
      brute : files[`brute.cpp`].value,
      optimal : files['optimal.cpp'].value, 
      generative : files['generate.cpp'].value
    }
    Updateme(`Loading...`)
    setOutput(`Running the stress tester kindly wait till we find your cases....(Made by nish)`);
    console.log(data);
    try{
      const resp = await axios.post(`http://localhost:9696/run-code`, data);
      setOutput(resp.data.output)
      Updateme(`Stress-me`)
    }catch(error){
      setOutput(`Error has occured Please Raise a issue: ${error}`); 
      Updateme(`Stress-me`);
    }
  }

  return (
    <div className="bg-neutral-900 h-screen">
      <div className="h-full flex flex-col overflow-y-auto">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-white font-bold text-4xl mt-4">
            EzStress Tester
          </h1>
        </div>

        <div className="w-auto self-start p-4">
          <Tabbar />
        </div>
        <div className="grid grid-cols-3 gap-5">
          <div className="grid col-span-2">
            <Editor
              height="80vh"
              theme="vs-dark"
              path={files[ActiveTab].name}
              defaultLanguage={files[ActiveTab].language}
              value={files[ActiveTab].value}
              onChange={handleEditorChange}
            />
          </div>
          <div>
            <Editor
              height="60vh"
              theme="vs-dark"
              path="output.txt"
              defaultLanguage="text"
              value = {Output}
              options={{ readOnly: true }}
            />
            <button className="ml-2 self-center rounded-lg w-fit my-10 px-3 py-2 ring-1 ring-sky-50 text-white hover:bg-neutral-700" onClick={StressItUP}>{current}</button>
          </div>
        </div>
        <div className="flex flex-row items-center justify-between gap-4"></div>
      </div>
    </div>
  );
}

export default App;
