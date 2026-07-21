import React from 'react';
import CartographieClient from './CartographieClient';
import { getMapData } from '@/lib/services/map';

export default async function CartographiePage() {
 const mapData = await getMapData();

 return (
  <CartographieClient 
   sensors={mapData.sensors}
   incidents={mapData.incidents}
   alerts={mapData.alerts}
   riskZones={mapData.riskZones}
  />
 );
}
