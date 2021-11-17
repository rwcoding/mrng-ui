const {route, ui, api, utils} = require("../../../js/core");

route.add('/goback/role/edit', function (tpl, params) {
    let dialog = ui.dialog(tpl, params, {title: "编辑角色", area: "430px"})

    let id = params ? parseInt(params.id) : 0
    if (id) {
        api.request('goback.role.info', {id}, function (rd) {
            ui.fill('#gobui-pop-form', rd.data)
        })
    }

    $('#gobui-pop-form').on('submit', function(e){
        e.preventDefault()
        let data = utils.formFields($(this).serializeArray())
        let cmd = 'goback.role.add'
        if (id) {
            data.id = id
            cmd = 'goback.role.edit'
        }
        api.request(cmd, data, function (rd) {
            ui.closeDialog(dialog)
            route.to('/goback/role/index')
        });
    });
});