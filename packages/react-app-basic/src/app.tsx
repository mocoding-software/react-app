import * as React from "react";
import { HelmetWrapper, AppProps, Context } from "@mocoding/react-app-common/common";
import { App as InjectedApp } from "injected-app-entry";

export function createContext(): Context {
  return {};
}

export class App extends React.Component<AppProps> {
  public render(): React.ReactNode {
    return (
      <HelmetWrapper helmetContext={this.props.context.helmetContext}>
        <InjectedApp />
      </HelmetWrapper>
    );
  }
}
