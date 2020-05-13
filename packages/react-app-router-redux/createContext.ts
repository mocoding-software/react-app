import { connectRouter, RouterState, LocationChangeAction } from "connected-react-router";
import { routerMiddleware } from "connected-react-router";
import { createBrowserHistory, History } from "history";
import * as Redux from "redux";
import { Context } from "@mocoding/react-app-common";

import { middlewares, reducers, onParseInitialState } from "injected-app-entry/store";
import devMiddlewares from "@mocoding/react-app-router-redux/middlewares";

export interface ReduxRouterState {
  // Allows any extra properties to be defined in an action.
  [extraProps: string]: unknown;
  router: RouterState<unknown>;
}

function createRootReducer<TState extends ReduxRouterState>(
  history: History<unknown>,
  appReducers: Redux.Reducer[],
): Redux.Reducer<TState> {
  // https://github.com/reduxjs/redux/pull/3679
  // Once the issue is fixed - we may remove casting to any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const reducersMap: any = {
    ...appReducers,
    router: connectRouter(history),
  };
  return Redux.combineReducers<TState, Redux.AnyAction>(reducersMap);
}

function configureStore<TState extends ReduxRouterState>(
  history: History<unknown>,
  initialState?: Redux.PreloadedState<TState>,
): Redux.Store<TState, Redux.AnyAction> {
  // Create reducers from root
  const rootReducers = createRootReducer<TState>(history, reducers);

  // Adding logger and router to middlewares
  const isSsr = typeof window === "undefined";
  const defaultMiddlewares: Redux.Middleware[] = !isSsr ? devMiddlewares : [];
  defaultMiddlewares.push(routerMiddleware(history));

  const pipeline = Redux.applyMiddleware(...defaultMiddlewares, ...middlewares);

  // create store
  const store = Redux.createStore(rootReducers, initialState, Redux.compose(pipeline));

  if (module.hot) {
    module.hot.accept(["injected-app-entry/store"], () => {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const newStore = require("injected-app-entry/store");
      const nextReducer = createRootReducer<TState>(history, newStore.reducers);

      store.replaceReducer(nextReducer);
    });
  }

  return store;
}

function parseState<T>(serialized: string): T {
  return onParseInitialState ? onParseInitialState(serialized) : JSON.parse(serialized);
}

export function createContext(abstractHistory?: History): Context {
  const initialState: ReduxRouterState | undefined =
    typeof window === "undefined" ||
    typeof (window as any).__PRELOADED_STATE__ === "undefined"
      ? undefined
      : parseState<ReduxRouterState>((window as any)?.__PRELOADED_STATE__);
  const history = abstractHistory ?? createBrowserHistory();
  return {
    history,
    store: configureStore(history, initialState),
  };
}
