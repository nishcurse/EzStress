import React from 'react'
import Out from "../store/Output";
import SubmitButton from './SubmitButton';
import { Editor } from '@monaco-editor/react';

import ButtStore from '../store/Rename';

const OutputEditor = () => {
    const { Output } = Out((state) => state);


  return (
    <div className="col-span-1">
        <Editor
            height="60vh"
            theme="vs-dark"
            path="output.txt"
            defaultLanguage="text"
            value={Output}
            options={{ 
                readOnly: true,
                minimap : {
                    enabled :false,
                },
                lineNumbersMinChars: 4,
             }}
        />
        <div className="flex justify-center mt-4">
            <SubmitButton> </SubmitButton>
        </div>
    </div>
  )
}

export default OutputEditor 