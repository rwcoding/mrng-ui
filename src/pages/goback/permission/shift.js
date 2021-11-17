const {route, api, ui, transfer, utils} = require("../../../js/core");

route.add('/goback/permission/shift', function (tpl, params) {
    params.groups = transfer.get("permission_groups")
    let dialog = ui.dialog(tpl, params, {title: "分组调整", area: "430px"})

    $('#gobui-pop-form').on('submit', function(e){
        e.preventDefault()
        let data = utils.formFields($(this).serializeArray())
        data.gid = parseInt(data.gid)
        api.request('goback.permission.shift', data, function (rd) {
            ui.closeDialog(dialog)
            route.to('/goback/permission/index')
        });
        return false;
    });
});