import React from "react";
import { createRoot } from "react-dom/client";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { createLogger } from "redux-logger";

import App from "./App/App";
import reducer from "./reducers";
import { thunk } from "redux-thunk";

const middleware = [thunk];

if (import.meta.env.MODE !== "production") {
  middleware.push(createLogger());
}

const store = createStore(reducer, applyMiddleware(...middleware));

const root = createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>,
);
