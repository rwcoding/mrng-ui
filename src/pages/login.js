import {route, api, ui, user} from "../js/core";

route.add("/login", function (html) {
    ui.app(html)

    let _id = localStorage.getItem("imgId");
    let imgId = _id === null ? "" : _id;

    function setImgId(id) {
        if (imgId !== id) {
            imgId = id
            localStorage.setItem("imgId", imgId);
        }
    }

    let $captcha   = $('#captchaImage');
    let $username  = $('#username');
    let $password2 = $('#password2');
    let $code      = $('#code');
    let $error     = $('#error');

    //获取验证码
    $captcha.on('click', function () {
        api.request("goback.login.captcha", {type: "login", img_id: imgId}, function (rd) {
            $captcha.attr('src', rd.data.img)
            setImgId(rd.data.img_id)
        });
    });

    let isUsername = null,
        isPassword = null,
        isCode = null;

    function verifyUsername() {
        isUsername = true;
        let value = $username.val();
        if (!/^[@\w_]{5,20}$/i.test(value)) {
            $error.find('span').eq(0).html('用户名无效 ');
            isUsername = false;
        } else {
            $error.find('span').eq(0).html('');
        }
    }

    function verifyPassword() {
        isPassword = true;
        let value = $password2.val();
        if (!/^[a-zA-Z0-9`~!-@#$%^&*()_+|{}\[\];':"<>?,.\/]{5,20}$/.test(value)) {
            $error.find('span').eq(1).html('密码无效 ');
            isPassword = false;
        } else {
            $error.find('span').eq(1).html('');
        }
    }

    function verifyCode() {
        isCode = true;
        let value = $code.val();
        if (!/^[A-Za-z0-9]{4}$/.test(value)) {
            $error.find('span').eq(2).html('验证码无效 ');
            isCode = false;
        } else {
            $error.find('span').eq(2).html('');
        }
    }

    $username.on('blur', function () {
        verifyUsername();
    });
    $password2.on('blur', function () {
        verifyPassword();
    });
    $code.on('blur', function () {
        verifyCode();
    });

    let doing = false;
    $('#form-login').on('submit', function (e) {
        e.preventDefault()
        if (doing) {
            return false;
        }
        doing = true;
        verifyUsername();
        verifyPassword();
        verifyCode();
        if (!isUsername || !isPassword || !isCode) {
            doing = false;
            return false;
        } else {
            api.request("goback.login", {
                type: "password",
                username: $username.val(),
                password: md5($password2.val()),
                code: $code.val(),
                img_id: imgId,
            }, function (rd) {
                api.setSession(rd.data.session_id, rd.data.session_key)
                ui.success("登录成功")
                user.init(() => { route.to("/main") })
            },function (){
                doing = false
                $captcha.click();
            })
        }
        return false
    });

    $captcha.click();
})