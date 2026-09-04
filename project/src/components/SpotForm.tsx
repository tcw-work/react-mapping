// スポット新規登録フォーム。入力値をaddSpot経由でSupabaseに送信する
import { useState } from "react";
import type { SpotWithoutElm } from "../types";

interface SpotFormProps {
  addSpot: (spotDataFreeName: SpotWithoutElm) => void;
}

function SpotForm({ addSpot }: SpotFormProps) {
  const [spotSubmit, setSpotSubmit] = useState<SpotWithoutElm>({
    name: "",
    category: "",
    area: "",
    postalCode: "",
    address: "",
    lat: 0,
    lng: 0,
    description: "",
    tags: [],
    image: "",
  });

  const [isOpen, setIsOpen] = useState(false);

  return (
    <form
      className="w-full md:w-72 p-4 space-y-4 border-t border-gray-200 bg-white border-gray-200"
      onSubmit={(e) => {
        // ブラウザ標準の送信時リロードを止める
        e.preventDefault();
        // App経由でuseSpots.tsのaddSpotを呼び、DBへ送信
        addSpot(spotSubmit);
        // 登録後にセクションを閉じる
        setIsOpen(false)
      }}
    >
      <h2
        className="text-sm font-semibold text-gray-500 border-b border-gray-200 pb-3 flex items-center justify-between cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        スポット新規登録
        <svg
          // 文字列の中に変数を混ぜたいのでテンプレートリテラル(バッククォート`)と{}で囲む形に変更
          className={`w-4 h-4 ${!isOpen ? "rotate-0" : "rotate-180"}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </h2>
      {/* 左がturethyなら右を評価して返す  */}
      {/* 条件付きレンダリング */}
      {isOpen && (
        <>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              スポット名
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
              value={spotSubmit.name}
              onChange={(e) =>
                setSpotSubmit({ ...spotSubmit, name: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              カテゴリ
            </label>
            <select
              className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
              value={spotSubmit.category}
              onChange={(e) =>
                setSpotSubmit({ ...spotSubmit, category: e.target.value })
              }
            >
              <option value="">選択してください</option>
              <option value="自重">自重</option>
              <option value="持久力">持久力</option>
              <option value="フィジカル">フィジカル</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              エリア
            </label>
            <select
              className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
              value={spotSubmit.area}
              onChange={(e) =>
                setSpotSubmit({ ...spotSubmit, area: e.target.value })
              }
            >
              <option value="">選択してください</option>
              <option value="初台">初台</option>
              <option value="幡ヶ谷">幡ヶ谷</option>
              <option value="笹塚">笹塚</option>
              <option value="その他近隣">その他近隣</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              郵便番号
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
              value={spotSubmit.postalCode}
              onChange={(e) =>
                setSpotSubmit({ ...spotSubmit, postalCode: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              住所
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
              value={spotSubmit.address}
              onChange={(e) =>
                setSpotSubmit({ ...spotSubmit, address: e.target.value })
              }
            />
          </div>

          <div className="flex gap-2">
            <div className="flex-1">
              <label className="block text-xs font-medium text-gray-700 mb-1">
                緯度
              </label>
              <input
                type="number"
                className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                value={spotSubmit.lat}
                // e.target.valueはstring型なのでNumberに変換
                onChange={(e) =>
                  setSpotSubmit({ ...spotSubmit, lat: Number(e.target.value) })
                }
              />
            </div>
            <div className="flex-1">
              <label className="block text-xs font-medium text-gray-700 mb-1">
                経度
              </label>
              <input
                type="number"
                className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                value={spotSubmit.lng}
                onChange={(e) =>
                  setSpotSubmit({ ...spotSubmit, lng: Number(e.target.value) })
                }
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              説明
            </label>
            <textarea
              className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
              rows={3}
              value={spotSubmit.description}
              onChange={(e) =>
                setSpotSubmit({ ...spotSubmit, description: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              タグ（カンマ区切り）
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
              // tagsはstring[]だが、input value={配列}は自動でカンマ区切り文字列として表示される
              value={spotSubmit.tags}
              // 入力（カンマ区切りの1文字列）をtags: string[]に戻すため分割
              onChange={(e) =>
                setSpotSubmit({
                  ...spotSubmit,
                  tags: e.target.value.split(","),
                })
              }
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              画像URL
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
              value={spotSubmit.image}
              onChange={(e) =>
                setSpotSubmit({ ...spotSubmit, image: e.target.value })
              }
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white text-sm font-medium rounded py-2 hover:bg-blue-700"
          >
            登録する
          </button>
        </>
      )}
    </form>
  );
}
export default SpotForm;
