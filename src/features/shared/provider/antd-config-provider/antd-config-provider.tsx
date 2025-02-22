import { ConfigProvider } from "antd";
import { PropsWithChildren } from "react";
import { themeConfig } from "./theme-config";

export const AntdConfigProvider = ({ children }: PropsWithChildren) => (
  <ConfigProvider theme={themeConfig}>{children}</ConfigProvider>
);
