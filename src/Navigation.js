import React from "react";
import axios from "axios";

const Navigation = ({ start, end, setRoute }) => {
  const handleRoute = async () => {
    if (!start || !end) {
      alert(
        "Please select both start and end coordinates by clicking on the map."
      );
      return;
    }

    const response = await axios.get(
      `https://routing.openstreetmap.de/routed-foot/route/v1/driving/${start[1]},${start[0]};${end[1]},${end[0]}?overview=full&geometries=geojson`
    );

    console.log(JSON.stringify(response));

    const coordinates = response.data.routes[0].geometry.coordinates.map(
      (coord) => [coord[1], coord[0]]
    );
    setRoute(coordinates);
  };

  return (
    <div>
      <button onClick={handleRoute}>Get Route</button>
    </div>
  );
};

export default Navigation;
