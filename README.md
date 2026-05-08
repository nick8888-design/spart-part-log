# Spare Parts Log

一个手机网页 App，给办公设备技术员每天记录备件领用，月底自动统计。

**功能**
- 拍照 OCR 自动识别表单（基于 Google Cloud Vision）
- 智能记忆物料名/客户名/型号，下次自动建议
- 月度统计：按物料、按客户、按型号
- CSV 导出，给老板看
- PWA 支持，可"添加到主屏幕"当 App 用，离线也能查记录

---

## 部署到 GitHub Pages（5 分钟）

1. **创建仓库**
   - 在 GitHub 点 New Repository
   - 名字随便起，例如 `parts-log`
   - 设为 **Public**
   - 创建

2. **上传文件**

   把以下两个文件上传到仓库根目录：

   - `index.html`（就是 `spare-parts-log.html` 改名而来）
   - `sw.js`

   操作：仓库页面 → Add file → Upload files → 拖入两个文件 → Commit changes

   > ⚠️ 上传前记得把 `spare-parts-log.html` 改名成 `index.html`

3. **启用 Pages**
   - Settings → Pages
   - Source 选 "Deploy from a branch"
   - Branch 选 `main` / `(root)` → Save
   - 等 1~2 分钟

4. **打开**

   你的网址会是：
   ```
   https://你的用户名.github.io/parts-log/
   ```

5. **手机加到主屏幕**
   - Safari：分享按钮 → 添加到主屏幕
   - Chrome：菜单 → 添加到主屏幕 / 安装应用

---

## 配置 OCR

第一次打开后：

1. 进 [Google Cloud Console](https://console.cloud.google.com)
2. 新建项目 → 启用 Cloud Vision API
3. 凭据 → 创建 API Key → 复制
4. 在 App 里：设置 → 粘贴 API Key → 保存

每月 1000 次免费，自用足够。

---

## 注意事项

- **API Key 仅存于本地浏览器**，不上传任何地方
- **数据存于本地 IndexedDB**，换设备需用"导出 JSON 备份"+"导入"
- **仓库公开但无敏感信息**，因为 API Key 是用户自己填的
- **离线可用**：除 OCR 步骤外，新增、查看、统计都能离线工作
