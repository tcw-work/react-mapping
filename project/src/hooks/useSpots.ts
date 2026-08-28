// カスタムフック = useStateやuseEffectを使った処理のかたまりに、名前を付けて再利用できるようにしたもの
// Appが担っていたデータの組み立て、データの取得の後者を分ける
// 関数・メソッドの呼び出し定義に近い

import { useState, useEffect } from 'react'
import {supabase} from '../lib/supabaseClient'
// 型リスト読み込み
import type { Spot } from '../types'
import type { SpotWithoutElm } from '../types'

function useSpots() {

//useState<型>(初期値)の応用（Spot型を配列[]として初期値として返す）
  // Spotの中に各値の型はセットされていますが、それを配列でまとめているか否かは判定できないので、ここで[]で配列ですよという指定をしている
  const[spotData, setspotData] = useState<Spot[]>([])
  // エラー時のローディング状態
  const[loading, setLoading] = useState<boolean>(true)
  const[fetchError, setFetchError] =useState<string | null>(null)

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
        setFetchError(error.message)
        setLoading(false)
        return
      }
      // 更新するためのデータ（data）を更新関数setspotDataに乗せてspotDataに入れる
      setspotData(data)

      setLoading(false)
    }
    fetchSpots()  // 定義した関数をその場で呼び出す

    //「配列を第2引数として渡す」というReact側の決まった形（配列内のどれかの値が変わるたびに実行）※[]の場合は結果的に初回だけ実行
    // これは実行のタイミングを示す。これがないと毎回のレンダリングで実行される（[categoryFilter]ならカテゴリーフィルターが更新されるたび実行）
    // 依存配列なし → 毎回のレンダリングで実行
    // []（空）→ 最初の1回だけ実行
    // [a, b] → 最初の1回＋a・bが変わるたびに実行
  }, [])

//   フォームか送信からＤＢに更新されたtとき
  async function addSpot (SpotWithoutEleFreeNam:SpotWithoutElm) {
    // DBにインサート
    const { data, error } = await supabase.from("spots").insert(SpotWithoutEleFreeNam).select("*")
    if (error) {
        console.error(error)
        return
    }
    //insertした値（data）はsetspotDataに加える（// スプレッド構文 ... で今持ってる配列全部展開）
    setspotData([...spotData, ...data])
  }

  // 呼び出し先のApp.tsxに渡す
  return { spotData, loading, fetchError, addSpot }

}

export default useSpots