// スポット一覧表示＋カテゴリ・都道府県フィルタのコントロール
// Spotはsrc/types.tsで定義したこのアプリ独自の型
import { useState } from "react";
import type { Spot } from "../types";

interface SpotListToProps {
  spots: Spot[];
  selectedSpotId: string | null;
  onSelectSpot: (idFreeNam: string) => void;
  categoryFilter: string;
  setCategoryFilter: (categoryFreeName: string) => void;
  prefectureFilter: string;
  setPrefectureFilter: (prefectureFreeName: string) => void;
}

function SpotList({
  spots,
  selectedSpotId,
  onSelectSpot,
  categoryFilter,
  setCategoryFilter,
  prefectureFilter,
  setPrefectureFilter,
}: SpotListToProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full md:w-72 h-48 md:h-full overflow-y-auto border-b md:border-b-0 md:border-r border-gray-200 bg-white shrink-0">
      <h2
        className="sticky top-0 bg-white px-4 py-3 text-sm font-semibold text-gray-500 border-b border-gray-200 flex items-center justify-between cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        スポット一覧（{spots.length}件）

        <svg
          className={`w-4 h-4 ${!isOpen ? 'rotate-0' : 'rotate-180'}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </h2>

      {isOpen && (
        <>
          <select
            className="px-4 py-3"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="all">すべて</option>
            <option value="洞窟">洞窟</option>
            <option value="遺跡">遺跡</option>
          </select>

          <select
            value={prefectureFilter}
            onChange={(e) => setPrefectureFilter(e.target.value)}
          >
            <option value="all">都道府県</option>
            <option value="島根">島根</option>
            <option value="長野">長野</option>
            <option value="滋賀">滋賀</option>
          </select>

          <ul className="divide-y divide-gray-100">
            {spots.map((spot) => (
              // クリックしたらApp.tsxから渡されたsetSelectedId（useStateの更新関数）を実行
              <li
                key={spot.id}
                onClick={() => onSelectSpot(spot.id)}
                className={`px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors ${
                  spot.id === selectedSpotId
                    ? "bg-blue-100"
                    : "hover:bg-gray-50"
                }`}
              >
                <p className="font-medium text-gray-900">{spot.name}</p>
                <p className="text-xs text-gray-500">
                  {spot.category}・{spot.prefecture}
                </p>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
export default SpotList;
