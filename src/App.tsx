import { Toaster } from "react-hot-toast";
import "./App.css";
import Navbar from "./components/Navbar";
import Landing from "./pages/Landing";
import { Route, Routes } from "react-router";
import PropertyPage from "./pages/Properties/PropertyPage";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Navbar />
      <main className="min-h-[80vh]">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/properties" element={<PropertyPage />} />
        </Routes>
      </main>
      <Footer />
      <Toaster
        position="bottom-right"
        containerStyle={{
          zIndex: 1000,
        }}
        toastOptions={{
          duration: 4000,
          style: {
            background: `#333`,
            color: `#fff`,
            borderRadius: "12px",
          },
        }}
      />
    </>
  );
}

export default App;
