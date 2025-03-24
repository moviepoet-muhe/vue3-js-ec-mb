import { showToast } from 'vant';

// 验证用户是否已登录
export const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  return !!token;
};

// 退出登录
export const logout = () => {
  localStorage.removeItem('token');
  showToast('已退出登录');
};
