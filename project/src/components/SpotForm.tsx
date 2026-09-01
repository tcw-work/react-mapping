import { useState } from 'react'
// 型リスト読み込み
import type { SpotWithoutElm } from '../types'

// Appから受け取とるprops（addSpot）の型付け（設計図）
interface SpotFormProps {
    addSpot: (spotDataFreeName:SpotWithoutElm) => void
}

// addSpotを分割代入して型付け（設計図通りか確認）
function SpotForm ({addSpot}:SpotFormProps) {
    
    // フォームの値State（初期値にはオブジェクトが入るので{}で定義）
    const[spotSubmit, setSpotSubmit] = useState<SpotWithoutElm>({
        // 下記がspotSubmitの初期値（現在の値）とした入る
        name: '',
        category: '',
        prefecture: '',
        postalCode: '',
        lat: 0,
        lng: 0,
        description: '',
        tags: [],
        image: '',
    })

    return (
        // フォーム作成（枠のみ。value・onChange・onSubmitはこれから自分で結びつける）
        <form
            className="p-4 space-y-4 border-t border-gray-200 bg-white"
                    onSubmit={(e) => {
                    //HTML由来の送信時のリロード禁止
                    e.preventDefault()
                    // valueにセットされた「spotSubmit」の値を引数としてセット
                    // App経由でuseSpots.tsのaddSpot (SpotWithoutEleFreeNam:SpotWithoutElm)でDBに送られる
                    addSpot(spotSubmit)
                }}
            >
            <h2 className="text-sm font-semibold text-gray-500">スポット新規登録</h2>

            <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">スポット名</label>
                <input
                    type="text"
                    className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                    value={spotSubmit.name}
                    // ...spotSubmit：全プロパティを展開
                    // email: e.target.value：その中のemailだけを新しい値に差し替える（ここまでで「新しいオブジェクト」が完成）
                    // setSpotSubmitt(...)：その新しいオブジェクトを、新しいstateとして設定する
                    // （結果として）spotSubmitの状態が書き換わり、再レンダリングされる
                    onChange={(e) => setSpotSubmit({ ...spotSubmit, name: e.target.value })}
                />
            </div>

            <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">カテゴリ</label>
                <select
                    className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                    value={spotSubmit.category}
                    onChange={(e) => setSpotSubmit({...spotSubmit, category: e.target.value})}
                >
                    <option value="">選択してください</option>
                    <option value="洞窟">洞窟</option>
                    <option value="遺跡">遺跡</option>
                </select>
            </div>

            <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">都道府県</label>
                <select
                    className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                    value={spotSubmit.prefecture}
                    onChange={(e) => setSpotSubmit({...spotSubmit, prefecture: e.target.value})}
                >
                    <option value="">選択してください</option>
                    <option value="島根">島根</option>
                    <option value="長野">長野</option>
                    <option value="滋賀">滋賀</option>
                </select>
            </div>

            <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">郵便番号</label>
                <input
                    type="text"
                    className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                    value={spotSubmit.postalCode}
                    onChange={(e) => setSpotSubmit({...spotSubmit, postalCode: e.target.value})}
                />
            </div>

            <div className="flex gap-2">
                <div className="flex-1">
                    <label className="block text-xs font-medium text-gray-700 mb-1">緯度</label>
                    <input
                        type="number"
                        className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                        value={spotSubmit.lat}
                        // stringが帰ってくるので、Numberで帰ってくる文字列を数字に変換
                        onChange={(e) => setSpotSubmit({...spotSubmit, lat: Number(e.target.value)})}
                    />
                </div>
                <div className="flex-1">
                    <label className="block text-xs font-medium text-gray-700 mb-1">経度</label>
                    <input
                        type="number"
                        className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                        value={spotSubmit.lng}
                        onChange={(e) => setSpotSubmit({...spotSubmit, lng: Number(e.target.value)})}
                    />
                </div>
            </div>

            <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">説明</label>
                <textarea
                    className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                    rows={3}
                    value={spotSubmit.description}
                    onChange={(e) => setSpotSubmit({...spotSubmit, description: e.target.value})}
                />
            </div>

            <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">タグ（カンマ区切り）</label>
                <input
                    type="text"
                    className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                    value={spotSubmit.tags}
                    // タグをカンマ区切りで1つの入力欄にまとめて打ってもらうために、カンマで文字列を分割
                    onChange={(e) => setSpotSubmit({...spotSubmit, tags: e.target.value.split(",")})}
                />
            </div>

            <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">画像URL</label>
                <input
                    type="text"
                    className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                    value={spotSubmit.image}
                    onChange={(e) => setSpotSubmit({...spotSubmit, image: e.target.value})}
                />
            </div>

            <button
                type="submit"
                className="w-full bg-blue-600 text-white text-sm font-medium rounded py-2 hover:bg-blue-700"
            >
                登録する
            </button>
        </form>
    );
}
export default SpotForm;

