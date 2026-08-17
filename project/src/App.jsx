import MapView from './components/MapView.jsx'
import SpotList from './components/SpotList.jsx'
import spotData from './data/spots.json'
// usestate
import { useState } from 'react'

function App() {
  //現在の値,値を更新するための関数=初期値
  // useState()は必ず「[現在の値, 更新関数]という2つだけの配列」を、この順番で返す
  const[selectedSpotId,setSelectedId] = useState(null)

  return (
    // 返せる戻り値は一つだけなのでdivで囲む
    <div className="flex flex-col md:flex-row h-screen w-screen overflow-hidden">
      <SpotList spot={spotData} selectedSpotId={selectedSpotId} onSelectSpot={setSelectedId}/>
      <MapView spot={spotData} selectedSpotId={selectedSpotId} />
    </div>
  )
}
export default App