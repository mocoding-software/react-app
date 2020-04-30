import * as React from "react";
import { Helmet } from "react-helmet-async";

import { connect } from "react-redux";
import { ApplicationState } from "./store";

interface AppProps {
  counter: number;
}
interface AppDispatch {
  increment: () => void;
  decrement: () => void;
}

class AppInternal extends React.Component<AppProps & AppDispatch, ApplicationState> {
  public render(): JSX.Element {
    return (
      <div>
        <Helmet>
          <title>Redux Example</title>
        </Helmet>
        Counter: {this.props.counter}
        <p>
          <button onClick={this.props.increment}>Increment</button>
          <button onClick={this.props.decrement}>Decrement</button>
        </p>
      </div>
    );
  }
}

const App = connect<AppProps, AppDispatch, {}, ApplicationState>(
  (state) => ({
    counter: state.counter,
  }),
  (dispatch) => ({
    decrement: (): void => {
      dispatch({ type: "DECREMENT" });
    },
    increment: (): void => {
      dispatch({ type: "INCREMENT" });
    },
  }),
)(AppInternal);

export { App };
