function reducer(state = 0, action) {
   switch (action.type) {
      case "INCREMENT":
         return state + (1 + action.defaultValue);

      case "DECREMENT":
         return state - (1 + action.defaultValue);

      default:
         return state + action.defaultValue;
   }
}
