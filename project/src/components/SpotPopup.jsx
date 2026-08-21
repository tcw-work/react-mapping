function SpotPopup ({spot}) {
    return(
        <div>
            <h3>{spot.name}</h3>
            <p>{spot.category}</p>
            <p>{spot.prefecture}</p>
            <p>{spot.postalCode}</p>
            <p>{spot.description}</p>
            <p><img src={spot.image} alt={spot.name} className="w-full h-32 object-cover rounded" /></p>
            <p>
                {/* spot（propsで受け取ったオブジェクト）の中のtag配列をmap(受け皿名)で処理 */}
                {spot.tags.map((tag) => (
                    <span key={tag} className="mr-2 text-sm text-gray-500">#{tag}</span>
                ))}
            </p>
            <p>{spot.createdAt}</p>
        </div>

    ) 
}
export default SpotPopup
