// ログインフォーム。useAuthのlogin関数を呼び出すだけの責務
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
// FormEventはReact組み込みの「フォーム送信イベント」の型
import type { FormEvent } from "react";

function LoginForm() {
  const { login, user } = useAuth();
  // 変数名をloginにするとuseAuth()のlogin関数と衝突するため避ける
  const [loginInput, setLoginInput] = useState({
    email: "",
    password: "",
  });

  const [isOpen, setIsOpen] = useState(false);

  if (user) {
    return null;
  }

  // フォーム送信時にlogin関数を呼び出す
  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    try {
      await login(loginInput.email, loginInput.password);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <form
      className="space-y-4 border-t border-gray-200 bg-white"
      onSubmit={handleSubmit}
    >
      <h2
        className="text-sm font-semibold text-gray-500 border-b border-gray-200 px-4 py-3 flex items-center justify-between cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        ログイン
        <svg
          className={`w-4 h-4 ${!isOpen ? "rotate-0" : "rotate-180"}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </h2>

      {isOpen && (
        <>
          <div className="px-4 py-3">
            <div className="mb-3">
              <label className="block text-xs font-medium text-gray-700 mb-1">
                メールアドレス
              </label>
              <input
                type="email"
                className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                value={loginInput.email}
                onChange={(e) =>
                  setLoginInput({ ...loginInput, email: e.target.value })
                }
              />
            </div>

            <div className="mb-3">
              <label className="block text-xs font-medium text-gray-700 mb-1">
                パスワード
              </label>
              <input
                type="password"
                className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                value={loginInput.password}
                onChange={(e) =>
                  setLoginInput({ ...loginInput, password: e.target.value })
                }
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white text-sm font-medium rounded py-2 hover:bg-blue-700"
            >
              ログイン
            </button>
          </div>
        </>
      )}
    </form>
  );
}
export default LoginForm;
