import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import MapPage from "./MapPage";
import ARPage from "./ARPage";

const App = () => {
  const [route, setRoute] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);

  const handleMapClick = (coords) => {
    if (!start) {
      setStart(coords);
      setMarkers([coords]);
    } else if (!end) {
      setEnd(coords);
      setMarkers([start, coords]);
    }
  };

  const clearMarkers = () => {
    setStart(null);
    setEnd(null);
    setMarkers([]);
    setRoute(null);
  };

  return (
    <Router>
      <div>
        <nav>
          <Link to="/">Map</Link>
          <Link to="/ar">AR</Link>
        </nav>
        <Routes>
          <Route
            path="/"
            element={
              <MapPage
                route={route}
                markers={markers}
                onMapClick={handleMapClick}
                clearMarkers={clearMarkers}
                setRoute={setRoute}
                start={start}
                end={end}
              />
            }
          />
          <Route path="/ar" element={<ARPage route={route} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
