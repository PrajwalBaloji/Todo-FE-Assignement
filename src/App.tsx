import Sidebar from "./components/layout/Sidebar/Sidebar";

function App() {
  return (
    <div className="grid grid-cols-[240px_1fr_320px] h-screen">
      <Sidebar />

      <main className="flex justify-center p-4 overflow-y-auto">
        <div className="w-full max-w-xl">Task List</div>
      </main>

      <section className="details">Details Panel</section>
    </div>
  );
}

export default App;
