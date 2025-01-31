import { Outlet } from "react-router-dom";
import Header from "./components/ui/Header";
import { Toaster } from "@/components/ui/sonner";

function App() {
  return (
    <div className="bg-slate-900 w-full h-screen text-white container mx-auto">
      <Header />
      <div>
        <Outlet />
      </div>
      <div>
        <Toaster />
      </div>
    </div>
  );
}

export default App;
