import React from "react";
import ReactDOM from "react-dom/client";
import createCache from '@emotion/cache';
import { CacheProvider } from "@emotion/react";

import App from './App'

export const muiCache = createCache({
    'key': 'mui',
    'prepend': true,
  });

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <React.StrictMode>
        <CacheProvider value={muiCache}>
            <App/>
        </CacheProvider>
  </React.StrictMode>
)