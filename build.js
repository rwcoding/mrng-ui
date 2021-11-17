const path = require("path");
const fs = require("fs");
const fse = require("fs-extra");
const process = require("child_process")
const htmlMinify = require('html-minifier-terser').minify

const libSrc = path.join(__dirname, "lib")
const tmpPath = path.join(__dirname, "tmp")
const distSrc = path.join(tmpPath, "build")
const distTarget = path.join(tmpPath, "dist")
let taskCheck = 0

if(!fs.existsSync(tmpPath)) {
    fs.mkdir(tmpPath, (err) => { console.log(`create path ${tmpPath}`) })
}
if(!fs.existsSync(distSrc)) {
    fs.mkdir(distSrc, (err) => { console.log(`create path ${distSrc}`) })
}
if(!fs.existsSync(distTarget)) {
    fs.mkdir(distTarget, (err) => { console.log(`create path ${distTarget}`) })
}
fse.emptyDirSync(distTarget)

//执行mcss构建
const config = path.join(__dirname, "mcss.yaml")
const webCmd = `mcss build --conf ${config}`
process.exec(webCmd)

//复制库文件
fse.copySync(libSrc, path.join(distTarget, "lib"), {})
console.log('copy lib done.');

//复制构建的js css
fse.copySync(distSrc, distTarget, {})
console.log('copy build done.');

//生成模板
let tpl = require("./tmp/mcss.html.json")
let ret = {}
let num = 0
let size = Object.keys(tpl).length
for (let i in tpl ) {
    (async (i) => {
        ret[i] = await htmlMinify(tpl[i], {
            collapseWhitespace: true,
            removeAttributeQuotes: false,
        });
        num += 1
        if (num >= size) {
            //合并模板和构建文件
            let file = path.join(distTarget, "index.js")
            const tJs = "window.$templates="+JSON.stringify(ret)+";"
            const indexJs = fs.readFileSync(path.join(distSrc, "index.js"), "utf8").toString()
            fs.writeFile(file, tJs+indexJs, { encoding: 'utf8' }, err => {})
            taskCheck ++
        }
    })(i)
}

String.prototype.replaceAll  = function(s1,s2){
    return this.replace(new RegExp(s1,"gm"),s2);
}

fse.copySync(path.join(__dirname, "build/favicon.ico"), path.join(distTarget, "favicon.ico"), {})

let indexContent = fs.readFileSync(path.join(__dirname, "build/index.template.html"), "utf8").toString()
    .replaceAll("@static", "").replaceAll("@api", "/api");

(async () => {
    let compressHtml = await htmlMinify(indexContent, {
        collapseWhitespace: true,
        removeAttributeQuotes: false,
    });
    fs.writeFile(path.join(distTarget, "index.html"), compressHtml, { encoding: 'utf8' }, err => { taskCheck ++ })
})();

//fs.writeFile(path.join(distTarget, "index.html"), indexContent, { encoding: 'utf8' }, err => {})
console.log("waiting ....")
let timer = setInterval(function () {
    if (taskCheck >= 2) {
        fse.copySync(distTarget, path.join(__dirname, "../mrng-api/static"), {})
        console.log('copy to api/static done.');
        console.log("done.")
        clearInterval(timer)
    }
}, 500)
