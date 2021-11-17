import {api, route, ui, utils} from "../../../js/core";

route.add('/goback/config/edit', function (tpl, params) {
    let dialog = ui.dialog(tpl, params, {title: "编辑配置", area: "430px"})

    let id = params ? parseInt(params.id) : 0
    if (id) {
        api.request('goback.config.info', {id: id}, function (rd) {
            ui.fill('#go-pop-form', rd.data)
        })
    }

    $('#go-pop-form').on('submit', function(e){
        e.preventDefault()
        let cmd = 'goback.config.add'
        let data = utils.formFields($(this).serializeArray())
        if (id) {
            data.id = id
            cmd = 'goback.config.edit'
        }
        api.request(cmd, data, function (rd) {
            ui.closeDialog(dialog)
            route.to('/goback/config/index')
        });
    });
});