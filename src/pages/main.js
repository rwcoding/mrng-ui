import {route, api, ui, utils, user} from "../js/core";
import initMenuEvent from "../js/event/menu";
import resizeWindow from "../js/event/window";

route.add("/main", function (html) {
    ui.app(html, {
        menus: [
            {
                name:"服务网关", tree:[
                    {name:"网关节点", sign:"mrng-menu-gw", link:"/mrng/gw/index"},
                    {name:"运行节点", sign:"mrng-menu-node", link:"/mrng/node/index"},
                    {name:"注册服务", sign:"mrng-menu-service", link:"/mrng/service/index"},
                ]
            },
            {
                name:"配置中心", tree:[
                    {name:"环境设置", sign:"mrng-menu-config-env", link:"/mrng/config/env/index"},
                    {name:"工程管理", sign:"mrng-menu-config-project", link:"/mrng/config/project/index"},
                    {name:"配置设置", sign:"mrng-menu-config-main", link:"/mrng/config/main/index"},
                    {name:"白名单", sign:"mrng-menu-config-white", link:"/mrng/config/white/index"},
                    {name:"日志", sign:"mrng-menu-config-log", link:"/mrng/config/log/index"},
                    {name:"缓存", sign:"mrng-menu-config-kv", link:"/mrng/config/kv/index"},
                ]
            },
            {
                name:"系统管理", tree:[
                    {name:"个人信息", sign:"gobui-menu-profile", link:"/goback/profile/index"},
                    {name:"角色管理", sign:"gobui-menu-role", link:"/goback/role/index"},
                    {name:"用户管理", sign:"gobui-menu-adminer", link:"/goback/adminer/index"},
                    {name:"权限管理", sign:"gobui-menu-permission", link:"/goback/permission/index"},
                    {name:"配置管理", sign:"gobui-menu-config", link:"/goback/config/index"},
                    {name:"日志管理", sign:"gobui-menu-log", link:"/goback/log/index"},
                    {name:"缓存管理", sign:"gobui-menu-cache", link:"/goback/cache/index"},
                    {name:"会话管理", sign:"gobui-menu-session", link:"/goback/session/index"},
                    {name:"批量赋权", sign:"gobui-menu-batch", link:"/goback/batch/index"},
                ]
            }
        ]
    })

    resizeWindow()
    initMenuEvent()

    $('#userProfileName').html(user.get().name)

    function toWhere() {
        let to = utils.parseURI().full;
        if (to !== "/" && to.substr(0,2) !== '/?') {
            route.to(to)
        } else {
            //默认页面
            route.to("/goback/profile/index")
        }
    }
    toWhere()

    window.addEventListener("popstate", function(e) {
        e.preventDefault()
        toWhere()
    }, false);
})