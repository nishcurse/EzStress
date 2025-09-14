import React from 'react'
import {Editor} from "@monaco-editor/react";
import FileStore from "../store/FileStore";
import { FileCode2 } from "lucide-react";
import Curr from "../store/Curr";



const getEditorOptions = () => ({
  lineNumbersMinChars: 4,
  minimap: {
    enabled: false,
  },
});



const Texteditor = () => {
  const { currCont, setCurrCont } = FileStore((state) => state);
  const { ActiveTab } = Curr((state) => state);

  function handleEditorChange(newState) {
    setCurrCont({
      ...currCont,
      [ActiveTab]: {
        ...currCont[ActiveTab],
        value: newState,
      },
    });
  }

  return (
    <div className="border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden bg-white dark:bg-gray-950 shadow-sm col-span-2">
      <div className="flex items-center justify-between px-4 py-2 bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center gap-2">
          <FileCode2 className="w-4 h-4 text-blue-500" />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {currCont[ActiveTab].name}
          </span>
        </div>
      </div>
      <div className="relative">
        <Editor
          height="72vh"
          theme="vs-dark"
          path={currCont[ActiveTab].name}
          defaultLanguage="cpp"
          value={currCont[ActiveTab].value}
          onChange={handleEditorChange}
          options={getEditorOptions()}
        />
      </div>
    </div>
  );
}

export default Texteditor



