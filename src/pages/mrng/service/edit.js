import {api, route, ui, utils} from "../../../js/core";

route.add('/mrng/service/edit', function (tpl, params) {
    let dialog = ui.dialog(tpl, params, {title: "编辑服务", area: "430px"})

    let id = params ? parseInt(params.id) : 0
    if (id) {
        api.request('mrng.service.info', {id: id}, function (rd) {
            ui.fill('#go-pop-form', rd.data, {
                sign: function ($ele) {
                    $ele.attr("disabled",true)
                    return rd.data.sign
                }
            })
        })
    }

    $('#go-pop-form').on('submit', function(e){
        e.preventDefault()
        let cmd = 'mrng.service.add'
        let data = utils.formFields($(this).serializeArray())
        if (id) {
            data.id = id
            cmd = 'mrng.service.edit'
        }
        data.status = parseInt(data.status)
        api.request(cmd, data, function (rd) {
            ui.closeDialog(dialog)
            route.to('/mrng/service/index')
        });
    });
});