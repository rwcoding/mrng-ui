import {api, route, ui, utils} from "../../../js/core";

route.add('/mrng/node/edit', function (tpl, params) {
    let dialog = ui.dialog(tpl, params, {title: "编辑节点", area: "430px"})

    let id = params ? parseInt(params.id) : 0
    if (id) {
        api.request('mrng.node.info', {id: id}, function (rd) {
            ui.fill('#go-pop-form', rd.data, {
                addr: function ($ele) {
                    $ele.attr("disabled",true)
                    return rd.data.addr
                }
            })
        })
    }

    $('#go-pop-form').on('submit', function(e){
        e.preventDefault()
        let cmd = 'mrng.node.add'
        let data = utils.formFields($(this).serializeArray())
        if (id) {
            data.id = id
            cmd = 'mrng.node.edit'
        }
        data.weight = parseInt(data.weight)
        api.request(cmd, data, function (rd) {
            ui.closeDialog(dialog)
            route.to('/mrng/node/index')
        });
    });
});