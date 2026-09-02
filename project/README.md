# Reactスポットマップ（仮）

日本各地にある「あまり知られていない穴場スポット」を、地図上にまとめて紹介するWebアプリです。
（大島てる／神社マップのような「地図にピンを立てて、クリックすると詳細が出る」体験を、穴場スポット紹介という切り口で実装しています）

🔗 **公開URL**: https://react-mapping-two.vercel.app/

## 概要

- フロントエンドエンジニア（8年）がReactを実務レベルで扱えるようになることを目的に開発した学習用ポートフォリオです。
- JS/Reactのロジックはすべて自分の手で実装し、AI（Claude）はコードレビュー・設計相談・詰まった際の解説役として活用しました。

## 主な機能

- 地図上へのスポットのピン表示（react-leaflet + OpenStreetMap）
- ピンクリックによる詳細情報表示（名前・カテゴリ・都道府県・説明・画像・タグなど）
- スポット一覧 ⇄ 地図表示の連動（一覧クリックで地図が該当ピンへフォーカス）
- カテゴリ・都道府県による絞り込み検索
- ログイン機能（Supabase Auth）
- スポットの新規登録フォーム（ログイン中のみ操作可能、DBへリアルタイム反映）
- レスポンシブ対応（PC / スマホ）

## 技術スタック

| 分類 | 技術 | 採用理由 |
|---|---|---|
| フロントエンド | React 19 / TypeScript / Vite | 実務での採用例が多く、学習優先度が高いため |
| スタイリング | Tailwind CSS | 既に習熟済みのため、実装速度を優先 |
| 地図 | react-leaflet + OpenStreetMap | APIキー・クレジットカード登録が不要で、無料で導入できるため |
| バックエンド（BaaS） | Supabase（PostgreSQL / Auth / RLS） | SQLの実務練習も兼ねられ、認証・DBを素早く構築できるため |
| CI | GitHub Actions | push / PRごとにESLint・tsc・buildを自動チェック |
| ホスティング | Vercel | GitHub連携による自動デプロイ（mainマージ→自動反映） |

## 開発の背景・進め方

以下の3フェーズに分けて、無理なく難易度を上げながら学習・開発しました。

1. **フェーズ1**: 静的JSONデータでのReact基礎固め（コンポーネント設計・props/state・地図表示）
2. **フェーズ2**: Supabase連携による動的化（登録フォーム・DB保存・簡易ログイン機能）
3. **フェーズ3**: Next.jsへの移行（予定）

## 今後の展望

- Next.jsへの移行（SSR/SSGによるSEO対応）
- 画像アップロード機能（Supabase Storage）
- お気に入り・コメント機能

## ローカルでの起動方法

```bash
cd project
npm install
npm run dev
```

`project/.env` に以下2つの環境変数を設定してください（Supabaseプロジェクトのダッシュボードから取得）。

```
VITE_SUPABASE_URL=xxxxx
VITE_SUPABASE_ANON_KEY=xxxxx
```
