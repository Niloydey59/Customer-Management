import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes";
import { AuthProvider } from "./context/authcontext";

function App() {
  return (
    console.log("App.js"),
    (
      <BrowserRouter>
        <AuthProvider>
          <main>
            <AppRoutes />
          </main>
        </AuthProvider>
      </BrowserRouter>
    )
  );
}

export default App;
