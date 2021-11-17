import {api, route, ui, utils} from "../../../js/core";

route.add('/goback/batch/index', function (tpl, params) {
    api.request('goback.acl.batch.query', function (rd) {
        let data = rd.data;
        let gps = {}
        for(let i in data.permissions) {
            let gid = data.permissions[i]['gid']
            if (!gps[gid]) {
                gps[gid] = []
            }
            gps[gid].push(data.permissions[i])
        }
        ui.main(tpl, {
            roles: data.roles,
            groups: data.groups,
            gps: gps
        });
        ui.focusNav(1)
        ui.focusMenu('gobui-menu-batch')
        set()

        $('.gobui-permission').on('click', '.selectAll', function() {
            let isToSelect = !$(this).data('select')
            if (isToSelect) {
                $(this).parent().next('td').find('input[type=checkbox]').prop('checked', true)
                $(this).data('select', true)
            } else {
                $(this).parent().next('td').find('input[type=checkbox]').prop('checked', false)
                $(this).data('select', false)
            }
        })
    })

    function set() {
        $('#gobui-form-permission').on('submit', function(e){
            e.preventDefault()
            let data = utils.formFields($(this).serializeArray())
            let type = parseInt(data.type)
            let roles = ""
            let permissions = ""
            if (data.role) {
                roles = typeof data.role === "string" ? data.role : data.role.join(",")
            }
            if (data.permission) {
                permissions = typeof data.permission === "string" ? data.permission : data.permission.join(",")
            }
            api.request('goback.acl.batch.set', {
                type: type,
                roles: roles,
                permissions: permissions
            }, function (rd) {
                route.to('/goback/batch/index')
            });
            return false;
        });
    }
});