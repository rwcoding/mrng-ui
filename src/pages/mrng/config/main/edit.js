import {api, route, ui, utils, transfer} from "../../../../js/core";

route.add('/mrng/config/main/edit', function (tpl, params) {
    params.envNames = transfer.get('config_env_names')
    params.projectNames = transfer.get('config_project_names')

    let dialog = ui.dialog(tpl, params, {title: "编辑配置", area: "450px"})

    let id = params ? parseInt(params.id) : 0
    if (id) {
        api.request('mrng.config.main.info', {id: id}, function (rd) {
            ui.fill('#go-pop-form', rd.data, {
                k: function ($ele) {
                    $ele.attr("disabled",true)
                    return rd.data.k
                },
                status: function (ele) {
                    if (ele.val() === rd.data.status.toString()) {
                        ele.prop('checked', true)
                    }
                },
            })
        })
    } else {
        //$('#go-pop-form').find(':radio[value=1]').prop("checked", true)
    }

    $('#go-pop-form').on('submit', function(e){
        e.preventDefault()
        let cmd = 'mrng.config.main.add'
        let data = utils.formFields($(this).serializeArray())
        if (id) {
            data.id = id
            cmd = 'mrng.config.main.edit'
        }
        data.status = parseInt(data.status)
        api.request(cmd, data, function (rd) {
            ui.closeDialog(dialog)
            route.to('/mrng/config/main/index')
        });
    });
});