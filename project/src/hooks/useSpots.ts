// spotsデータのfetch・insertをまとめたカスタムフック

import { useState, useEffect } from 'react'
import {supabase} from '../lib/supabaseClient'
// Spot・SpotWithoutElmはsrc/types.tsで定義したこのアプリ独自の型
import type { Spot } from '../types'
import type { SpotWithoutElm } from '../types'

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

  // DBへインサート
  async function addSpot (SpotWithoutEleFreeNam:SpotWithoutElm) {
    const { data, error } = await supabase.from("spots").insert(SpotWithoutEleFreeNam).select("*")
    if (error) {
        console.error(error)
        return
    }
    setspotData([...spotData, ...data])
  }

  return { spotData, loading, fetchError, addSpot }
}

export default useSpots