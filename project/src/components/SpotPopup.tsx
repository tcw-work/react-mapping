import type {Spot} from '../types' // src/types.tsにspotリストの型を定義


import type { User } from "@supabase/supabase-js";
import { MASTER_ACCOUNT_ID } from "../constants";

interface SpotPopupProps {
  spot: Spot
  user: User | null
  onEditSpot: (spot: Spot) => void
  onDeleteSpot: (id: string) => void
}

function SpotPopup ({ spot, user, onEditSpot, onDeleteSpot }: SpotPopupProps) {

    // ログイン中のユーザーIDが、投稿者のIDと一致する、または、マスターアカウントのIDと一致する
    const canEdit = user?.id === spot.created_by || user?.id === MASTER_ACCOUNT_ID

    return(
        <div>
            <h3>{spot.name}</h3>
            <p>{spot.category}</p>
            <p>{spot.area}</p>
            <p>{spot.postalCode}</p>
            <p>{spot.address}</p>
            <p>{spot.description}</p>
            <p><img src={spot.image} alt={spot.name} className="w-full h-32 object-cover rounded" /></p>
            <p>
                {/* spot（propsで受け取ったオブジェクト）の中のtag配列をmap(受け皿名)で処理 */}
                {spot.tags.map((tag) => (
                    <span key={tag} className="mr-2 text-sm text-gray-500">#{tag}</span>
                ))}
            </p>
            <p>{spot.createdAt}</p>
            {canEdit && (
                // 1つの式（( )の中）から返せるのはルート要素1つだけなので、フラグメントで囲む
                 <>
                    <button
                        type="button"
                        onClick={() => onEditSpot(spot)}
                        className="mt-2 w-full bg-gray-600 text-white text-sm font-medium rounded py-1.5 hover:bg-gray-700"
                    >
                        編集する
                    </button>

                    <button
                        type="button"
                        // ifは処理のため前後に{}でくくっておく
                        onClick={() => {
                            if (window.confirm("本当に削除してもいいですか？")) {
                                onDeleteSpot(spot.id)
                            }
                        }}
                        className="mt-2 w-full bg-gray-600 text-white text-sm font-medium rounded py-1.5 hover:bg-gray-700"
                    >
                        削除する
                    </button>
                </>
            )}
        </div>

    ) 
}
export default SpotPopup
