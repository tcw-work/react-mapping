function SpotList ({spot}) {
    return(
        <aside className="w-full md:w-72 h-48 md:h-full overflow-y-auto border-b md:border-b-0 md:border-r border-gray-200 bg-white shrink-0">
            <h2 className="sticky top-0 bg-white px-4 py-3 text-sm font-semibold text-gray-500 border-b border-gray-200">
                スポット一覧（{spot.length}件）
            </h2>
            <ul className="divide-y divide-gray-100">
                {spot.map((OriginalName) => (
                    <li key={OriginalName.id} className="px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors">
                        <p className="font-medium text-gray-900">{OriginalName.name}</p>
                        <p className="text-xs text-gray-500">{OriginalName.category}・{OriginalName.prefecture}</p>
                    </li>
                ))}
            </ul>
        </aside>
    )
}
export default SpotList