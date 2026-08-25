import MapView from './components/MapView'
import SpotList from './components/SpotList'
// import spotData from './data/spots.json'
import {supabase} from './lib/supabaseClient'
// usestate、useEffect
import { useState, useEffect } from 'react'

// 型リスト読み込み
import type { Spot } from './types'


function App() {
  //現在の値,値を更新するための関数=初期値
  // useState()は必ず「[現在の値, 更新関数]という2つだけの配列」を、この順番で返す
  // ここは「値そのものを新しく生み出す場所」なのでジェネリクス<>で「このstateはstringかnull（初期値null）のどちらかになる」と宣言
  const[selectedSpotId, setSelectedId] = useState<string | null>(null)
  const[categoryFilter, setCategoryFilter] = useState<string>('all')
  const[prefectureFilter, setPrefectureFilter] = useState<string>('all')

  // supabaseのデータを取得に切り替え
  // sb通信前はデータからのため、後から値が入るので、変更を検知して処理を行う土台を作る必要がある

  //useState<型>(初期値)の応用（Spot型を配列[]として初期値として返す）
  // Spotの中に各値の型はセットされていますが、それを配列でまとめているか否かは判定できないので、ここで[]で配列ですよという指定をしている
  const[spotData, setspotData] = useState<Spot[]>([])

  // useEffectで囲むことで最初の1回（App.tsが画面に現れた時）だけ実行する
  // useEffectは他のすべての処理が終了してから最後に発火する
  // これがないと別の箇所が再レンダリングのたびに毎回実行される
  useEffect(() => {
    //async = この関数の中ではawaitが使えるようになる、という宣言
    async function fetchSpots() {

      // SBからのセレクトデータ取得
      // await = この予約の中身（実際のデータ）が届くまで、この関数の中の処理だけを一時停止して待つ（これがないとdataとerrorにまだ届いていないデータが入る）
      // Supabaseがdata・errorという名前でプロパティを返す設計になっている
      const { data, error } = await supabase.from("spots").select("*")

      // 取得後の条件分岐
      if(error) {
        console.error(error)
        return
      }
      // 更新するためのデータ（data）を更新関数setspotDataに乗せてspotDataに入れる
      setspotData(data)
    }
    fetchSpots()  // 定義した関数をその場で呼び出す

    //「配列を第2引数として渡す」というReact側の決まった形（配列内のどれかの値が変わるたびに実行）※[]の場合は結果的に初回だけ実行
    // これは実行のタイミングを示す。これがないと毎回のレンダリングで実行される（[categoryFilter]ならカテゴリーフィルターが更新されるたび実行）
    // 依存配列なし → 毎回のレンダリングで実行
    // []（空）→ 最初の1回だけ実行
    // [a, b] → 最初の1回＋a・bが変わるたびに実行
  }, [])

  // categoryFilter（現在選ばれているカテゴリ）が "all" と一致するか、が条件
  // 一致する（true）→ 絞り込みなしで全件（spotData）
  // 一致しない（false）→ カテゴリで絞り込む（.filter()）
  // const filteredSpots = categoryFilter === 'all' ? spotData : spotData.filter((s) => s.category === categoryFilter) //カテゴリーのみの場合

  const filteredSpots = spotData.filter((s) => {
    const matchesCategory = categoryFilter === 'all' || s.category === categoryFilter
    const matchesPrefecture = prefectureFilter === 'all' || s.prefecture === prefectureFilter
    return matchesCategory && matchesPrefecture
  })

  // supabase処理



  return (
    // 返せる戻り値は一つだけなのでdivで囲む
    <div className="flex flex-col md:flex-row h-screen w-screen overflow-hidden">
      <SpotList spots={filteredSpots} categoryFilter={categoryFilter} setCategoryFilter={setCategoryFilter} prefectureFilter={prefectureFilter}  setPrefectureFilter={setPrefectureFilter} selectedSpotId={selectedSpotId} onSelectSpot={setSelectedId}/>
      <MapView spots={filteredSpots} selectedSpotId={selectedSpotId} />
    </div>
  )
}
export default App