// ログイン状態を管理し、アプリ全体に配るための土台（Context + Provider + カスタムフック）

import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
// User型はSupabase側で定義済みのものをそのまま流用
import type { User } from "@supabase/supabase-js";
import { supabase } from "../lib/supabaseClient";

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

// アプリ全体にuser・login・logoutを配るための入れ物（中身はAuthProviderが供給する）
const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

// childrenには<AuthProvider>で囲んだ内容（main.tsxでは<App />）がReactによって自動的に渡される
function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // 今すでにログイン済みのセッションがあるか確認
    async function getInitialSession() {
        const {data} = await supabase.auth.getSession()
        setUser(data.session?.user ?? null)
    }
    getInitialSession()

    const {data: listenerFreeName} = supabase.auth.onAuthStateChange((eventFreeName, sessionFreeName) => {
        setUser(sessionFreeName?.user ?? null)
    })

    return () => {
        listenerFreeName.subscription.unsubscribe()
    }
  }, []) // 依存配列が空 → マウント時に1回だけ実行

  // メール・パスワードでログイン
  async function login(email:string, password: string) {
    const {error} = await supabase.auth.signInWithPassword({email, password})
    if (error) {
        // ログインフォーム側でtry/catchして表示する必要があるためthrow
        throw error
    }
  }
  // ログアウト
  async function logout() {
    const {error} = await supabase.auth.signOut()
        if (error) {
        // ログアウト失敗をユーザーに伝える必要性は低いためconsole出力のみ
        console.error(error)
    }
  }

  return (
    <AuthContext.Provider value={{user, login, logout}}>
      {children}
    </AuthContext.Provider>
  );
}

// Context経由でuser・login・logoutを取得する読み取り専用フック
function useAuth() {
    const context = useContext(AuthContext)
    if (context === undefined ) {
        throw new Error('useAuthはAuthProviderの中で使ってください')
    }
    return context
}

// AuthProvider（コンポーネント）とuseAuth（関数）を同じファイルからexportしているため、
// Fast Refreshの警告が出る。構造を分けるほどではないため次の行のみ除外
// eslint-disable-next-line react-refresh/only-export-components
export { AuthProvider, useAuth }