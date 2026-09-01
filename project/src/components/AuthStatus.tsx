import { useAuth } from "../context/AuthContext";

// ログイン中か否かで出す表示を作成
function AuthStatus() {

    // user情報などを定義したuseAuthから関数を流用
    // Hookはコンポーネントの中でしか呼べない（ルールとして覚える）
    const { user, logout } = useAuth()

    if (!user) {
        return null
    }
    return (
        <div className="p-4 border-t border-gray-200 bg-white flex items-center justify-between">
            <p className="text-sm text-gray-700">
                {/* ここにログイン中のメールアドレスを表示（useAuth経由でプロパティアクセス） */}
                {user.email}
            </p>
            <button
                className="text-sm text-blue-600 hover:underline"
                onClick={logout}
            >
                ログアウト
            </button>
        </div>
    );
}
export default AuthStatus;
