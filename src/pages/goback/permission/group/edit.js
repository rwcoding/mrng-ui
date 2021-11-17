const {route, api, ui, utils} = require("../../../../js/core");

route.add('/goback/permission/group/edit', function (tpl, params) {
    let dialog = ui.dialog(tpl, params, {title: "编辑配置", area: "430px"})

    let id = params ? parseInt(params.id) : 0

    if (id) {
        api.request('goback.permission.group.info', {
            id: id
        }, function (rd) {
            ui.fill('#gobui-pop-form', rd.data)
        })
    }

    $('#gobui-pop-form').on('submit', function(e){
        e.preventDefault()
        let cmd = 'goback.permission.group.add'
        let data = utils.formFields($(this).serializeArray())
        if (id) {
            data.id = id
            cmd = 'goback.permission.group.edit'
        }
        data.ord = parseInt(data.ord)
        api.request(cmd, data, function (rd) {
            ui.closeDialog(dialog)
            route.to('/goback/permission/group/index')
        });
    });
});