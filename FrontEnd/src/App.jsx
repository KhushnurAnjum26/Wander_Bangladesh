import { useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Divisions from "./pages/Divisions";
import DivisionDetail from "./pages/DivisionDEtails";
import Dashboard from "./pages/Dashboards/Traveller";
function App() {
  const [page, setPage] = useState("home");
  const [selectedDivision, setSelectedDivision] = useState("dhaka");
  const navigate = (target, divisionId) => {
    if (divisionId) setSelectedDivision(divisionId);
    setPage(target);
  };
  if (page === "dashboard") {
    return <Dashboard onExit={() => navigate("home")} />;
  }
  return <div className="min-h-screen bg-[#f5ede0]">
      <Navbar currentPage={page} onNavigate={navigate} />
      {page === "home" && <Home onNavigate={navigate} />}
      {page === "divisions" && <Divisions onNavigate={navigate} />}
      {page === "detail" && <DivisionDetail divisionId={selectedDivision} onNavigate={navigate} />}
    </div>;
}

export default App;