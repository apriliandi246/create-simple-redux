import reducer from "./reducer.js";
import isPlainObject from "./utils/isPlainObj.js";

function createStore(reducer) {
   let state;
   let currentListeners = [];

   if (typeof reducer !== "function") {
      throw new Error("Expected the reducer to be a function");
   }

   return {
      getState() {
         return state;
      },

      dispatch(action) {
         if (isPlainObject(action) === false) {
            throw new Error("Actions must be plain objects");
         }

         if (typeof action.type === "undefined") {
            throw new Error(
               'Actions may not have an undefined "type" property'
            );
         }

         state = reducer(state, action);

         for (let i = 0; i < currentListeners.length; i++) {
            const listener = currentListeners[i];
            listener();
         }
      },

      subscribe(listener) {
         if (typeof listener !== "function") {
            throw new Error("Expected the listener to be a function.");
         }

         currentListeners.push(listener);

         return function unsubscribe() {
            currentListeners.splice(0);
         };
      },
   };
}

export default createStore(reducer);
