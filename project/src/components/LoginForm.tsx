// ログインフォーム。useAuthのlogin関数を呼び出すだけの責務
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
// FormEventはReact組み込みの「フォーム送信イベント」の型
import type { FormEvent } from 'react'

function LoginForm() {
  const { login, user } = useAuth();
  // 変数名をloginにするとuseAuth()のlogin関数と衝突するため避ける
  const [loginInput, setLoginInput] = useState({
    email: "",
    password: "",
  });

  if (user) {
      return null
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
      className="p-4 space-y-4 border-t border-gray-200 bg-white"
      onSubmit={handleSubmit}
    >
      <h2 className="text-sm font-semibold text-gray-500">ログイン</h2>

      <div>
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

      <div>
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
    </form>
  );
}
export default LoginForm;
