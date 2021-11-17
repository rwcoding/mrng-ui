export const app = function (html, data) {
    $('#gobui-app').html(template.compile(html)(data))
}

export const main = function (html, data) {
    $('#gobui-main').html(template.compile(html)(data))
}

export const content = function (html, data) {
    $('#gobui-content').html(template.compile(html)(data))
}

export const dialog = function (html, data, options) {
    let config = {
        content: template.compile(html)(data),
        btn: false,
    }
    if (options) {
        for (let i in options) {
            config[i] = options[i]
        }
    }
    return layer.open(config)
}

export const closeDialog = function (dialog) {
    layer.close(dialog)
}

export const success = function(msg) {
    let html = `<div class="alert alert-success w-50 m-auto mt-2 shadow-lg fw-bold" role="alert">${msg}</div>`
    let $ele = $(html).appendTo('body')
    setTimeout(function () {
        $ele.hide()
    }, 1500)
}

export const error =  function(msg) {
    let html = `<div class="alert alert-danger w-50 m-auto mt-2 shadow-lg fw-bold" role="alert">${msg}</div>`
    let $ele = $(html).appendTo('body')
    setTimeout(function () {
        $ele.hide()
    }, 1500)
}

export const focusNav = function(ord) {
    $('.links').find('a').removeClass('hover')
    $('.links > a').eq(ord-1).addClass("hover")
}

export const focusMenu = function(sign) {
    let $ele = $('#gobui-menu').find(`.${sign}`)
    if (!$ele.hasClass('active')) {
        $ele.prevAll("dt").click()
        $('#gobui-menu').find(`.${sign}`).addClass('active')
    }
}

export const fill = function (ele, data, functions) {
    let e;
    if (typeof ele === "string") {
        e = $(ele)
    } else {
        e = $('#gobui-content')
        functions = data
        data = ele
    }
    e.find(".gobui-bind").each(function () {
        let v = $(this).data('bind')
        let vUi = $(this).data('bind')+"Ui"
        let ret;
        if (functions && functions[v]) {
            ret = functions[v]($(this))
        } else {
            if (typeof data[v] === 'undefined') {
                if (functions && functions[vUi]) {
                    functions[vUi]($(this))
                }
                return
            }
            ret = data[v]
        }
        let tag = $(this).get(0).tagName.toLowerCase()
        if (tag === 'input' ||
            tag === 'textarea' ||
            tag === 'select') {
            let type = $(this).attr('type')
            if (type === 'checkbox' || type === 'radio') {

            } else {
                $(this).val(ret)
            }
        } else {
            $(this).html(ret)
        }
        if (functions && functions[vUi]) {
            functions[vUi]($(this))
        }
    })
}

export const datatable = function ($el, options) {
    let ops = {
        data: options.data,
        ordering: false,
        searching: false,
        lengthChange: false,
        paging: false,
        info: false,
        retrieve: true,
        language: {
            "info":           "_START_ 到 _END_ 总数：_TOTAL_",
            "infoEmpty":      "",
            "paginate": {
                "first":      "首页",
                "last":       "尾页",
                "next":       "下一页",
                "previous":   "上一页"
            },
            "emptyTable": "没有数据",
        },
        columns: options.columns,
    }
    return $el.DataTable(ops)
}

export const pager = function ($el, options) {
    if (options.total <= 0) {
        return
    }
    let pages = options.total % options.size > 0 ? (options.total / options.size + 1) : options.total / options.size
    return $el.twbsPagination({
        totalPages: pages,
        visiblePages: options.size ?? 10,
        initiateStartPageClick: false,
        startPage: options.current ?? 1,
        prev:"上一页",
        next:"下一页",
        first:"首页",
        last:"尾页",
        onPageClick: function (event, page) {
            options.callback(page)
        }
    });
}

$.datetimepicker.setLocale('zh');
export const datepicker = function(selector, options) {
    if (!options) {
        options = {}
    }
    options.timepicker = options.timepicker ?? false
    options.format = options.format ?? 'Y-m-d'

    $(selector).datetimepicker(options);
}