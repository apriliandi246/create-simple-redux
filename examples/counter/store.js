function createStore(reducer) {
   let state = 0;
   let currentListener = [];

   if (typeof reducer !== "function") {
      throw new Error("Expected the reducer to be a function");
   }

   return {
      getState() {
         return state;
      },

      dispath(action) {
         if (typeof action.type === "undefined") {
            throw new Error(
               'Actions may not have an undefined "type" property'
            );
         }

         state = reducer(state, action);

         for (let i = 0; i < currentListener.length; i++) {
            const listener = currentListener[i];
            listener();
         }
      },

      subscribe(listener) {
         if (typeof listener !== "function") {
            throw new Error("Expected the listener to be a function.");
         }

         currentListener.push(listener);

         return function unsubscribe() {
            currentListener.splice(0);
         };
      },
   };
}
