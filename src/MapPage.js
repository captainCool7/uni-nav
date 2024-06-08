import React from "react";
import Map from "./Map";
import Navigation from "./Navigation";

const MapPage = ({
  route,
  markers,
  onMapClick,
  clearMarkers,
  setRoute,
  start,
  end,
}) => {
  return (
    <div>
      <Navigation start={start} end={end} setRoute={setRoute} />
      <Map
        route={route}
        markers={markers}
        onMapClick={onMapClick}
        clearMarkers={clearMarkers}
      />
    </div>
  );
};

export default MapPage;
