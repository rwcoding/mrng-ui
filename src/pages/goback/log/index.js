import {api, route, ui, utils} from "../../../js/core";

route.add('/goback/log/index', function (tpl, params) {
    let spa = route.spa()

    ui.main(tpl, params);
    ui.focusNav(1)
    ui.focusMenu('gobui-menu-log')
    ui.datepicker('input[name=start], input[name=end]')
    ui.fill('#gobui-form', params)

    let type = params.type ? parseInt(params.type) : 0
    let start = params.start ?? ''
    let end = params.end ?? ''
    let page = parseInt(params.page ? params.page : 1)
    let pageSize = 10

    api.request('goback.log.list', {
        page,
        page_size: pageSize,
        type,
        start,
        end,
    }, function (rd) {
        spa.table()
            .col("ID", "id")
            .col("类型", row => rd.data.type_names[row.type])
            .col("消息", "msg")
            .col("IP", "ip")
            .col("时间", row => utils.date("Y-m-d H:i:s", row.created_at))
            .col("操作", row => `<a href="/goback/log/view?id=${row.id}" class="btn btn-sm btn-info">详情</a>`)
            .render(rd.data.datas)

        spa.pager().render(rd.data.count, rd.data.page_size, page)

        $('select[name=type]').append(utils.options(rd.data.type_names)).val(type)
    })

    $('#gobui-form').on('submit', function (e) {
        e.preventDefault()
        route.hashParams({
            type: parseInt($('select[name=type]').val()),
            start: $('input[name=start]').val().trim(),
            end: $('input[name=end]').val().trim(),
            page: 1
        })
    })
});