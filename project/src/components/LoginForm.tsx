// ログインフォーム（枠のみ。state・onChange・onSubmitはこれから自分で結びつける）

import { useState } from "react";

import { useAuth } from "../context/AuthContext";
// Reactが用意している「フォーム送信イベントの形」を表す型
import type { FormEvent } from 'react'

function LoginForm() {
  // useAuth()を呼ぶと、AuthProviderがvalue={{ user, login, logout }}で配っている中身を受け取れる
  // useAuth（箱） → AuthProvider関数 で定義した「login関数」だけを呼び出してemailなどの値をフォーム側で埋め込める
  const { login, user } = useAuth();
  // 単純な文字列だけの場合、useStateの初期値からTypeScriptが自動で型を推測してくれるので型import不要
  // 変数名をloginにすると、この後受け取るlogin関数と衝突するので避ける
  const [loginInput, setLoginInput] = useState({
    email: "",
    password: "",
  });

    // もしログイン中なら何もしない
    if (user) {
        return null
    }

  // e = フォームが送信されたときに渡ってくる「イベント情報」（自由命名）
  // FormEvent = 「フォーム送信イベントの形」を表す型（Reactが用意している型）
  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    try {
      // useAuth経由でで入れたconst { login }のlogin関数を使いまわす
      await login(loginInput.email, loginInput.password);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <form
      className="p-4 space-y-4 border-t border-gray-200 bg-white"
      // 関数の実行ではなく、関数そのものを渡す（コールバック関数）
      // ()をつけるとReactが<form>をレンダリングした週間に実行される
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
          // ...loginInput：全プロパティを展開
          // email: e.target.value：その中のemailだけを新しい値に差し替える（ここまでで「新しいオブジェクト」が完成）
          // setLoginInput(...)：その新しいオブジェクトを、新しいstateとして設定する
          // （結果として）loginInputの状態が書き換わり、再レンダリングされる
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
