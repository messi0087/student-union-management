import axios from 'axios'
import config from './default'
const api = config.port

axios.create({
  baseURL: "api",//服务端地址
  withCredentials: true
})


/**
 *@method GET
 *@desc 获取我的会议申请的数据
 * */
export const getMyMeeting = (token) =>
  axios.get(`${api}/meeting/getMyMeeting`,{headers: {'Authorization': token}})

/**
 *@method GET
 *@desc 获取所有的审核通过的会议数据
 * */
export const getAllMeeting = () =>
  axios.get(`${api}/meeting/getAllMeeting`)

/**
 *@method POST
 *@desc 增加会议申请
 * */
export const increaseMeeting = (data,body) =>
  axios.post(`${api}/meeting/increaseMeeting`, {...body}, {headers: {'Authorization': data}})

/**
 *@method GET
 *@desc 获取将要审核的会议申请的数据
 * */
export const getVerifyMeeting = (token) =>
  axios.get(`${api}/meeting/getVerifyMeeting`,{headers: {'Authorization': token}})


/**
 *@method POST
 *@desc 审核会议申请
 * */
export const verifyMeeting = (data,body) =>
  axios.post(`${api}/meeting/verifyMeeting`, {...body}, {headers: {'Authorization': data}})
