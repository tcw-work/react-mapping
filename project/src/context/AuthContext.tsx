// AuthContext.tsxは、ログインフォームそのものでなく、ここで作っているのは、
// 「ログイン状態を管理して、アプリ全体に配るための土台（インフラ部分）」

//今まではAPPが親で子コンポーネントを定義していたが、
// useContextとchildrenを使ってそのAppのさらに親を定義するイメージね

import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
// supabaseですでに定義済みのUser型
import type { User } from "@supabase/supabase-js";
import { supabase } from "../lib/supabaseClient";

interface AuthContextType {
  // supabaseの中のユーザー型を流用
  user: User | null;
  // login関数は「こういう引数を受け取り、こういう値を返す関数ですよ」という意味
  // promise予約チケットとして、後で結果が届く
  // ※login・logoutの実際の中身がasync functionになる予定だから、その説明書（型）もPromiseで定義
  login: (email: string, password: string) => Promise<void>;
  // ログアウトは特に値を返す必要がない
  logout: () => Promise<void>;
}

// createContext = 複数のコンポーネント間で共有する（配る）ための値の入れ物
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 受け取るpropsの型を定義
interface AuthProviderProps {
  children: ReactNode;
}
// この後下記のような形になる
// <AuthProvider>
//     <App />　このオブジェクト情報がchildrenとして入る
// </AuthProvider>

// Reactによって自動的にchildrenという名前のpropsとして、AuthProvider関数の中に渡される
// AuthProviderの中に挟まれる中身（どんな形になるか分からないので、
// ReactNodeという何でも受け入れられる型にしておく）を、childrenという名前で受け取る

// userのstateを実際に持ち、
// Supabaseと通信してlogin・logoutの中身を実装する、エンジン部分
// childrenはmain.tsxで設定した<App />（{ type: App, props: {} }のようなオブジェクト情報）が入る
function AuthProvider({ children }: AuthProviderProps) {
  // ログイン中ユーザーのstate情報
  const [user, setUser] = useState<User | null>(null);

  // 今すでにログイン済みかどうかを確認（セッションを取得）
  useEffect(() => {
    async function getInitialSession() {
        // supabaseオブジェクトのauthプロパティでgetSession関数を実行して今のセッション（ログイン状態）を確認
        // dataはSupabaseのgetSession()が返してくる決まったプロパティ名として分割代入
        const {data} = await supabase.auth.getSession()
        // data に session（ログイン情報）があれば、その中の user データを返す
        setUser(data.session?.user ?? null)
    }
    getInitialSession()

    // ログイン・アウトで状態が変化（成功）するたびに処理を実行
    // onAuthStateChange（supabase由来の関数）は{ data: { subscription } }という形で、登録した監視員そのものを返してくれる
    // ここではdataという名前を、分かりやすいようにlistenerFreeNameという別名に変えて受け取っている
    // onAuthStateChangeは「1番目の引数にイベントの種類、2番目の引数に現在のセッション」で、event・sessionという名前自体は自由
    const {data: listenerFreeName} = supabase.auth.onAuthStateChange((eventFreeName, sessionFreeName) => {
        setUser(sessionFreeName?.user ?? null)
    })

    // ログイン・アウト状態変化の後片付け（クリーンアップ）。このコンポーネントが画面から消えるときに、監査解除を伝える
    return () => {
        // SBはsubscriptionオブジェクト、unsubscribeというメソッド付き）」を戻り値として返す
        listenerFreeName.subscription.unsubscribe()
    }

    // []（空）→ 最初の1回だけ実行
  }, [])

// 本来は const {data, error} = ... という「data・error 両方入った形」で返ってくる
// dataには成功時のセッション情報が入るが、userの更新（結果）はonAuthStateChangeがstate自動でやってくれるため
// ここではdataを受け取らず（無視して）、errorだけを取り出している。
// errorがnullの場合 → ログイン処理成功 → onAuthStateChangeの自動検知でstate更新（受け取った{error}で中身があればerror処理に進む）
  async function login(email:string, password: string) {
    const {error} = await supabase.auth.signInWithPassword({email, password})
    if (error) {
        // ユーザーに伝えたいのでthrowで返す
        throw error
    }
  }
  async function logout() {
    const {error} = await supabase.auth.signOut()
        if (error) {
        // ログアウト失敗をユーザーに詳しく伝える必要性は低いためconsoleエラー時で実行
        console.error(error)
    }
  }

  return (
    // createContextでContextを作ると、Reactが自動的にセットで用意してくれる、専用の「配達員」コンポーネントです
    // これで囲まれた範囲の中でだけ、useContext(AuthContext)で値を読み取れるようになる
    // value = 実際に配る中身（AuthContextType）
    // 今回定義した関数をオブジェクトで一まとめにする（emailなどの引数はこれを渡したコンポーネントから貰ってくる）
    <AuthContext.Provider value={{user, login, logout}}>
      {children}
    </AuthContext.Provider>
  );
}

// 他のコンポーネントが簡単に呼び出せる、読み取り専用の関数を追加
function useAuth() {

    // 最初に作ったAuthContext（入れ物）の、今の中身
    const context = useContext(AuthContext)

    // <AuthProvider> で囲まれていない場所でuseAuth()が呼ばれたら
    if (context === undefined ) {
        throw new Error('useAuthはAuthProviderの中で使ってください')
    }
    return context
}
// 2つを、他のファイルからimportできるようにする
export { AuthProvider, useAuth }