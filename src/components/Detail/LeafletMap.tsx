import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Information } from '../../@types/information';
import 'leaflet/dist/leaflet.css';



export default function LeafletMap({ owner_name, address_number, address_street, code_zip, address_city }: Information) {

  const [position, setPosition] = useState([45.899247, 6.129384]); 

  const adresse = `${address_number} ${address_street} ${code_zip} ${address_city}`;

  useEffect(() => {
    const fetchCoordinates = async () => {
      try {
        console.log("fetch leaflet")
        const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${adresse}&format=json&limit=1`);
        console.log(response)
        if (!response.ok) {
          throw new Error('Probleme API coordonnées');
        }
        const data = await response.json();
  
        if (data.length > 0) {
          setPosition([parseFloat(data[0].lat), parseFloat(data[0].lon)]);
        }
      } catch (error) {
        throw new Error("probleme recup data vide?:");
      }
    };
  
    fetchCoordinates();
  }, [adresse]);

  return (
    <MapContainer center={position} zoom={15} style={{ width: '100%', height: '400px' }}>
      <UpdateMapCenter center={position} />
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={position}>
        <Popup>
          {adresse} - {owner_name}
        </Popup>
      </Marker>
    </MapContainer>
  );
}
