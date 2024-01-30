import { colorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import Topbar from "./pages/global/Topbar";
import Sidebar from "./pages/global/Sidebar";
import Dashboard from "./pages/dashboard/index";
import Manageorder from "./pages/manage-order/index";
import Customers from "./pages/customers/index";
import Createorder from "./pages/createOrder";
import OrderSchedule from "./pages/orderSchedule/index";
import Form2 from "./pages/createOrder/index2";

function App() {
  const [theme, colorMode] = useMode();

  return (
    <colorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar />
          <main className="content">
            <Topbar />
            <Routes>
              <Route
                path="/"
                element={<Dashboard />}
              />
              <Route
                path="/manage-order"
                element={<Manageorder />}
              />
              <Route
                path="/customers"
                element={<Customers />}
              />
              <Route
                path="/create-order"
                element={<Createorder />}
              />
              <Route
                path="/orderSchedule"
                element={<OrderSchedule />}
              />
              <Route
                path="/create-order/form2"
                element={<Form2/>}
              />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </colorModeContext.Provider>
  );
}

export default App;
