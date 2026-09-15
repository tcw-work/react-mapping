// spotsデータのfetch・insertをまとめたカスタムフック

import { useState, useEffect } from 'react'
import {supabase} from '../lib/supabaseClient'
// Spot・SpotWithoutElmはsrc/types.tsで定義したこのアプリ独自の型
import type { Spot } from '../types'
import type { SpotWithoutElm } from '../types'
import { useAuth } from '../context/AuthContext'

function useSpots() {
  const[spotData, setspotData] = useState<Spot[]>([])
  const[loading, setLoading] = useState<boolean>(true)
  const[fetchError, setFetchError] =useState<string | null>(null)

  useEffect(() => {
    // DBから全spotsを取得
    async function fetchSpots() {
      const { data, error } = await supabase.from("spots").select("*")

      if(error) {
        console.error(error)
        setFetchError(error.message)
        setLoading(false)
        return
      }
      setspotData(data)
      setLoading(false)
    }
    fetchSpots()
  }, []) // 依存配列が空 → マウント時に1回だけ実行

  // edit用ユーザー識別
  const {user} = useAuth()

  // DBインサート用関数
  async function addSpot (SpotWithoutEleFreeNam:SpotWithoutElm) {

    // insert時のスコープ対策（letで再代入可能にし、created_byも持てるように）
    let spotDataEx: SpotWithoutElm & { created_by?: string | null } = SpotWithoutEleFreeNam


    // 新規登録（Create）時に「誰が投稿したか」を記録（Exにマージ）
    if (user) {
      // オプショナルチェイニング
      spotDataEx = {...spotDataEx, created_by: user?.id ?? null}
    }

    // 画像選択されていない場合はスポレッド構文でno-imageに置換
    if(SpotWithoutEleFreeNam.image === '') {

      // const spotDataEx = ～～にするとifスコープの外で使えなくなる（既存変数の再代入で済ます）
      spotDataEx = {...spotDataEx, image: 'images/no-image.jpg'}
    }

    const { data, error } = await supabase.from("spots").insert(spotDataEx).select("*")
    if (error) {
        console.error(error)
        return
    }
    setspotData([...spotData, ...data])
  }

  // DBアップデート用関数（IDで何のレコード化を識別）
  async function updateSpot (id:string, SpotWithoutEleFreeNam:SpotWithoutElm) {
    
    // 再代入されることがないのでconst指定
    const spotDataEx = SpotWithoutEleFreeNam

    // .eq("id",id) 左："id"という指定列、左：その列と比較する値（引数として受け取った変数）= 必ず一つの結果として帰ってくる
    // select("*")は更新対象の行（idが一致した行）の「全カラム」という意味
    const { data, error } = await supabase.from("spots").update(spotDataEx).select("*").eq("id",id)

    if (error) {
      console.error (error)
      return
    }


    // setSpotData()で関数実行してその中でdataを取得したdata[0]に指定
    setspotData(
      // mapで、新しい配列を組み立ててreturnで返す
      spotData.map((s) => {
      // 投稿ID
      const originalId = s.id
      // supabaseは必ず結果を配列で返してくるのでヒット（このケースだと必ず一つ）なので[0]のid
      const updateId = data[0].id
      // 投稿IDと更新したIDが一致するか処理（一致していればdata[0]を返す）
      // return data[0] として1件のSpotデータ（オブジェクト）がそのまま返却される
      return originalId === updateId ? data[0] : s
      })
    )

  }

  // 投稿削除
  async function deleteSpot (id:string) {
    // 削除対象を特定するのに必要なidを引数で持っているので、dataやselectによるカラム取得は不要
    const { error } = await supabase.from("spots").delete().eq("id",id)

    if (error) {
        console.error(error)
        return
    }

    setspotData(
      // 削除対象のidと一致しない要素だけを残す
      // filterがreturnするのはtrue/falseだけ。「この要素を新しい配列に残すかどうか」というYes/Noの判定に使う
      // {}を使わずに単一処理で終わる場合は、returnは不要（自動的に結果が戻り値になる省略記法）
      spotData.filter((s) => s.id !== id)
    )

  }

  return { spotData, loading, fetchError, addSpot, updateSpot, deleteSpot }

}

export default useSpots