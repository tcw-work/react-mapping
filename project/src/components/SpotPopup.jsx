function SpotPopup ({zawaSpot}) {
    return(
        <div>
            <h3>{zawaSpot.name}</h3>
            <h3>{zawaSpot.category}</h3>
            <h3>{zawaSpot.prefecture}</h3>
            <h3>{zawaSpot.postalCode}</h3>
            <h3>{zawaSpot.description}</h3>
            <h3>{zawaSpot.image}</h3>
            <h3>
                {/* zawaSpot（propsで受け取ったオブジェクト）の中のtag配列をmap(受け皿名)で処理 */}
                {zawaSpot.tags.map((OriginalNameTag) => (
                    <span key={OriginalNameTag}>{OriginalNameTag}</span>
                ))}
            </h3>
            <h3>{zawaSpot.createdAt}</h3>
        </div>

    ) 
}
export default SpotPopup
