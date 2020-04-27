
import * as React from "react";
import { HelmetWrapper, AppProps } from "@mocoding/react-app-common";

// @ts-ignore
import InjectedAppModule from "injected-app-entry";

export class App extends React.Component<AppProps> {
  public render(): React.ReactNode {
    return (
      <HelmetWrapper helmetContext={this.props.context.helmetContext}>
        <InjectedAppModule />
      </HelmetWrapper>
    );
  }
}
