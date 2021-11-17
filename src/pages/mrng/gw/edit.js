import {api, route, ui, utils} from "../../../js/core";

route.add('/mrng/gw/edit', function (tpl, params) {
    let dialog = ui.dialog(tpl, params, {title: "编辑网关", area: "430px"})

    let id = params ? parseInt(params.id) : 0
    if (id) {
        api.request('mrng.gw.info', {id: id}, function (rd) {
            ui.fill('#go-pop-form', rd.data, {
                addr: function ($ele) {
                    $ele.attr("disabled",true)
                    return rd.data.addr
                }
            })
            //$('#go-pop-form').find(`:radio[value=${rd.data.status}]`).prop('checked', true)
        })
    }

    $('#go-pop-form').on('submit', function(e){
        e.preventDefault()
        let cmd = 'mrng.gw.add'
        let data = utils.formFields($(this).serializeArray())
        if (id) {
            data.id = id
            cmd = 'mrng.gw.edit'
        }
        //data.status = parseInt(data.status)
        data.weight = parseInt(data.weight)
        api.request(cmd, data, function (rd) {
            ui.closeDialog(dialog)
            route.to('/mrng/gw/index')
        });
    });
});