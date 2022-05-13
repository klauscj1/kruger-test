import { Routes, Route, Navigate } from "react-router-dom";
import { ListEmployeesPage } from "./pages/ListEmployeesPage";
import { EmployeePage } from "./pages/EmployeePage";
import { LoginPage } from "./pages/LoginPage";
import { GlobalContext, GlobalProvider } from "./context/GlobalContext";
import { useContext } from "react";
function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/employees" element={<ListEmployeesPage />} />
      <Route path="/employee" element={<EmployeePage />} />
    </Routes>
  );
}

export default App;
