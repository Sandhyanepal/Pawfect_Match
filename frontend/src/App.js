// import './App.css';

// import Register from "./pages/Register";

// import Login from "./pages/Login";

// import Adopt from "./pages/Adopt";

import PetDesc from "./pages/PetDesc";
// import Home from "./pages/Home";
// import MyRoutes from "./MyRoutes";
// import Header from "./component/Header";

function App() {
  return (
    <div className="App">
      {/* <Home/> */}
      {/* <Adopt/> */}
      <PetDesc />
      {/* <Login/> */}
      {/* <Register/> */}
      {/* <MyRoutes/> */}
      {isLoggedIn ? (
        <PetRecommendations />
      ) : (
        <ClickBasedRecommendations />
      )}
    </div>
  );
}

export default App;
