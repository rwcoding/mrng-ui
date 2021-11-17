const {route, ui, api, transfer, utils} = require("../../../js/core");

route.add('/goback/permission/edit', function (tpl, params) {
    params.groups = transfer.get("permission_groups")
    params.types = transfer.get("permission_types")

    let dialog = ui.dialog(tpl, params, {title: "编辑配置", area: "430px"})

    let id = params.id ? parseInt(params.id) : 0

    if (id) {
        api.request('goback.permission.info', {
            id: id
        }, function (rd) {
            ui.fill('#gobui-pop-form', rd.data)
        })
    }

    $('#gobui-pop-form').on('submit', function(e){
        e.preventDefault()
        let cmd = 'goback.permission.add'
        let data = utils.formFields($(this).serializeArray())
        if (id) {
            data.id = id
            cmd = 'goback.permission.edit'
        }
        data.gid = parseInt(data.gid)
        data.type = parseInt(data.type)
        api.request(cmd, data, function (rd) {
            ui.closeDialog(dialog)
            route.to('/goback/permission/index')
        });
    });
});