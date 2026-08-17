import MapView from './components/MapView.jsx'
import SpotList from './components/SpotList.jsx'
import spotData from './data/spots.json'

function App() {
  return (
    // 返せる戻り値は一つだけなのでdivで囲む
    <div className='flex'>
      <SpotList spot={spotData}/>
      <MapView spot={spotData} />
    </div>
  )
}
export default App