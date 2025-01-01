import { extendTheme, ThemeConfig } from "@chakra-ui/react";
import { GlobalStyleProps } from "@chakra-ui/theme-tools";

const colors = {
  brand: {
    50: "#FFFFFF",  // Light Green
    100: "#E3EDD7", // Lighter Green
    200: "#D1FB6E", // Neon Green
    300: "#FAF3DE", // Light Yellow
    400: "#EDB827", // Yellow
    500: "#70CBD8", // Teal
    600: "#C56B24", // Brown
    700: "#DB224B", // Red
    800: "#152C23", // Dark Green
  },
  gray: {
    50: "#FFFFFF",
    100: "#EDF2F7",
    200: "#E2E8F0",
    300: "#CBD5E0",
    400: "#A0AEC0",
    500: "#718096",
    600: "#4A5568",
    700: "#2D3748",
    800: "#1A202C",
    900: "#171923",
  },
};

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  colors,
  styles: {
    global: (props: GlobalStyleProps) => ({
      body: {
        bg: props.colorMode === "dark" ? colors.brand[800] : colors.brand[50],
        color: props.colorMode === "dark" ? colors.brand[50] : colors.brand[800],
      },
    }),
  },
});

export default theme;