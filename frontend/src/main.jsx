import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
// import { ToastContainer, toast } from 'react-toastify';
//   import 'react-toastify/dist/ReactToastify.css';
// import App from './App';
// r
// import reportWebVitals from "./reportWebVitals";
import MyRoutes from "./MyRoutes";
import { Provider } from "react-redux";
import { store } from "./store/store";
import ShopContextProvider from "./component/Context/ShopContext";
import { ToastContainer } from "react-toastify";

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    {/* <App /> */}
    <Provider store={store}>
      <ToastContainer />

      <ShopContextProvider>
        <MyRoutes />

      </ShopContextProvider>
    </Provider>
  </React.StrictMode>
)

// reportWebVitals();
