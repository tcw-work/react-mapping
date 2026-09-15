// アプリ全体のstate（フィルタ・選択中スポット）を持ち、各コンポーネントに配る親コンポーネント
import MapView from './components/MapView'
import SpotList from './components/SpotList'
import SpotForm from './components/SpotForm'
import LoginForm from './components/LoginForm'
import AuthStatus from './components/AuthStatus'
import { useState } from 'react'
import useSpots from './hooks/useSpots'
import type { Spot } from "./types";
import { useAuth } from './context/AuthContext'

function App() {
  const[selectedSpotId, setSelectedId] = useState<string | null>(null)
  const[categoryFilter, setCategoryFilter] = useState<string>('all')
  const[areaFilter, setAreaFilter] = useState<string>('all')

  // 編集用state
  const[editingSpot, seteditingSpot] = useState<Spot | null>(null)

  const { spotData, loading, fetchError, addSpot, updateSpot, deleteSpot } = useSpots()
  const { user } = useAuth()

  // 絞り込みフィルターはAppに直書きのため、別の箇所のstateが変わっても更新される
  const filteredSpots = spotData.filter((s) => {
    const matchesCategory = categoryFilter === 'all' || s.category === categoryFilter
    const matchesArea = areaFilter === 'all' || s.area === areaFilter
    return matchesCategory && matchesArea
  })

  // 各サイドバーセクション処理
  // const [isOpen, setIsOpen] = useState(false);
  const [openSection, setOpenSection] = useState<string | null>(null);

  
  // 編集用関数
  function startEditing(spot: Spot) {
    seteditingSpot(spot) //編集対象を記憶
    setOpenSection("formFreeName") //フォームを開く
  }


  // 読み込み処理
  if (loading) {
    return <div>読み込み中</div>
  }
  if (fetchError) {
    return <div>エラーが発生しました：{fetchError}</div>
  }

  return (
    <div className="flex flex-col md:flex-row h-screen w-screen overflow-hidden">
      <div className='block'>
        <div className='mb-4'>
          <AuthStatus />
          <LoginForm
            isOpen={openSection === "loginFreeName"}
            setIsOpen={(ClickResultFreeName:boolean) =>
            ClickResultFreeName ? setOpenSection("loginFreeName") : setOpenSection(null)
             }
          />

          {/* 渡された引数によってopenSectionはform、list、nullのどれかになって更新される（stateに二つのセクションが同時に入るのを防ぐ */}
          {/* setIsOpenは("formFreeName")という形で関数の実行を行っているので毎回実行されてしまう（他のpropsは単なるデータの受け渡し） */}
          {/* setIsOpen=の中をアロー関数でラップ（コールバック）することで他のレンダリング時も「関数という名の箱」が1つ作られるだけで実行はされない */}
          {/* これやらないとsetOpenSection("listFreeName")が実行され、openSectionのstateの中身が更新されるという副作用が起きる */}
          <SpotList
            spots={filteredSpots}
            categoryFilter={categoryFilter}
            setCategoryFilter={setCategoryFilter}
            areaFilter={areaFilter} 
            setAreaFilter={setAreaFilter}
            selectedSpotId={selectedSpotId}
            onSelectSpot={setSelectedId}
            // 渡された引数によってopenSectionはform、list、nullのどれかになって更新される（stateに二つのセクションが同時に入るのを防ぐ
            // setIsOpenは("formFreeName")という形で関数の実行を行っているので毎回実行されてしまう（他のpropsは単なるデータの受け渡し）
            // setIsOpen=の中をアロー関数でラップ（コールバック）することで他のレンダリング時も「関数という名の箱」が1つ作られるだけで実行はされない
            // これやらないとsetOpenSection("listFreeName")が実行され、openSectionのstateの中身が更新されるという副作用が起きる
            isOpen={openSection === "listFreeName"}
            // 「setIsOpen=」は子コンポーネント側ではsetIsOpen(true)などになる
            // 子コンポーネント側のsetIsOpen(!isOpen)処理を行い、そのままApp.tsx側の関数が持つ引数ClickResultが値を受け取る
            setIsOpen={(ClickResultFreeName:boolean) =>
              ClickResultFreeName ?setOpenSection("listFreeName") : setOpenSection(null)
            }
          />
          <SpotForm
            // keyの値が変わると、Reactはそれを「別コンポーネント」とみなし、古いSpotFormインスタンスを破棄して、新しいSpotFormインスタンスを最初から作り直す
            // keyに関しては再レンダリングではなく作り直し（マウントし直し）
            key={editingSpot?.id ?? "new"}
            addSpot={addSpot}
            isOpen={openSection === "formFreeName"}
            setIsOpen={(ClickResultFreeName:boolean) =>
              ClickResultFreeName ? setOpenSection("formFreeName") : setOpenSection(null)
            }
            editingSpot={editingSpot}
            updateSpot={updateSpot}

          />
        </div>
      </div>
      <MapView
        spots={filteredSpots}
        selectedSpotId={selectedSpotId}
        selectedMapPin={setSelectedId}
        user={user}
        onEditSpot={startEditing}
        onDeleteSpot={deleteSpot}
      />
    </div>
  )
}
export default App