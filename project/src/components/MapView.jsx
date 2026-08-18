// react-leafletというライブラリが用意してくれている部品から使うものを入れ込む
// 最初にインストールしたサードパーティ製の部品集（streetmap付随のものではない）。その接続先としてstreetmapを選んでいる
// npm install react-leaflet leaflet
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import MapFlyTo from './MapFlyTo.jsx'


// 子コンポーネント
import SpotPopup from '../components/SpotPopup'
// import SpotList from '../components/SpotList'


// MapContainer	地図全体を囲む「枠」	窓枠
// TileLayer	実際に見える地図の絵（道路・地形など）	窓の外の景色
// Marker	特定の座標に立てる「ピン」	景色の中に貼る付箋
// Popup	ピンをクリックしたときに出る吹き出し	付箋をめくると出てくるメモの中身

function MapView({spot, selectedSpotId}) {
  return (
    <div className="flex-1 h-full">
      <MapContainer center={[36.2048, 138.2529]} zoom={5} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {/* この中でuseMapによるサイドバークリック時の動きを定義 */}
        <MapFlyTo spot={spot} selectedSpotId={selectedSpotId} />

        {/* mapメソッドで親コンポーネント経由で受け取ったspotデータ（json配列内）の各要素を「変換して、新しい配列を作る」*/}
        {/* (tomiSpot) => は仮の名前で配列内データを受け取るという意味 */}
        {spot.map((tomiSpot) => (
          // 各配列データを<Marker>要素として1個ずつ返す
          // keyはreactの仕様だが、position=はreact-leaflet（Leaflet）側の仕様
          <Marker key={tomiSpot.id} position={[tomiSpot.lat, tomiSpot.lng]}>
            <Popup>
              {/* Props（zawaSpot）としてオブジェクトごと子コンポーネントに渡す */}
              <SpotPopup zawaSpot={tomiSpot} />
             </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}

export default MapView
