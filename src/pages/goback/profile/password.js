const {route, ui, utils, api} = require("../../../js/core");

route.add('/goback/profile/password', function (tpl) {
    ui.content(tpl);
    ui.focusNav(3)

    $('#form-profile-password').on('submit', function(e){
        e.preventDefault()
        let data = utils.formFields($(this).serializeArray())
        if (!data.re_password ||
            !data.new_password ||
            !data.old_password) {
            ui.error("请输入完整的信息");
            return false;
        }

        if (data.re_password !== data.new_password) {
            ui.error("两次输入密码不一致");
            return false;
        }
        delete data.re_password;
        api.request('goback.profile.password', data, function (rd) {
            ui.success("密码修改成功，请重新登录")
        });
        return false;
    });

});