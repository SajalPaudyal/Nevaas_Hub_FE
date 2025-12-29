import { Toaster } from "react-hot-toast";
import "./App.css";
import Navbar from "./components/Navbar";
import Landing from "./pages/Landing";
import { Provider } from "react-redux";
import { store } from "./store/store";
function App() {
  return (
    <>
      <Provider store={store}>
        <Navbar />
        <Landing />
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
      </Provider>
    </>
  );
}

export default App;
