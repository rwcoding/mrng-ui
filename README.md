# MRNG网关管理面板及一个简单地配置中心

## 构建前端
> 前后端分离模式，前端采用 bootstrap5，**因此它不支持IE浏览器**  

### 依赖
```
npm i -g parcel
npm i -g @rwcoding/mcss
```

### 运行
```
cd web
npm install
mcss
```

### 构建
```
cd web
mcss build
node build.js
```
> 构建结果在 `tmp/dist` 目录下  
> 同时复制一份到 `../mrng-api/static` 目录下，**如果没有请手动复制**