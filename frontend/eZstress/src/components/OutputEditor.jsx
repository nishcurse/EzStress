import React from 'react';
import Out from "../store/Output";
import SubmitButton from './SubmitButton';
import { Editor } from '@monaco-editor/react';
import { Circle } from "lucide-react";
import axios from 'axios';


// Assuming ButtStore is for some other functionality, so we'll keep it.
import ButtStore from '../store/Rename';
import ServerStore from '../store/ServerStore';

const OutputEditor = () => {
  
  const {status, setStatus} = ServerStore(state => state);

  const { Output } = Out((state) => state);
  const getStatusColor = (status) => {
    switch (status) {
      case "online":
        return "text-green-500";
      case "offline":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };
  const getStatusText = (status) => {
    switch (status) {
      case "online":
        return "Server Online";
      case "offline":
        return "Server Offline";
      default:
        return "Click to Check Serve Status";
    }
  };
  async function ServerCheck(){
    const apiurl = import.meta.env.VITE_API_URL;
    try{
      const res = await axios.get(`${apiurl}server-check`); 
      console.log(res);
      if(res.status == 200){
          setStatus("online");
      }else{
          setStatus("offline");
      }
    }catch(err){
      setStatus("offline");
    }
}
   return (
    <>
    <div className="border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden bg-white dark:bg-gray-950 shadow-sm">
      <div className="flex items-center justify-between px-4 py-2 bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center gap-2">
          <Circle
            className={`w-3 h-3 fill-current ${getStatusColor(status)}`}
          />
          <button className="text-sm font-medium text-gray-700 dark:text-gray-300" onClick={ServerCheck}>
            {getStatusText(status)}
          </button>
        </div>
      </div>
      <div className="relative">
      <Editor
        height="72vh"
        theme="vs-dark" // This will be overridden by the theme set in onMount, but it's good practice to keep it.
        path="output.txt"
        defaultLanguage="text"
        value={Output}
        options={{
          readOnly: true,
          minimap: {
            enabled: false,
          },
          lineNumbersMinChars: 4,
        }} 
      />
      </div>
    </div>
      {/* <div className="flex justify-center mt-4">
        <SubmitButton />
      </div>  */}
      </>
  );
};

export default OutputEditor;



