import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
// childrenを使うためにインポート
import { AuthProvider } from './context/AuthContext'

// 非nullアサーション演算子!**を使って「これはnullではない」という保証をTypeScriptに伝える
createRoot(document.getElementById('root')!).render(
  // ラッパーコンポーネント。<App />を囲んで
  <StrictMode>
    <AuthProvider>
      {/* ReactはＡpp.tsxの内容すべて返すのではなく、 { type: App, props: {} } のように仮想ＤＯＭの中のオブジェクトを返す*/}
      {/* それがAuthProviderのchildren（<App />の予約票）として、そのまま右から左へ、自分が返すJSXの中の決まった場所（<AuthContext.Provider>の中）に置き直す */}
      <App />
    </AuthProvider>
  </StrictMode>,
)

// フロー図
// main.tsx
//  └─ AuthProvider（loginという関数を持っている）
//       └─ App
//            └─ ログインフォーム（AuthProviderから孫コンポーネント）
//                 → useAuth() を呼べば、AuthProviderが持つloginにアクセスできる（道がつながっている）
//                AuthProviderで定義したuseContextにより、propsのバケツリレー回避