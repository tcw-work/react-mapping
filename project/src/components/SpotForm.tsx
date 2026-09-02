// スポット新規登録フォーム。入力値をaddSpot経由でSupabaseに送信する
import { useState } from 'react'
import type { SpotWithoutElm } from '../types'

interface SpotFormProps {
    addSpot: (spotDataFreeName:SpotWithoutElm) => void
}

function SpotForm ({addSpot}:SpotFormProps) {

    const[spotSubmit, setSpotSubmit] = useState<SpotWithoutElm>({
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
        <form
            className="p-4 space-y-4 border-t border-gray-200 bg-white"
                    onSubmit={(e) => {
                    // ブラウザ標準の送信時リロードを止める
                    e.preventDefault()
                    // App経由でuseSpots.tsのaddSpotを呼び、DBへ送信
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
                        // e.target.valueはstring型なのでNumberに変換
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
                    // tagsはstring[]だが、input value={配列}は自動でカンマ区切り文字列として表示される
                    value={spotSubmit.tags}
                    // 入力（カンマ区切りの1文字列）をtags: string[]に戻すため分割
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

