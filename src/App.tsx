import { Toaster } from "react-hot-toast";
import "./App.css";
import Navbar from "./components/Navbar";
import Landing from "./pages/Landing";
import { Route, Routes } from "react-router";
import PropertyPage from "./pages/Properties/PropertyPage";
import Footer from "./components/Footer";
import UserProperty from "./pages/Properties/UserProperty";
import SingleProperty from "./pages/Properties/SingleProperty";
import RoommatePage from "./pages/Roommates/RoommatePage";
import SingleRoommateOpening from "./pages/Roommates/SingleRoommateOpening";
import AboutUs from "./pages/AboutUs";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import { useSelector } from "react-redux";
import type { RootState } from "./store/store";
import ProtectedRoute from "./pages/Admin/ProtectedRoute";

function App() {
  const { user, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );

  console.log("Auth State:", { user, isAuthenticated });
  return (
    <>
      <Navbar />
      <main className="min-h-[80vh]">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/properties" element={<PropertyPage />} />
          <Route path="/my-properties" element={<UserProperty />} />
          <Route path="/property/:id" element={<SingleProperty />} />
          <Route path="/roommates" element={<RoommatePage />} />
          <Route
            path="/roommate-vacancy/:id"
            element={<SingleRoommateOpening />}
          />
          <Route path="/about" element={<AboutUs />} />
          <Route element={<ProtectedRoute allowedRole="admin" />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
          </Route>
        </Routes>
      </main>
      <Footer />
      <Toaster
        position="bottom-right"
        containerStyle={{
          zIndex: 10000,
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
