export default function(data) {
    let html = ""
    for (let i in data) {
        html += "<option value=\""+i+"\">"+data[i]+"</option>"
    }
    return html
}