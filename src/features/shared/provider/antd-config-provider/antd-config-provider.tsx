import { App, ConfigProvider } from "antd";
import { PropsWithChildren } from "react";
import { themeConfig } from "./theme-config";

export const AntdConfigProvider = ({ children }: PropsWithChildren) => (
  <App>
    <ConfigProvider theme={themeConfig}>{children}</ConfigProvider>
  </App>
);
