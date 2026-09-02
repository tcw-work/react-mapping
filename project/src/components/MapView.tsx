// react-leafletというライブラリが用意してくれている部品から使うものを入れ込む
// 最初にインストールしたサードパーティ製の部品集（streetmap付随のものではない）。その接続先としてstreetmapを選んでいる
// npm install react-leaflet leaflet
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import MapFlyTo from "./MapFlyTo"; //.tsxなどの拡張子は消す

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

// 子コンポーネント
import SpotPopup from "./SpotPopup";

import type {Spot} from '../types' // src/types.tsにspotリストの型を定義

interface MapViewProps {
  spots: Spot []
  selectedSpotId: string | null
}

// MapContainer	地図全体を囲む「枠」	窓枠
// TileLayer	実際に見える地図の絵（道路・地形など）	窓の外の景色
// Marker	特定の座標に立てる「ピン」	景色の中に貼る付箋
// Popup	ピンをクリックしたときに出る吹き出し	付箋をめくると出てくるメモの中身

function MapView({ spots, selectedSpotId }: MapViewProps) {
  return (
    <div className="flex-1 h-full">
      <MapContainer
        center={[36.2048, 138.2529]}
        zoom={5}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {/* この中でuseMapによるサイドバークリック時の動きを定義 */}
        <MapFlyTo spots={spots} selectedSpotId={selectedSpotId} />

        {/* mapメソッドで親コンポーネント経由で受け取ったspotデータ（json配列内）の各要素を「変換して、新しい配列を作る」*/}
        {/* (spots) => は仮の名前で配列内データを受け取るという意味 */}
        {spots.map((spot) => (
          // 各配列データを<Marker>要素として1個ずつ返す
          // keyはreactの仕様だが、position=はreact-leaflet（Leaflet）側の仕様
          <Marker key={spot.id} position={[spot.lat, spot.lng]}>
            <Popup>
              {/* Props（spot）としてオブジェクトごと子コンポーネントに渡す */}
              <SpotPopup spot={spot} />
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default MapView;
