import DetailsSection from "./components/layout/DetailsSection/DetailsSection";
import MainSection from "./components/layout/MainSection/MainSextion";
import Sidebar from "./components/layout/Sidebar/Sidebar";

function App() {
  return (
    <div className="grid grid-cols-[240px_1fr_420px] h-screen">
      <Sidebar />

      <MainSection tasks={[]} />

      <DetailsSection />
    </div>
  );
}

export default App;
