// スポット新規登録フォーム。入力値をaddSpot経由でSupabaseに送信する
import { useState } from "react";
import type { Spot, SpotWithoutElm } from "../types";


// 受け取ったpropsの型付け
interface SpotFormProps {

  addSpot: (spotDataFreeName: SpotWithoutElm) => void;

  // interfaceの中ではstateに初期値セットできない
  isOpen: boolean

  // 関数としてセットする場合
  setIsOpen: (value: boolean) => void;

  // useSpot.tsで定義
  updateSpot: (id: string, spotDataFreeName: SpotWithoutElm) => void;

  // 今、どのスポットを編集中かという情報（Spotオブジェクトの時＝編集モード、null = 新規登録）
  editingSpot: Spot | null;

}

function SpotForm({ addSpot, isOpen, setIsOpen, updateSpot, editingSpot }: SpotFormProps) {

  // フォームを初期値
  const initialSpotSubmit = {
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
  };

  // 編集対象があればその内容、なければ空の初期値をそのまま最初の値にする
  // （App.tsx側でkey={editingSpot?.id ?? "new"}を付けているため、
  //   編集対象が切り替わるたびにSpotForm自体が作り直され、ここが再評価される）
  const [spotSubmit, setSpotSubmit] = useState<SpotWithoutElm>(editingSpot ?? initialSpotSubmit);

  // リセット：stateを初期値オブジェクトに差し替え
  function resetForm() {
    setSpotSubmit(initialSpotSubmit)
  }

  return (
    <form
      className="w-full md:w-72 p-4 space-y-4 border-t border-gray-200 bg-white overflow-y-auto max-h-[70vh]"
      onSubmit={(e) => {
        // ブラウザ標準の送信時リロードを止める（メモリ上のStateがすべて消えるため必須）
        e.preventDefault();
        // App経由でuseSpots.tsのaddSpot or updateSpot を呼び、DBへ送信
        if (editingSpot) {
          updateSpot(editingSpot.id, spotSubmit)
        } else {
          addSpot(spotSubmit)
        }

        // 登録後にセクションを閉じる
        setIsOpen(false);
      }}
    >
      <h2
        className="sticky top-0 bg-white text-sm font-semibold text-gray-500 border-b border-gray-200 pb-3 flex items-center justify-between cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        {editingSpot ? "スポット編集" : "スポット新規登録"}
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
            type="button"
            onClick={resetForm}
          >
            リセットする
          </button>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white text-sm font-medium rounded py-2 hover:bg-blue-700"
          >
            {editingSpot ? "更新する" : "登録する"}
          </button>
        </>
      )}
    </form>
  );
}
export default SpotForm;
