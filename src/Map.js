import React from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

const Map = ({ route, markers, onMapClick, clearMarkers }) => {
  const MapClickHandler = () => {
    useMapEvents({
      click: (e) => {
        onMapClick([e.latlng.lat, e.latlng.lng]);
      },
    });
    return null;
  };

  return (
    <MapContainer
      center={[53.1473, 8.18]}
      zoom={16}
      style={{ height: "100vh", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <MapClickHandler />
      {markers.map((marker, index) => (
        <Marker
          key={index}
          position={marker}
          eventHandlers={{ click: clearMarkers }}
        />
      ))}
      {route && <Polyline positions={route} color="blue" />}
    </MapContainer>
  );
};

export default Map;
