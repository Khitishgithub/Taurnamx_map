'use client'

import L from 'leaflet'
import MarkerIcon from '../node_modules/leaflet/dist/images/marker-icon.png'
import MarkerShadow from '../node_modules/leaflet/dist/images/marker-shadow.png'
import 'leaflet/dist/leaflet.css'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import { useState } from 'react'


const markers = [
    { position: [28.6139, 77.209], label: "New Delhi" },
    { position: [19.076, 72.8777], label: "Mumbai" },
    { position: [13.0827, 80.2707], label: "Chennai" },
    { position: [22.5726, 88.3639], label: "Kolkata" },
    { position: [12.9716, 77.5946], label: "Bangalore" },
]

const Map = () => {
    const [selectedPosition, setSelectedPosition] = useState(markers[0].position)

  
    const CenterMap = ({ position }) => {
        const map = useMap()
        map.setView(position, map.getZoom())
        return null
    }

    const centerMapOnMarker = (position) => {
        setSelectedPosition(position)
    }

    const GetMyLocation = () => {
        const getMyLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((position) => {
                    centerMapOnMarker([position.coords.latitude, position.coords.longitude])
                })
            } else {
                console.log("Geolocation is not supported by this browser.")
            }
        }

        return (
            <div className="get-my-location">
                <button onClick={getMyLocation}>Get My Location</button>
            </div>
        )
    }

    return (
        <div>
            <GetMyLocation />
            <MapContainer style={{
                height: '100vh',
                width: '100vw'
            }} center={selectedPosition} zoom={5} scrollWheelZoom={false}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {markers.map(({ position, label }) => (
                    <Marker
                        key={label}
                        icon={
                            new L.Icon({
                                iconUrl: MarkerIcon,
                                iconRetinaUrl: MarkerIcon,
                                iconSize: [25, 41],
                                iconAnchor: [12.5, 41],
                                popupAnchor: [0, -41],
                                shadowUrl: MarkerShadow,
                                shadowSize: [41, 41],
                            })
                        }
                        position={position}
                        eventHandlers={{
                            click: () => centerMapOnMarker(position),
                        }}
                    >
                        <Popup>{label}</Popup>
                    </Marker>
                ))}
                <CenterMap position={selectedPosition} />
            </MapContainer>
        </div>
    )
}

export default Map
