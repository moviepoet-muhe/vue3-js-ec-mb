
import serves from "@/utils/serves"
// 获取验证手机号是否注册
export const isPhone = (phone) => serves.get(`/api/users/${phone}`)

// 获取验证码
export const getCode = (phone) => serves.get(`/api/users/${phone}/code`)

// 验证验证码
export const isCode = (phone, code) => serves.get(`/api/users/${phone}/verifycode`, {
  params: {
    code
  }
});

// 注册
export const register = (phone, password) => serves.post('/api/users/register', { phone, password })

// 绑定用户名
export const bindUsername = async (token, username) => {
  if (!token) {
    console.error('Token 为空');
    return { code: 400, message: 'Token 为空，请重新登录' };
  }
  try {
    const response = await serves.put('/api/users/bindusername', { username }, {
      headers: {
        'Authorization': `Bearer ${token}` // 添加 token 到请求头
      }
    });
    return response;
  } catch (error) {
    return { code: error.response?.status || 500, message: error.message };
  }
};