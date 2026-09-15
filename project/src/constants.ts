// マスターアカウント（自分自身）のSupabase Auth UID
// Supabase側のUPDATE用RLSポリシー（created_by = auth.uid() OR auth.uid() = この値）と同じ値
export const MASTER_ACCOUNT_ID = "b62f6d6f-9efb-4a4a-82aa-7b2fd8f6399e";
