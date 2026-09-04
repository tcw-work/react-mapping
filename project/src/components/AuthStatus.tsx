// ログイン中のメールアドレス表示とログアウトボタン。未ログイン時は何も表示しない
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

function AuthStatus() {
    const { user, logout } = useAuth()

      const [isOpen, setIsOpen] = useState(false);

    if (!user) {
        return null
    }

    return (
        <div className="p-4 border-t border-gray-200 bg-white flex items-center justify-between">
            <p
                className="text-sm text-gray-700 flex items-center gap-2 cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
            >
                {user.email}
                <svg
                    className={`w-4 h-4 ${!isOpen ? 'rotate-0' : 'rotate-180'}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
            </p>
            {isOpen && (
                <button
                    className="text-sm text-blue-600 hover:underline"
                    onClick={logout}
                >
                    ログアウト
                </button>
            )}
        </div>
    );
}
export default AuthStatus;
