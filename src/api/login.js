import serves from "@/utils/serves"

// 手机号和密码登录
export const login = (account, password) => serves.post('/api/sessions/account', { account, password })