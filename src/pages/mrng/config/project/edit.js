import {api, route, ui, utils} from "../../../../js/core";

route.add('/mrng/config/project/edit', function (tpl, params) {
    let dialog = ui.dialog(tpl, params, {title: "编辑工程", area: "450px"})

    let id = params ? parseInt(params.id) : 0
    if (id) {
        api.request('mrng.config.project.info', {id: id}, function (rd) {
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
        let cmd = 'mrng.config.project.add'
        let data = utils.formFields($(this).serializeArray())
        if (id) {
            data.id = id
            cmd = 'mrng.config.project.edit'
        }
        data.ord = parseInt(data.ord)
        api.request(cmd, data, function (rd) {
            ui.closeDialog(dialog)
            route.to('/mrng/config/project/index')
        });
    });
});