// render / screen: RTLの基本セット。renderはコンポーネントを仮想的に描画し、screenはその描画結果の中から要素を探す
import { render, screen } from '@testing-library/react'
// Vitestが提供するテスト用の関数
import { describe, it, expect } from 'vitest'
import SpotPopup from './SpotPopup'
import type { Spot } from '../types'

// テスト用ダミーデータのプロパティを型付け
const makeSpotFreeName: Spot = {
    id: 'test_id',
    name: 'test_名前',
    category: 'test_カテゴリ',
    prefecture: 'test_都道府県',
    postalCode: 'test_郵便番号',
    lat: 0,
    lng: 0,
    description: 'test_説明文',
    tags: ['test_タグ01','test_タグ02'],
    image: 'test_画像',
    createdAt: 'test_作成日時'
}

//テストをグループ化
describe('SpotPopup', () => {

    // it = 実際のテストケース
    it('名前が表示される', () => {

        // コンポーネントを仮想的なDOM(画面)として描画
        render(<SpotPopup spot={makeSpotFreeName} />)

        //except = これから検証するという宣言・screen = 仮想画面（結果）から要素を探す窓口 ・ getByText = テキストを探す ・toBeInTheDocument = 渡された要素が、実際に画面(DOM)の中に存在しているか」を確認
        expect(screen.getByText( makeSpotFreeName.name )).toBeInTheDocument()
    })

        it('カテゴリーが表示される', () => {
        render(<SpotPopup spot={makeSpotFreeName} />)
        expect(screen.getByText( makeSpotFreeName.category )).toBeInTheDocument()
    })
})
