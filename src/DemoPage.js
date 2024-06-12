import React, { useEffect, useState } from "react";

const DemoPage = ({ demoBoxes, loading }) => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!loading && demoBoxes.length > 0) {
      setIsReady(true);
      console.log("Demo boxes are ready to be displayed:", demoBoxes);
    }
  }, [loading, demoBoxes]);

  if (loading) {
    return <div>Loading AR content...</div>;
  }

  if (!isReady) {
    return <div>No AR content available.</div>;
  }

  return (
    <div>
      <a-scene
        vr-mode-ui="enabled: false"
        embedded
        arjs="sourceType: webcam; debugUIEnabled: false;"
      >
        <a-camera gps-camera rotation-reader></a-camera>

        {/* Demo AR boxes at user's current location */}
        {demoBoxes.map((coords, index) => (
          <a-entity
            key={`demo-${index}`}
            gps-entity-place={`latitude: ${coords[0]}; longitude: ${coords[1]};`}
          >
            <a-box position="0 1 0" scale="1 1 1" color="blue"></a-box>
          </a-entity>
        ))}
      </a-scene>
    </div>
  );
};

export default DemoPage;
