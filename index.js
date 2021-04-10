import store from "./store.js";
import * as actions from "./actions.js";

const unsubscribe = store.subscribe(() => {
   console.log("State Changed");
});

store.dispatch(actions.bugAdded("Bug 1"));
store.dispatch(actions.bugRemoved(1));

unsubscribe();

store.dispatch(actions.bugAdded("Bug 2"));
store.dispatch(actions.bugResolved(2));

console.log(store.getState());
