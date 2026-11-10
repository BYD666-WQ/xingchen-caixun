# index.html 改动流程（存档纪律）

1. **改前备份**：复制 `index.html` → `backups/YYYYMMDD-HHMM-index.html`，随同提交进仓库
2. **本地断言**：`shot-view.mjs` + 断言脚本（390 视口：scrollW=390、关键区块存在、行数/格数正确、无破图）
3. **推送**：`deploy_api.py --files ...`（一次 dispatch；数据任务占用引用时先暂停）
4. **线上复核**：同一断言跑线上 `?v=<ts>`，通过才算完成
5. **回滚**：异常时用最近一份 `backups/*-index.html` 恢复后重新部署
6. **保留**：最近 10 份备份，超出删除最旧
<!-- race 1794349220400 -->
