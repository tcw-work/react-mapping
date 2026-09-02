// Supabaseクライアントの初期化。他ファイルはここからimportして使う
import { createClient } from '@supabase/supabase-js'
// ローカルは.env、本番はVercelのEnvironment Variablesに設定（どちらも未設定だとundefinedになり接続失敗する）
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabasePublishableKey = import.meta.env.VITE_SUPABASE_ANON_KEY
export const supabase = createClient(supabaseUrl, supabasePublishableKey)