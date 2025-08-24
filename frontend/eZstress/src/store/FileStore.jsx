import { create } from "zustand";
import files from "../assets/files";
import { devtools, persist } from "zustand/middleware";

const FileStore = create(
  devtools(
    persist(
      (set) => ({
        currCont: files,
        setCurrCont: (newCont) => set({ currCont: newCont }),
      }),
      {
        name: "code-files", 
      }
    )
  )
);

export default FileStore;
