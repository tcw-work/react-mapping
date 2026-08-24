interface Spot {
  id: string;
  name: string;
  category: string;
  prefecture: string;
  postalCode: string;
  lat: number;
  lng: number;
  description: string;
  tags: string[];
  image: string;
  createdAt: string;
}
interface SpotListToProps {
  spots: Spot[];
  selectedSpotId: string | null;
  onSelectSpot: (idFreeNam: string) => void; //関数なのでそれ用の型。IDを一つ受け取り、voidは戻り値を返さない（useStateはその使い方を想定していない）という意味
  categoryFilter: string;
  setCategoryFilter: (categoryFreeName: string) => void; //useStateの関数
  prefectureFilter: string
  setPrefectureFilter: (prefectureFreeName: string) => void
}

// propsを分割代入
function SpotList({
  spots,
  selectedSpotId,
  onSelectSpot,
  categoryFilter,
  setCategoryFilter,
  prefectureFilter,
  setPrefectureFilter
}: SpotListToProps) {
  return (
    <aside className="w-full md:w-72 h-48 md:h-full overflow-y-auto border-b md:border-b-0 md:border-r border-gray-200 bg-white shrink-0">
      <h2 className="sticky top-0 bg-white px-4 py-3 text-sm font-semibold text-gray-500 border-b border-gray-200">
        スポット一覧（{spots.length}件）
      </h2>

      <select
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
        <option value="島根県">島根県</option>
        <option value="長野県">長野県</option>
        <option value="滋賀県">滋賀県</option>
      </select>

      <ul className="divide-y divide-gray-100">
        {spots.map((spot) => (
          // クリックしたらApp.jsxから渡された**setSelectedId（useStateの更新関数）を実行
          <li
            key={spot.id}
            onClick={() => onSelectSpot(spot.id)}
            className={`px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors ${
              spot.id === selectedSpotId ? "bg-blue-100" : "hover:bg-gray-50"
            }`}
          >
            <p className="font-medium text-gray-900">{spot.name}</p>
            <p className="text-xs text-gray-500">
              {spot.category}・{spot.prefecture}
            </p>
          </li>
        ))}
      </ul>
    </aside>
  );
}
export default SpotList;
