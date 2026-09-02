// ログイン中のメールアドレス表示とログアウトボタン。未ログイン時は何も表示しない
import { useAuth } from "../context/AuthContext";

function AuthStatus() {
    const { user, logout } = useAuth()

    if (!user) {
        return null
    }
    return (
        <div className="p-4 border-t border-gray-200 bg-white flex items-center justify-between">
            <p className="text-sm text-gray-700">
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
