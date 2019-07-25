import React, { Component } from "react";
import AppContainer from "./src/navigator";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import rootStore from "./src/stores";
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const store = createStore(rootStore, applyMiddleware(thunk));
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    );
  }
}
