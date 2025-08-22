import { create } from "zustand";
const Curr = create((set) => ({
  ActiveTab: "generate.cpp", // Correctly set a string as the initial value
  setActiveTab: (NewTab) => set({ ActiveTab: NewTab }),
}));

export default Curr;
