import MapView from './components/MapView'
import SpotList from './components/SpotList'
import SpotForm from './components/SpotForm'

// import spotData from './data/spots.json'
// usestate、useEffect
import { useState } from 'react'

import useSpots from './hooks/useSpots'

import { createContext } from 'react'



function App() {
  //現在の値,値を更新するための関数=初期値
  // useState()は必ず「[現在の値, 更新関数]という2つだけの配列」を、この順番で返す
  // ここは「値そのものを新しく生み出す場所」なのでジェネリクス<>で「このstateはstringかnull（初期値null）のどちらかになる」と宣言
  const[selectedSpotId, setSelectedId] = useState<string | null>(null)
  const[categoryFilter, setCategoryFilter] = useState<string>('all')
  const[prefectureFilter, setPrefectureFilter] = useState<string>('all')

  // supabaseのデータを取得に切り替え
  // sb通信前はデータからのため、後から値が入るので、変更を検知して処理を行う土台を作る必要がある

  // useSpots関数実行
  // returnで帰ってきたオブジェクトを明示的に受け取る
  // addSpotはinsert処理で定義したものを後付けで加える
  const { spotData, loading, fetchError, addSpot } = useSpots()

  // categoryFilter（現在選ばれているカテゴリ）が "all" と一致するか、が条件
  // 一致する（true）→ 絞り込みなしで全件（spotData）
  // 一致しない（false）→ カテゴリで絞り込む（.filter()）
  // const filteredSpots = categoryFilter === 'all' ? spotData : spotData.filter((s) => s.category === categoryFilter) //カテゴリーのみの場合

  const filteredSpots = spotData.filter((s) => {
    const matchesCategory = categoryFilter === 'all' || s.category === categoryFilter
    const matchesPrefecture = prefectureFilter === 'all' || s.prefecture === prefectureFilter
    return matchesCategory && matchesPrefecture
  })
  



  // ローディング関連の分岐をフロント表示
  // useEffectの処理が終わればfalseになる
  if (loading) {
    return <div>読み込み中</div>
  }
  if (fetchError) {
    return <div>エラーが発生しました：{fetchError}</div>
  }

  return (
    // 返せる戻り値は一つだけなのでdivで囲む
    <div className="flex flex-col md:flex-row h-screen w-screen overflow-hidden">
      <SpotList spots={filteredSpots} categoryFilter={categoryFilter} setCategoryFilter={setCategoryFilter} prefectureFilter={prefectureFilter}  setPrefectureFilter={setPrefectureFilter} selectedSpotId={selectedSpotId} onSelectSpot={setSelectedId}/>
      <MapView spots={filteredSpots} selectedSpotId={selectedSpotId} />
      <SpotForm addSpot={addSpot}/>
    </div>
  )
}
export default App