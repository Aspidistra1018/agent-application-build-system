import './main.less';

import { createRoot } from 'react-dom/client';

import DevApp from './App';

const rootEl = document.createElement('div');
rootEl.setAttribute('className', 'coze-chat-sdk');
document.body.append(rootEl);

const root = createRoot(rootEl);
root.render(<DevApp />);
