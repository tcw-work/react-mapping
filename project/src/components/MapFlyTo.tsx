import { useEffect } from "react";
import { useMap } from "react-leaflet";

import type {Spot} from '../types' // src/types.tsにspotリストの型を定義

interface MapFlyToProps {
    spots: Spot[]        // Spotの配列
    selectedSpotId: string | null        //初期値nullなので、on～でクリックされたらstringになる
}

// バケツリレーにより App→MapViewからpropsを受け取る
function MapFlyTo({spots, selectedSpotId}: MapFlyToProps) {
    const map = useMap()
    // 「画面に表示する内容」ではなく「副作用（画面の外で起きる処理）」を実行するためのHook
    useEffect(() => {
        if (!selectedSpotId) return
        // .find()は「条件に合う最初の1件だけ」を返す
        // (s)は「配列の中身を1つずつ、仮にsという名前で受け取る」という、自由に決めた引数名
        const target = spots.find((s) => s.id ===selectedSpotId)
        if(target) {
            // map.flyTo(座標, ズーム)マップで操作（Leafletライブラリのメソッド）
            map.flyTo([target.lat, target.lng],18)
        }
        // 「配列を第2引数として渡す」というReact側の決まった形（配列内のどれかの値が変わるたびに実行→今回はmap）
    }, [selectedSpotId, spots, map])

    return null
}

export default MapFlyTo
