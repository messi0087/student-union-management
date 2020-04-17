import axios from 'axios'
import config from './default'
const api = config.port

axios.create({
  baseURL: "api",//服务端地址
  withCredentials: true
})


/**
 *@method GET
 *@desc 获取用户的数据
 * */
export const getAnnouncement = () =>
  axios.get(`${api}/announcement/getAnnouncement`)

/**
 *@method POST
 *@desc 增加公告
 * */
export const increaseAnnouncement = (data,body) =>
  axios.post(`${api}/announcement/increaseAnnouncement`, {...body}, {headers: {'Authorization': data}})
