const {route, api, ui, utils, transfer} = require("../../../js/core");

route.add('/goback/adminer/edit', function (tpl, params) {
    let statusNames = transfer.get('adminer_status_names')
    let roleNames = transfer.get('adminer_role_names')
    if (!params) params = {}
    params.statusNames = statusNames
    params.roleNames = roleNames
    let dialog = ui.dialog(tpl, params, {title: "编辑管理员", area: "500px"})

    let id = params ? parseInt(params.id) : 0
    if (id) {
        api.request('goback.adminer.info', {
            id: parseInt(params.id)
        }, function (rd) {
            ui.fill('#gobui-pop-form', rd.data, {
                is_super: function (ele) {
                    if (ele.val() === rd.data.is_super.toString()) {
                        ele.prop('checked', true)
                    }
                },
                roles: function (ele) {
                    if ((',' + rd.data.roles + ',').indexOf(',' + ele.val() + ',') !== -1) {
                        ele.prop('checked', true)
                    }
                },
                usernameUi: function (ele) {
                    ele.attr('disabled', 'disabled')
                }
            })
        })
    }

    $('#gobui-pop-form').on('submit', function (e) {
        e.preventDefault()
        let cmd = 'goback.adminer.add'
        let data = utils.formFields($(this).serializeArray())
        if (id) {
            data.id = id
            cmd = 'goback.adminer.edit'
        }
        let roles = ''
        $('input[name=roles]').each(function () {
            if ($(this).prop('checked')) {
                roles += ',' + $(this).val()
            }
        })
        data.roles = roles.substr(1)
        data.is_super = parseInt(data.is_super)
        data.status = parseInt(data.status)
        api.request(cmd, data, function (rd) {
            ui.closeDialog(dialog)
            route.to('/goback/adminer/index')
        });
        return false;
    });
});