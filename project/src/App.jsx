import MapView from './components/MapView.jsx'
import SpotList from './components/SpotList.jsx'
import spotData from './data/spots.json'

function App() {
  return (
    // 返せる戻り値は一つだけなのでdivで囲む
    <div className="flex flex-col md:flex-row h-screen w-screen overflow-hidden">
      <SpotList spot={spotData}/>
      <MapView spot={spotData} />
    </div>
  )
}
export default App