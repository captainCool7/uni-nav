import React, { useState } from "react";
import Map from "./Map";
import Navigation from "./Navigation";

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
    <div>
      <Navigation start={start} end={end} setRoute={setRoute} />
      <Map
        route={route}
        markers={markers}
        onMapClick={handleMapClick}
        clearMarkers={clearMarkers}
      />
    </div>
  );
};

export default App;
