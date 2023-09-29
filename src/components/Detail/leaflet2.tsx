import { useEffect, useState } from 'react';
import { Information } from '../../@types/information';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

export default function LeafletMap({ owner_name, address_number, address_street, code_zip, address_city }: Information | undefined) {
  
  const [position, setPosition] = useState([48.8566, 2.3522]); // Coordonnées de Paris par défaut. À remplacer par le résultat du géocodage de l'adresse.
  
  const adresse = `${address_number} ${address_street} ${code_zip} ${address_city}`;
  console.log(adresse);

  useEffect(() => {
    const fetchCoordinates = async () => {
      try {
        const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${adresse}&format=json&limit=1`);
        
        if (!response.ok) {
          throw new Error('api nimitim');
        }
  
        const data = await response.json();
        if (data.length > 0) {
          setPosition([parseFloat(data[0].lat), parseFloat(data[0].lon)]);
        }
      } catch (error) {
        console.error("erreur recup data:", error.message);
      }
    };
  
    fetchCoordinates();
  }, [adresse]);

  return (
    <MapContainer center={position} zoom={13} style={{ width: '100%', height: '400px' }}>
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
