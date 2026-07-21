'use client'

import { useEffect, useState } from 'react'
import { MapContainer as LeafletMap, TileLayer, Marker, Popup, LayersControl, Polygon, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

// Fix standard marker icons in Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
})

const customIcons = {
  online: new L.Icon({ iconUrl: '/icons/sensor-online.svg', iconSize: [32, 32], iconAnchor: [16, 32] }),
  offline: new L.Icon({ iconUrl: '/icons/sensor-offline.svg', iconSize: [32, 32], iconAnchor: [16, 32] }),
  fire: new L.Icon({ iconUrl: '/icons/fire.svg', iconSize: [40, 40], iconAnchor: [20, 40] }),
  alert: new L.Icon({ iconUrl: '/icons/alert.svg', iconSize: [32, 32], iconAnchor: [16, 32] }),
}

interface MapComponentProps {
  sensors?: any[]
  incidents?: any[]
  alerts?: any[]
  riskZones?: any[]
  onSensorClick?: (sensor: any) => void
  selectedSensorId?: string
}

export default function MapComponent({ 
  sensors = [], 
  incidents = [], 
  alerts = [], 
  riskZones = [],
  onSensorClick,
  selectedSensorId
}: MapComponentProps) {
  // Default to Paris or some central location
  const defaultCenter: [number, number] = [36.7538, 3.0588]

  return (
    <LeafletMap center={defaultCenter} zoom={13} className="w-full h-full z-0" zoomControl={false}>
      <LayersControl position="topright">
        {/* Layer 1: Dark Map (Premium Vibe) */}
        <LayersControl.BaseLayer checked name="Dark Map">
          <TileLayer
            attribution='&copy; <a href="https://carto.com/">CartoDB</a>'
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          />
        </LayersControl.BaseLayer>
        
        {/* Layer 2: Satellite */}
        <LayersControl.BaseLayer name="Satellite">
          <TileLayer
            attribution='&copy; ESRI'
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          />
        </LayersControl.BaseLayer>

        {/* Layer 3: Topographic */}
        <LayersControl.BaseLayer name="Topographic">
          <TileLayer
            attribution='&copy; OpenStreetMap'
            url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
          />
        </LayersControl.BaseLayer>
      </LayersControl>

      {/* Render Markers for Sensors */}
      {sensors.map((sensor) => {
        // We assume PostGIS geom is converted to GeoJSON or standard coords
        const coords: [number, number] = sensor.geom?.coordinates ? [sensor.geom.coordinates[1], sensor.geom.coordinates[0]] : defaultCenter
        
        const isSelected = selectedSensorId === sensor.id
        // Create an active version of the icon if selected (for simplicity we just scale it or use a different class if we could, 
        // but Leaflet icons are static images here, we'll just use the standard for now or you can apply CSS classes)
        
        return (
          <Marker 
            key={sensor.id} 
            position={coords} 
            icon={sensor.status === 'online' ? customIcons.online : customIcons.offline}
            eventHandlers={{
              click: () => {
                if (onSensorClick) onSensorClick(sensor)
              }
            }}
          >
            {!onSensorClick && (
              <Popup className="glassmorphism-popup">
                <div className="p-2">
                  <h3 className="font-bold text-sm">{sensor.name}</h3>
                  <p className="text-xs text-gray-500">Type: {sensor.type}</p>
                  <p className="text-xs">Status: {sensor.status}</p>
                </div>
              </Popup>
            )}
          </Marker>
        )
      })}

      {/* Render Markers for Incidents */}
      {incidents.map((incident) => {
        const coords: [number, number] = incident.geom?.coordinates ? [incident.geom.coordinates[1], incident.geom.coordinates[0]] : [defaultCenter[0] + 0.01, defaultCenter[1] + 0.01]
        return (
          <Marker key={incident.id} position={coords} icon={customIcons.fire}>
            <Popup>
              <div className="p-2 bg-red-500/10 border-l-2 border-red-500">
                <h3 className="font-bold text-red-600">Fire Detected</h3>
                <p className="text-xs">Severity: {incident.severity}</p>
                <p className="text-xs">Status: {incident.status}</p>
              </div>
            </Popup>
          </Marker>
        )
      })}
    </LeafletMap>
  )
}
