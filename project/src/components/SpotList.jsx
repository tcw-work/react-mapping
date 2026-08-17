function SpotList ({spot}) {
    return(
        <ul>
            {spot.map((OriginalName) => (
                <li key={OriginalName.id}>{OriginalName.name}</li>
            ))}
        </ul>
    )
}
export default SpotList