// React
import { useEffect } from 'react';

// Leaflet
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

function UpdateMapCenter({ center }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center);
  }, [center, map]);
  return null;
}

// eslint-disable-next-line react/prop-types
export default function LeafletMap({ owner_name, address_number, address_street, code_zip, address_city, longitude, latitude }) {

  const adresse = `${address_number} ${address_street} ${code_zip} ${address_city}`;

  return (
    <MapContainer center={[latitude, longitude]} zoom={15} style={{ width: '100%', height: '400px' }}>
      <UpdateMapCenter center={[latitude, longitude]} />
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={[latitude, longitude]}>
        <Popup>
          {adresse} - {owner_name}
        </Popup>
      </Marker>
    </MapContainer>
  );
}
