import React from "react";

const ARPage = ({ route }) => {
  if (!route) {
    return <div>Please generate a route first.</div>;
  }

  // Get every 5th coordinate from the route
  const arCoordinates = route.filter((_, index) => index % 5 === 0);

  return (
    <div>
      <a-scene
        vr-mode-ui="enabled: false"
        embedded
        arjs="sourceType: webcam; debugUIEnabled: false;"
      >
        <a-camera gps-camera rotation-reader></a-camera>
        {arCoordinates.map((coords, index) => (
          <a-entity
            key={index}
            gps-entity-place={`latitude: ${coords[0]}; longitude: ${coords[1]};`}
            gltf-model="#animated-asset"
            scale="5 5 5"
          >
            <a-animation
              attribute="rotation"
              to="0 360 0"
              dur="10000"
              easing="linear"
              repeat="indefinite"
            ></a-animation>
          </a-entity>
        ))}
        <a-assets>
          <a-asset-item
            id="animated-asset"
            src="../modern_arrow.obj"
          ></a-asset-item>
        </a-assets>
      </a-scene>
    </div>
  );
};

export default ARPage;
