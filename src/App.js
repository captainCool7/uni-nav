import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import MapPage from "./MapPage";
import ARPage from "./ARPage";
import DemoPage from "./DemoPage";

const App = () => {
  const [route, setRoute] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);
  const [demoBoxes, setDemoBoxes] = useState([]);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    // Fetch user's current location
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLocation = [
          position.coords.latitude,
          position.coords.longitude,
        ];
        console.log("User location:", userLocation);
        const boxes = generateAdditionalBoxes(userLocation);
        setDemoBoxes(boxes);
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching geolocation:", error);
        setLoading(false);
      },
      { enableHighAccuracy: true }
    );
  }, []);

  // Function to generate additional boxes for demo
  const generateAdditionalBoxes = (baseCoords) => {
    const [lat, lon] = baseCoords;
    const boxes = [];
    for (let i = 0; i < 5; i++) {
      const newLon = lon + i * 0.00002; // Approx 2 meters difference in longitude
      boxes.push([lat, newLon]);
    }
    console.log("Generated demo boxes:", boxes);
    return boxes;
  };

  return (
    <Router>
      <div>
        <nav>
          <Link to="/">Map</Link>
          <Link to="/ar">AR</Link>
          <Link to="/demo">Demo</Link>
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
          <Route
            path="/demo"
            element={<DemoPage demoBoxes={demoBoxes} loading={loading} />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
