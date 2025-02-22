import { ThemeConfig } from "antd";

export const themeConfig: ThemeConfig = {
    token: {
        colorPrimary: "#2148C0",
    },
    components: {
        Input: {
            colorBgContainer: "transparent",
            hoverBorderColor: "#FFFFFF",
            activeBorderColor: "#FFFFFF",
            colorTextPlaceholder: "#FFFFFF",
            colorText: "#FFFFFF",
            borderRadiusLG: 5,
        },
        Button: {
            borderRadiusLG: 5,
            borderColorDisabled: "transparent",
            colorBgContainerDisabled: "#264ECA",
        }
    }
}