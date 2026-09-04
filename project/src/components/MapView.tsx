// 地図本体。spotsの配列をピンとしてレンダリングする
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import MapFlyTo from "./MapFlyTo";

// Leafletのデフォルトピン画像は相対パス参照のため、Viteの本番ビルドでは404になる
// 画像を明示的にimportしてURLを解決させ、デフォルトアイコンの参照先を上書きする（react-leaflet利用時の定番の回避策）
import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete (L.Icon.Default.prototype as { _getIconUrl?: unknown })._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

import SpotPopup from "./SpotPopup";
// Spotはsrc/types.tsで定義したこのアプリ独自の型
import type {Spot} from '../types'

interface MapViewProps {
  spots: Spot []
  selectedSpotId: string | null
}

function MapView({ spots, selectedSpotId }: MapViewProps) {
  return (
    <div className="flex-1 h-full">
      <MapContainer
        center={[35.678, 139.68]}
        zoom={10}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        <MapFlyTo spots={spots} selectedSpotId={selectedSpotId} />

        {spots.map((spot) => (
          <Marker key={spot.id} position={[spot.lat, spot.lng]}>
            <Popup>
              <SpotPopup spot={spot} />
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default MapView;
