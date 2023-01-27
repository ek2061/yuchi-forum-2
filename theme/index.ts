import { extendTheme } from "@chakra-ui/react";

const breakpoints = {
  sm: "576px",
  md: "768px",
  lg: "960px",
  xl: "1200px",
  "2xl": "1536px",
};

const styles = {
  global: () => ({
    html: {
      "*::-webkit-scrollbar": {
        width: "5px",
        height: "5px",
      },
      "*::-webkit-scrollbar-track": {
        webkitBorderRadius: "10px",
        borderRadius: "10px",
        margin: "0",
      },
      "*::-webkit-scrollbar-thumb": {
        webkitBorderRadius: "4px",
        borderRadius: "4px",
        background: "#737476",
      },
    },
  }),
};

const overrides = {
  breakpoints,
  styles,
};

export default extendTheme(overrides);
