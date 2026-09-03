import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import AuthStatus from './AuthStatus'
import type { User } from "@supabase/supabase-js"


import { useAuth } from '../context/AuthContext'

// ../context/AuthContextというファイルをimportしたら、本物の中身の代わりに、ここで指定した偽物を返すようにVitestに指示
vi.mock('../context/AuthContext', () => ({

  // useAuthという名前の「空っぽの偽関数」を用意する。中身(戻り値)は各テストの中で個別に設定
  useAuth: vi.fn(),

}))


// useAuth()を受け取ったAuthStatusが正しく動くか確認（useAuthのロジックまではテストしない）
describe('AuthStatus',() => {

    // ログイン中はメールアドレスとログアウトボタンが表示されるかを確認
     it('ログイン中はメールアドレスとログアウトボタンが表示される',() => {

        // vi = モック機能をまとめた道具箱
        // vi.mocked(...) = モックかされたuseAuthをTSに「これはモック」と伝える型変換
        // .mockReturnValue(値) = 呼ばれたら常にこの値を返す、という設定
        vi.mocked(useAuth).mockReturnValue({

        // useAuth()が呼ばれたら、戻り値のuserプロパティにUser型として扱ったオブジェクトが入る（テストではemailだけで充分＋User型使用）
        user: { email: 'test@example.com' } as User,

        // 今回のテストでは呼ばれないので、中身が空の偽関数を渡しておく
        login: vi.fn(),
        logout: vi.fn(),
        })

        render(<AuthStatus />)
        expect(screen.getByText( 'test@example.com' )).toBeInTheDocument()

    })

    it('未ログイン時は何も表示されない', () => {
        vi.mocked(useAuth).mockReturnValue({
            user: null,
            login: vi.fn(),
            logout: vi.fn(),
        })

        // containerはrenderの戻り値で、特定のプロパティの中身(実際のDOM要素)**を取り出して、それを変数に格納している
        const { container } = render(<AuthStatus />)

        // そのDOM要素(container)の中身(子要素)が空っぽかどうかを確認（null = 未ログインなので、何もなければ正常）
        expect(container).toBeEmptyDOMElement()
    })

})

