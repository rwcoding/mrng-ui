const {route, ui, user, utils, api} = require("../../../js/core");

route.add('/goback/profile/edit', function (tpl) {
    ui.content(tpl);
    ui.focusNav(2)

    ui.fill(user.get())

    $('#form-profile-edit').on('submit', function(e){
        e.preventDefault()
        let data = utils.formFields($(this).serializeArray())
        api.request('goback.profile.edit', data, function (rd) {
            user.update('name', data.name)
            user.update('phone', data.phone)
        });
        return false;
    });
});