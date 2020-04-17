import axios from 'axios'
import config from './default'
const api = config.port

axios.create({
  baseURL: "api",//服务端地址
  withCredentials: true
})


/**
 *@method GET
 *@desc 获取我的活动的数据
 * */
export const getMyActivity = (token) =>
  axios.get(`${api}/activity/getMyActivity`,{headers: {'Authorization': token}})

/**
 *@method GET
 *@desc 获取所有的活动数据
 * */
export const getAllActivity = () =>
  axios.get(`${api}/activity/getAllActivity`)

/**
 *@method POST
 *@desc 增加活动
 * */
export const increaseActivity = (data,body) =>
  axios.post(`${api}/activity/increaseActivity`, {...body}, {headers: {'Authorization': data}})

/**
 *@method GET
 *@desc 获取我的活动的数据
 * */
export const getVerifyActivity = (token) =>
  axios.get(`${api}/activity/getVerifyActivity`,{headers: {'Authorization': token}})


/**
 *@method POST
 *@desc 增加活动
 * */
export const verifyActivity = (data,body) =>
  axios.post(`${api}/activity/verifyActivity`, {...body}, {headers: {'Authorization': data}})
