import { create } from "zustand";

const ButtStore = create((set)=>({
    current : `Stress Me`, 
    Updateme : (nv) => set({current : nv})
}))

export default ButtStore;