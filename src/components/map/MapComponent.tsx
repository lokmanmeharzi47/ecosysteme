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
  // Default to Algiers / Northern Algeria
  const defaultCenter: [number, number] = [36.7538, 3.0588]
  const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN

  return (
    <LeafletMap center={defaultCenter} zoom={13} className="w-full h-full z-0" zoomControl={false}>
      <LayersControl position="topright">
        {mapboxToken ? (
          <>
            {/* Mapbox Layer 1: Dark Mode */}
            <LayersControl.BaseLayer checked name="Mapbox Sombre">
              <TileLayer
                attribution='&copy; <a href="https://www.mapbox.com/about/maps/">Mapbox</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url={`https://api.mapbox.com/styles/v1/mapbox/dark-v11/tiles/512/{z}/{x}/{y}@2x?access_token=${mapboxToken}`}
                tileSize={512}
                zoomOffset={-1}
                maxZoom={19}
              />
            </LayersControl.BaseLayer>

            {/* Mapbox Layer 2: Satellite Rues */}
            <LayersControl.BaseLayer name="Mapbox Satellite">
              <TileLayer
                attribution='&copy; <a href="https://www.mapbox.com/about/maps/">Mapbox</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url={`https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v12/tiles/512/{z}/{x}/{y}@2x?access_token=${mapboxToken}`}
                tileSize={512}
                zoomOffset={-1}
                maxZoom={19}
              />
            </LayersControl.BaseLayer>

            {/* Mapbox Layer 3: Plein Air / Relief Topographique */}
            <LayersControl.BaseLayer name="Mapbox Relief (Outdoors)">
              <TileLayer
                attribution='&copy; <a href="https://www.mapbox.com/about/maps/">Mapbox</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url={`https://api.mapbox.com/styles/v1/mapbox/outdoors-v12/tiles/512/{z}/{x}/{y}@2x?access_token=${mapboxToken}`}
                tileSize={512}
                zoomOffset={-1}
                maxZoom={19}
              />
            </LayersControl.BaseLayer>

            {/* Mapbox Layer 4: Rues Standard */}
            <LayersControl.BaseLayer name="Mapbox Standard">
              <TileLayer
                attribution='&copy; <a href="https://www.mapbox.com/about/maps/">Mapbox</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url={`https://api.mapbox.com/styles/v1/mapbox/streets-v12/tiles/512/{z}/{x}/{y}@2x?access_token=${mapboxToken}`}
                tileSize={512}
                zoomOffset={-1}
                maxZoom={19}
              />
            </LayersControl.BaseLayer>
          </>
        ) : (
          <>
            {/* Fallback Layer 1: Dark Map (CartoDB) */}
            <LayersControl.BaseLayer checked name="Dark Map (CartoDB)">
              <TileLayer
                attribution='&copy; <a href="https://carto.com/">CartoDB</a>'
                url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
              />
            </LayersControl.BaseLayer>
            
            {/* Fallback Layer 2: Satellite (ESRI) */}
            <LayersControl.BaseLayer name="Satellite (ESRI)">
              <TileLayer
                attribution='&copy; ESRI'
                url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
              />
            </LayersControl.BaseLayer>

            {/* Fallback Layer 3: Topographic (OpenTopoMap) */}
            <LayersControl.BaseLayer name="Topographique (OpenTopoMap)">
              <TileLayer
                attribution='&copy; OpenStreetMap'
                url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
              />
            </LayersControl.BaseLayer>
          </>
        )}
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

      {/* Render Risk Zones */}
      {riskZones.map((zone) => {
        if (!zone.geom?.coordinates) return null
        const rawCoords = zone.geom.type === 'Polygon' ? zone.geom.coordinates[0] : zone.geom.coordinates
        if (!Array.isArray(rawCoords)) return null
        const positions: [number, number][] = rawCoords.map((c: any) => [c[1], c[0]])
        const color = zone.risk_level === 'critical' ? '#ef4444' : zone.risk_level === 'high' ? '#f97316' : '#eab308'

        return (
          <Polygon
            key={zone.id}
            positions={positions}
            pathOptions={{ color, fillColor: color, fillOpacity: 0.2, weight: 2 }}
          >
            <Popup>
              <div className="p-2">
                <h4 className="font-bold text-sm">{zone.name || 'Zone à risque'}</h4>
                <p className="text-xs">Niveau de risque: <span className="font-semibold">{zone.risk_level}</span></p>
              </div>
            </Popup>
          </Polygon>
        )
      })}
    </LeafletMap>
  )
}