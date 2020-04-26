import axios from 'axios'
import config from './default'
const api = config.port

axios.create({
  baseURL: "api",//服务端地址
  withCredentials: true
})


/**
 *@method GET
 *@desc 获取用户的消息列表
 * */
export const getMyMessage = (token) =>
  axios.get(`${api}/message/getMyMessage`,{headers: {'Authorization': token}})

/**
 *@method POST
 *@desc 增加公告
 * */
export const deleteMessage = (data,body) =>
  axios.post(`${api}/message/deleteMessage`, {...body}, {headers: {'Authorization': data}})
