import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import reducer from "./reducers";
// import { checkForExpiredToken } from "./redux/actions";
//After defining the store use the following code to call checkForExpiredToken

// Actions
import { fetchAuthors, fetchBooks, checkForExpiredToken } from "./actions";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));
store.dispatch(checkForExpiredToken());
store.dispatch(fetchAuthors());
store.dispatch(fetchBooks());

export default store;
