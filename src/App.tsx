import DetailsSection from "./components/layout/DetailsSection";
import MainSection from "./components/layout/MainSextion";
import Sidebar from "./components/layout/Sidebar";
import { TaskProvider } from "./Tasks/TaskContext";

function App() {
  return (
    <div className="grid grid-cols-[240px_1fr_420px] h-screen">
      <TaskProvider>
        <Sidebar />
        <MainSection />
        <DetailsSection />
      </TaskProvider>
    </div>
  );
}

export default App;
