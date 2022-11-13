import MovieTable from "./DataTable/MovieTable";
import MovieListing from "./Listing/MovieListing";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { useState } from "react";
import { LocationContext } from "./Contexts/LocationContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style/main.scss";

function App() {
  const [location, setLocation] = useState("");

  return (
    <Router>
      <LocationContext.Provider value={{ location, setLocation }}>
        <Route path="/" exact>
          <MovieTable />
        </Route>
        <Route path="/movie" exact>
          <MovieListing />
        </Route>
      </LocationContext.Provider>
    </Router>
  );
}

export default App;
