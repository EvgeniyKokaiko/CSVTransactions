import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { compose, createStore } from "redux";
import { applyMiddleware } from "redux";
import reducers from "./redux/reducers/reducers";
import { ChakraProvider } from "@chakra-ui/react";

//@ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

function MainApp() {
  return (
    <Provider store={store}>
      <ChakraProvider>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </ChakraProvider>
    </Provider>
  );
}

ReactDOM.render(<MainApp />, document.getElementById("root"));