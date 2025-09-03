import React from "react";
import { Editor } from "@monaco-editor/react";
import Tabbar from "./components/Tabbar";
import Curr from "./store/Curr";
import axios from "axios";
import Out from "./store/Output";
import ButtStore from "./store/Rename";
import FileStore from "./store/FileStore";

function App() {
  const { ActiveTab } = Curr((state) => state);
  const { currCont, setCurrCont } = FileStore((state) => state);
  const { Output, setOutput } = Out((state) => state);
  const { current, Updateme } = ButtStore((state) => state);

  function handleEditorChange(newState) {
    setCurrCont({
      ...currCont,
      [ActiveTab]: {
        ...currCont[ActiveTab],
        value: newState,
      },
    });
  }

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

  if (!currCont || !currCont[ActiveTab]) {
    return (
      <div className="bg-neutral-900 h-screen flex items-center justify-center text-white text-2xl">
        Loading files...
      </div>
    );
  }

  return (
    <div className="bg-neutral-900 h-screen flex flex-col">
      <div className="h-full flex flex-col overflow-y-auto">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-white font-bold text-4xl mt-4 text-center">
            EzStress Tester
          </h1>
        </div>

        <div className="w-full self-start p-4">
          <Tabbar />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 p-4 md:p-8">
          <div className="col-span-1 md:col-span-2">
            <Editor
              height="80vh"
              theme="vs-dark"
              path={currCont[ActiveTab].name}
              defaultLanguage={currCont[ActiveTab].language}
              value={currCont[ActiveTab].value}
              onChange={handleEditorChange}
            />
          </div>
          
          <div className="col-span-1">
            <Editor
              height="60vh"
              theme="vs-dark"
              path="output.txt"
              defaultLanguage="text"
              value={Output}
              options={{ readOnly: true }}
            />
            <div className="flex justify-center mt-4">
              <button
                className="rounded-lg w-fit px-4 py-2 ring-1 ring-sky-50 text-white hover:bg-neutral-700 transition-colors duration-200"
                onClick={StressItUP}
              >
                {current}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;