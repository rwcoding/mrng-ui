export const formFields = function(data) {
    let ret = {}
    data.forEach(function (v) {
        let o = ret[v.name]
        if (o) {
            if (typeof o != "object") {
                ret[v.name] = [o]
            }
            ret[v.name].push(v.value);
        } else {
            ret[v.name] = v.value
        }
    })
    return ret
}