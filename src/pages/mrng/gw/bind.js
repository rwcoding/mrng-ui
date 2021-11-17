import {route, ui, api, utils} from "../../../js/core";

function renderStatusTd(id, status) {
    if (status === 0) {
        return `<span class="text-danger">下架</span> `
    }
    return `<span>正常</span>`
}

function renderBindTd(nodeId, isBind) {
    if (!isBind) {
        return `<strong>----</strong> <button data-node="${nodeId}" data-to="bind" class="bind btn btn-secondary btn-sm ms-2">绑定</button>`
    }
    return `<strong class="text-success">已绑定</strong> <button data-node="${nodeId}" data-to="unbind" class="bind btn btn-danger btn-sm ms-2">解除</button>`
}

route.add('/mrng/gw/bind', function (tpl, params) {
    let spa = route.spa()
    ui.dialog(tpl, params, {title: `设置网关 <strong class="text-danger">${params.gname}</strong> 的节点`, area: "1000px", offset: '200px'})
    if (!params.size) {
        params.size = 100
    }
    if (!params.bind) {
        params.bind = 0
    }
    ui.fill('#gobui-pop-form', params)

    let page = params.page ? parseInt(params.page) : 1
    let gwId = params.id ? parseInt(params.id) : 1
    let pageSize = parseInt(params.size)
    let bind = parseInt(params.bind)
    let name = params.name ?? ""
    let addr = params.addr ?? ""

    function pullData() {
        api.request('mrng.gw.bind.query', {gw_id: gwId, page:page, page_size:pageSize, name: name, addr: addr, bind:bind}, function (rd) {
            spa.table('#gobui-pop-table')
                .col(`<label><input type="checkbox" class="select form-check-input me-2">ID</label>`, row => {
                    return `<label><input type="checkbox" class="form-check-input me-2" value="${row.id}">${row.id}</label>`
                })
                .col("名称", "name")
                .col("地址", "addr")
                .col("状态", row => {
                    return renderStatusTd(row.id, row.status)
                })
                .col("绑定", row => {
                    return renderBindTd(row.id,  rd.data.binds.findIndex( item => item === row.id) !== -1)
                })
                .render(rd.data.datas)

            spa.pager('#gobui-pop-pager').render(rd.data.count, rd.data.page_size, page, function (p) {
                page = p
                pullData()
            })
        })
    }
    pullData()

    let $table = $('#gobui-pop-table')
    let $form = $('#gobui-pop-form')

    $table.on('click', ".bind", function() {
        let isBind = $(this).data('to') === "bind" ? 1:0
        let nodeId = parseInt($(this).data("node"))
        let $this = $(this)
        api.request('mrng.gw.bind', {gw_id: gwId, is_bind:isBind, nodes:[nodeId]}, function (rd) {
            if (!rd.msg) {
                ui.success('操作成功')
            }
            $this.parent().html(renderBindTd(nodeId, isBind))
        })
    })

    $table.on('click', ".select", function() {
        if ($(this).prop("checked")) {
            $table.find('input:checkbox').prop("checked", true)
        } else {
            $table.find('input:checkbox').prop("checked", false)
        }
    })

    $form.on('click', ".bind", function() {
        let idList = []
        $table.find('input:checkbox').each(function() {
            if (!$(this).prop("checked")) {
                return
            }
            let nodeId = parseInt($(this).val())
            if (nodeId>0) {
                idList.push(nodeId)
            }
        })
        let isBind = $(this).data('to') === 'bind' ? 1:0
        if (idList.length === 0) {
            ui.error("您没有选择节点")
            return
        }
        api.request('mrng.gw.bind', {gw_id: gwId, is_bind:isBind, nodes:idList}, function (rd) {
            if (rd.data.delete === 0 && rd.data.insert === 0) {
                ui.success('什么也没做')
                return
            }
            if (!rd.msg) {
                ui.success('操作成功')
            }
            $table.find('input:checkbox').each(function() {
                if (!$(this).prop("checked")) {
                    return
                }
                let nodeId = parseInt($(this).val())
                if (nodeId > 0) {
                    $(this).parents('tr').find("td:eq(4)").html(renderBindTd(nodeId, isBind))
                }
            })
        })
    })

    $form.on('submit', function (e) {
        e.preventDefault()
        spa.resetPager('#gobui-pop-pager')
        page = 1
        pageSize = parseInt($('#gobui-pop-form select[name=size]').val())
        bind = parseInt($('#gobui-pop-form select[name=bind]').val())
        name = $('#gobui-pop-form input[name=name]').val().trim()
        addr = $('#gobui-pop-form input[name=addr]').val().trim()
        pullData()
    })
});
