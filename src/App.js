import logo from "./logo.svg";
import AuthProvider from "./contexts/AuthProvider";
import AppRoutes from "./AppRoutes";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./js/Header/Header";
import Footer from "./js/Footer/Footer";

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="container">
          <Header />
          <AppRoutes />
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
