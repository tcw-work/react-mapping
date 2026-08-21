import MapView from './components/MapView.jsx'
import SpotList from './components/SpotList.jsx'
import spotData from './data/spots.json'
// usestate
import { useState } from 'react'

function App() {
  //現在の値,値を更新するための関数=初期値
  // useState()は必ず「[現在の値, 更新関数]という2つだけの配列」を、この順番で返す
  const[selectedSpotId,setSelectedId] = useState(null)
  const[categoryFilter, setCategoryFilter] =useState('all')

  // これだと初期値の「all」という文字列と一致した場合のみ表示される
  // const filteredSpots = spotData.filter((s) => s.category === categoryFilter);

  // categoryFilter（現在選ばれているカテゴリ）が "all" と一致するか、が条件
  // 一致する（true）→ 絞り込みなしで全件（spotData）
  // 一致しない（false）→ カテゴリで絞り込む（.filter()）
  const filteredSpots = categoryFilter === 'all' ? spotData : spotData.filter((s) => s.category === categoryFilter)
  return (
    // 返せる戻り値は一つだけなのでdivで囲む
    <div className="flex flex-col md:flex-row h-screen w-screen overflow-hidden">
      <SpotList spot={filteredSpots} categoryFilter={categoryFilter} setCategoryFilter={setCategoryFilter} selectedSpotId={selectedSpotId} onSelectSpot={setSelectedId}/>
      <MapView spot={filteredSpots} selectedSpotId={selectedSpotId} />
    </div>
  )
}
export default App