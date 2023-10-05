// import { useEffect } from 'react';
// import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';
import { Information } from '../../@types/information';

// function UpdateMapCenter({ center }: { center: [number, number] }) {
//   const map = useMap();
//   useEffect(() => {
//     map.setView(center);
//   }, [center, map]);
//   return null;
// }

export default function LeafletMap({ owner_name, address_number, address_street, code_zip, address_city, longitude, latitude }: Information) {

  // const adresse = `${address_number} ${address_street} ${code_zip} ${address_city}`;

  return (
    <p>
      test
    </p>
    // <MapContainer center={[latitude, longitude]} zoom={15} style={{ width: '100%', height: '400px' }}>
    //   <UpdateMapCenter center={[latitude, longitude]} />
    //   <TileLayer
    //     url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    //     attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    //   />
    //   <Marker position={[latitude, longitude]}>
    //     <Popup>
    //       {adresse} - {owner_name}
    //     </Popup>
    //   </Marker>
    // </MapContainer>
  );
}
