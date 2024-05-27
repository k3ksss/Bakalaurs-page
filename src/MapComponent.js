import React from 'react';
import { MapContainer, TileLayer, WMSTileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

function MapComponent() {
  const position = [56.946285, 24.105078];  // Coordinates for Riga, Latvia

  return (
    <MapContainer 
      center={position} 
      zoom={12} 
      style={{ 
        height: '400px',  // Smaller fixed height
        width: '600px',   // Smaller fixed width
        margin: '50px auto'  // Center the map on the page
      }}
    >
      <WMSTileLayer
        url="https://gis.ic.iem.gov.lv/giswebcais/"
        layers="your_layer_name"
        format="image/png"
        transparent={true}
        version="1.3.0"
        attribution="Map data &copy; GIS IC IEM Gov LV"
      />
      <Marker position={position}>
        <Popup>
          Welcome to Riga! <br /> This is a Leaflet map using WMS.
        </Popup>
      </Marker>
    </MapContainer>
  );
}

export default MapComponent;
