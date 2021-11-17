export default function mapData(data, map, sp) {
    if (!data) {
        return ""
    }
    let ret = ""
    if (!sp) {
        sp = "，"
    }
    let arr = data.split(",")
    for(let i in arr) {
        ret += map[arr[i]]
        if (i < arr.length - 1) {
            ret += sp
        }
    }
    return ret
}