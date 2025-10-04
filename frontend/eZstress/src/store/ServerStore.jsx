import { create } from "zustand";

const ServerStore = create((set) => (
    {
        status : "LOLO", 
        setStatus : (nv) => set({status : nv})
    }
))

export default ServerStore;