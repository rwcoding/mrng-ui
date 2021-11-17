const {route, ui, user, utils} = require("../../../js/core");

route.add('/goback/profile/index', function (tpl, query) {
    ui.main(tpl);
    ui.focusMenu('gobui-menu-profile')

    if (query['to'] === "password") {
        route.to("/goback/profile/password")
        return;
    } else if (query['to'] === "edit") {
        route.to("/goback/profile/edit")
        return;
    }

    ui.focusNav(1)

    let adminer = user.get()
    ui.fill(adminer, {
        roles: function () {
            return utils.mapData(adminer.roles, adminer.role_names)
        },
        status: function () {
            return utils.mapData(adminer.status.toString(), adminer.status_names)
        },
        statusUi: function (ele) {
            if (adminer.status === 1) {
                ele.addClass("text-success")
            } else {
                ele.addClass("text-danger")
            }
        },
    })
});