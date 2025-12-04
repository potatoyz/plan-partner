/**
 * 文件名: src/main.tsx
 * 描述: 应用入口文件
 * 变更日志:
 * 2025-11-28: 初始化入口，引入全局样式
 */

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './styles/globals.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)