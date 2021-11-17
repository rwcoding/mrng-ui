//引入样式
import "./less/login.less"
import "./less/header.less"
import "./less/form.less"
import "./less/main.less"
import "./less/menu.less"
import "./less/nav.less"
import "./less/table.less"

//路由
import "./pages/login"
import "./pages/logout"
import "./pages/main"
import "./pages/goback/module"
import "./pages/mrng/module"

//页面UI绑定事件
import "./js/event/link"
import "./js/event/window"

import {route, user} from "./js/core"

//重定义模板定界符 [[ ----- ]]
//template.defaults.rules[0].test = /<%(#?)((?:==|=#|[=-])?)[ \t]*([\w\W]*?)[ \t]*(-?)%>/;
template.defaults.rules[1].test = /\[\[([@#]?)[ \t]*(\/?)([\w\W]*?)[ \t]*\]\]/;

//获取用户信息，失败自动跳入登录界面，成功进入主界面
user.init(() => { route.to("/main") })