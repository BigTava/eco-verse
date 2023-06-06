// Core
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Components
import { Header } from "../components/Header";
import { Features } from "../components/Features";

// Others
import Providers from "./Providers";
import Router from "./Router";
import Divider from "components/Divider";

const App = () => {
  return (
    <BrowserRouter>
      <Providers>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
        <Header />
        <Router />
        <Divider />
        <Features />
        <Divider />
      </Providers>
    </BrowserRouter>
  );
};

export default App;
