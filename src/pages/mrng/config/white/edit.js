import {api, route, ui, utils} from "../../../../js/core";

route.add('/mrng/config/white/edit', function (tpl, params) {
    let dialog = ui.dialog(tpl, params, {title: "编辑白名单", area: "300px"})

    let id = params ? parseInt(params.id) : 0
    if (id) {
        api.request('mrng.config.white.info', {id: id}, function (rd) {
            ui.fill('#go-pop-form', rd.data)
        })
    }

    $('#go-pop-form').on('submit', function(e){
        e.preventDefault()
        let cmd = 'mrng.config.white.add'
        let data = utils.formFields($(this).serializeArray())
        if (id) {
            data.id = id
            cmd = 'mrng.config.white.edit'
        }
        api.request(cmd, data, function (rd) {
            ui.closeDialog(dialog)
            route.to('/mrng/config/white/index')
        });
    });
});