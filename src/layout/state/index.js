import React, { createContext, useReducer, useContext } from "react";
import reducer from "./reducers";

// const customMiddleware = store => next => action => {
//   console.log("Action Triggered");
//   console.log(action);
//   next(action);
// };

const Store = createContext();

// const compose = (...funcs) => x =>
//   funcs.reduceRight((composed, f) => f(composed), x);

const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, reducer({}, {}));

  // if (typeof middlewares !== "undefined") {
  //   // return middlewares(createStore)(reducer, initialState);
  //   const middlewareAPI = {
  //     getState: () => state,
  //     dispatch: action => dispatch(action)
  //   };
  //   const chain = middlewares.map(middleware => middleware(middlewareAPI));
  //   const enhancedDispatch = compose(...chain)(dispatch);
  //   return { state, dispatch: enhancedDispatch };
  // }

  const store = { state, dispatch };

  return <Store.Provider value={store}>{children}</Store.Provider>;
};

const connect = (
  mapStateToProps = () => {},
  mapDispatchToProps = {}
) => WrappedComponent => {
  return props => {
    const { dispatch, state } = useContext(Store);
    const dispatchProps = {};
    for (const key in mapDispatchToProps) {
      dispatchProps[key] = args => dispatch(mapDispatchToProps[key](args));
    }
    return (
      <WrappedComponent
        {...mapStateToProps(state, props)}
        {...dispatchProps}
        {...props}
      />
    );
  };
};

export { connect, Store, Provider };
