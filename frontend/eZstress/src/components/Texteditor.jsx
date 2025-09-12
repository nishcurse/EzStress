import React from 'react'
import {Editor} from "@monaco-editor/react";
import FileStore from "../store/FileStore";
import Curr from "../store/Curr";




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
    <div className="col-span-1 md:col-span-2">
            <Editor
              height="80vh"
              theme="vs-dark"
              path={currCont[ActiveTab].name}
              defaultLanguage= "cpp"
              value={currCont[ActiveTab].value}
              onChange={handleEditorChange}
              options={{
                lineNumbersMinChars: 4,
                minimap: {
                  enabled: false,
                },
              }}
            />
    </div>
  );
}

export default Texteditor