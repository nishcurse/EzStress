import Tabbar from "./components/Tabbar";
import Curr from "./store/Curr";
import FileStore from "./store/FileStore";
import Header from "./components/Header";
import Texteditor from "./components/Texteditor";
import OutputEditor from "./components/OutputEditor";



function App() {
  const { ActiveTab } = Curr((state) => state);
  const { currCont } = FileStore((state) => state);


  if (!currCont || !currCont[ActiveTab]) {
    return (
      <div className="bg-neutral-900 h-screen flex items-center justify-center text-white text-2xl">
        Loading files...
      </div>
    );
  }

  return (
    <div className="bg-neutral-900 h-screen flex flex-col">
      <div className="h-full flex flex-col overflow-y-auto">
        
        <Header></Header>
        <div className="w-full self-start p-10 ">
          <Tabbar />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 px-4  md:p-8">
          <Texteditor/>
          <div className="col-span-1">
            <OutputEditor/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;