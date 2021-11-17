import {api, route} from "../js/core";

route.add('/logout', function ($ele, params) {
    api.request('goback.login.logout', function (rd) {
        api.setSession("","")
        route.to("/login")
    })
});