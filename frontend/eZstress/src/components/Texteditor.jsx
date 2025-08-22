import React from 'react'
import Editor from "@monaco-editor/react";


const Texteditor = ({title , code}) => {
  return (
    <div className='flex flex-col text-neutral-300'>
    <h4 className='py-2 px-2'>{title} :</h4>
      <Editor
        height="600px"
        width="340px"
        defaultLanguage="cpp"
        defaultValue={code}
        theme="vs-dark"
      ></Editor>
    </div>
  );
}

export default Texteditor