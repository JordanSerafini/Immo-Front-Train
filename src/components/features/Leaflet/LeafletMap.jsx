/* eslint-disable react/prop-types */
// === REACT === //
import { useEffect } from 'react';

// === LIBRARY === //
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';
import markerIcon from 'leaflet/dist/images/marker-icon.png';

// UpdateMapCenter can only be used in a descendant of <MapContainer>
// So we need to make a function component
function UpdateMapCenter({ center }) {
  const map = useMap();

  // === EFFECTS === //
  useEffect(() => {
    map.setView(center);
  }, [center, map]);

  return null;
}

// There's an issue with typescript when we want to add the Leaflet component.
// So this is a jsx file and we need to disalbe the eslint type rule
export default function LeafletMap({
  owner_name,
  address_number,
  address_street,
  code_zip,
  address_city,
  longitude,
  latitude,
}) {
  const adress = `${address_number} ${address_street} ${code_zip} ${address_city}`;
  return (
    <MapContainer
      center={[latitude, longitude]}
      zoom={15}
      className="w-full h-[250px] sm:h-[400px]"
    >
      <UpdateMapCenter center={[latitude, longitude]} />
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker
        position={[latitude, longitude]}
        icon={
          new Icon({
            iconUrl: markerIcon,
            iconSize: [25, 41],
            iconAnchor: [12, 41],
          })
        }
      >
        <Popup>
          {adress} - {owner_name}
        </Popup>
      </Marker>
    </MapContainer>
  );
}
