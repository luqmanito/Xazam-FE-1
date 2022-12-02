import axios from "axios";

const baseUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/xazam/auth`;
console.log(baseUrl);

export const register = (body) => axios.post(`${baseUrl}/register`, body);
export const login = (body) => axios.post(`${baseUrl}/login`, body);
export const logout = () => axios.delete(`${baseUrl}/logout`);
export const forgot = (body) => axios.post(`${baseUrl}/forgot-password`, body);
export const reset = (body) => axios.patch(`${baseUrl}/reset-password`, body);
