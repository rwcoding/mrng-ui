const {route, ui, api, utils} = require("../../../js/core");

route.add('/goback/role/permission', function (tpl, params) {
    let roleId = parseInt(params.id)
    api.request('goback.acl.role.query', {role_id:roleId}, function (rd) {
        let data = rd.data;
        let gps = {}
        let own = ''
        for(let i in data.permissions) {
            let gid = data.permissions[i]['gid']
            if (!gps[gid]) {
                gps[gid] = []
            }
            gps[gid].push(data.permissions[i])
        }
        for (let i in data.permissions_have) {
            own += ',' + data.permissions_have[i]['permission']
        }

        ui.main(tpl, {
            groups: data.groups,
            gps: gps,
            name: params.name,
            own: own
        });


        ui.focusNav(1)
        ui.focusMenu('gobui-menu-role')
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
            let permissions = ""
            if (data.permission) {
                permissions = typeof data.permission === "string" ? data.permission : data.permission.join(",")
            }
            api.request('goback.acl.role.set', {
                role_id: roleId,
                permissions: permissions,
            }, function (rd) {

            });
            return false;
        });
    }
});