// アプリ全体のstate（フィルタ・選択中スポット）を持ち、各コンポーネントに配る親コンポーネント
import MapView from './components/MapView'
import SpotList from './components/SpotList'
import SpotForm from './components/SpotForm'
import LoginForm from './components/LoginForm'
import AuthStatus from './components/AuthStatus'
import { useState } from 'react'
import useSpots from './hooks/useSpots'

function App() {
  const[selectedSpotId, setSelectedId] = useState<string | null>(null)
  const[categoryFilter, setCategoryFilter] = useState<string>('all')
  const[prefectureFilter, setPrefectureFilter] = useState<string>('all')

  const { spotData, loading, fetchError, addSpot } = useSpots()

  const filteredSpots = spotData.filter((s) => {
    const matchesCategory = categoryFilter === 'all' || s.category === categoryFilter
    const matchesPrefecture = prefectureFilter === 'all' || s.prefecture === prefectureFilter
    return matchesCategory && matchesPrefecture
  })

  if (loading) {
    return <div>読み込み中</div>
  }
  if (fetchError) {
    return <div>エラーが発生しました：{fetchError}</div>
  }

  return (
    <div className="flex flex-col md:flex-row h-screen w-screen overflow-hidden">
      <AuthStatus />
      <LoginForm />
      <SpotList spots={filteredSpots} categoryFilter={categoryFilter} setCategoryFilter={setCategoryFilter} prefectureFilter={prefectureFilter}  setPrefectureFilter={setPrefectureFilter} selectedSpotId={selectedSpotId} onSelectSpot={setSelectedId}/>
      <MapView spots={filteredSpots} selectedSpotId={selectedSpotId} />
      <SpotForm addSpot={addSpot}/>
    </div>
  )
}
export default App