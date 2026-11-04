import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import { RouterProvider } from 'react-router-dom'
import router from './router'
import { Provider } from 'react-redux'
import store from './store'
import 'normalize.css'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // React.StrictMode 严格模式，用于在 开发环境 中检测潜在问题的辅助工具
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
