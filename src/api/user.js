import axios from 'axios'
import config from './default'
const api = config.port

axios.create({
  baseURL: "api",//服务端地址
  withCredentials: true
})

/**
 *@method GET
 *@desc 测试获取数据
 * */
export const getAll = () =>
  axios.get(`${api}/user/test`)

/**
 *@method POST
 *@desc 注册账户
 * */
export const register = (data) =>
  axios.post(`${api}/user/register`,data)

/**
 *@method POST
 *@desc 注册账户
 * */
export const login = (data) =>
  axios.post(`${api}/user/login`,data)


/**
 *@method GET
 *@desc 获取用户的数据
 * */
export const getCurrent = (data) =>
  axios.get(`${api}/user/current`,{headers: {'Authorization': data}})


/**
 *@method POST
 *@desc 修改密码
 * */
export const changePassword = (data) =>
  axios.post(`${api}/user/changePassword`,data)

/**
 *@method POST
 *@desc 修改用户的数据
 * */
export const changeInformation = (data,body) =>
  axios.post(`${api}/user/changeInformation`, {...body}, {headers: {'Authorization': data}})

/**
 *@method GET
 *@desc 获取电话簿的数据
 * */
export const getAddressBook = () =>
  axios.get(`${api}/user/getAddressBook`)


