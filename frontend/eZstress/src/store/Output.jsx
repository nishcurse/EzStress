import {create} from "zustand"; 

const Out = create((set)=>({
    Output : `Let's do More Stressing With less Stress` ,
    setOutput : (newValue) => set({Output : newValue})
}))

export default Out;