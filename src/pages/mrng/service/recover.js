import {api, route} from "../../../js/core";

route.add('/mrng/service/recover', function ($ele, params) {
    api.request('mrng.service.recover', {id:parseInt(params.id)}, function (rd) {
        if (!rd.msg) {
            ui.success('恢复成功')
        }
        $ele.attr('href', `@mrng/service/delete?id=${params.id}`).attr('class', 'btn-danger btn-sm btn').html("删除")
    })
});