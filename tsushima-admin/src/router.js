import Vue from "vue"
import Router from "vue-router"

import routes from "./common/config/router.js"

Vue.use(Router)
// 捕获连续push同一个path发生的报错异常
// const originalPush = Router.prototype.push
// Router.prototype.push = function push(location) {
//    return originalPush.call(this, location).catch(err => err)
// }
export default new Router({
    routes, 
})