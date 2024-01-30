import { createContext, useState, useMemo } from "react";
import { createTheme } from "@mui/material/styles";
import { colors } from "@mui/material";

//colour design tokens
export const tokens = (mode) => ({
  ...(mode === "dark"
    ? {
        grey: {
          100: "#e0e0e0",
          200: "#c2c2c2",
          300: "#a3a3a3",
          400: "#858585",
          500: "#666666",
          600: "#525252",
          700: "#3d3d3d",
          800: "#292929",
          900: "#141414",
        },
        primary: {
          100: "#d1cdd4",
          200: "#a39ba9",
          300: "#75687f",
          400: "#0F0716",
          500: "#190B25",
          600: "#140321",
          700: "#0f0219",
          800: "#0a0210",
          900: "#050108",
        },
        greenAccent: {
          100: "#dbf1d1",
          200: "#b7e4a2",
          300: "#94d674",
          400: "#70c945",
          500: "#4cbb17",
          600: "#3d9612",
          700: "#2e700e",
          800: "#1e4b09",
          900: "#0f2505",
        },
        redAccent: {
          100: "#ffcccc",
          200: "#ff9999",
          300: "#ff6666",
          400: "#ff3333",
          500: "#ff0000",
          600: "#cc0000",
          700: "#990000",
          800: "#660000",
          900: "#330000",
        },
        blueAccent: {
          100: "#e1e2fe",
          200: "#c3c6fd",
          300: "#a4a9fc",
          400: "#868dfb",
          500: "#6870fa",
          600: "#535ac8",
          700: "#3e4396",
          800: "#2a2d64",
          900: "#151632",
        },
      }
    : {
        grey: {
          100: "#141414",
          200: "#292929",
          300: "#3d3d3d",
          400: "#525252",
          500: "#666666",
          600: "#858585",
          700: "#a3a3a3",
          800: "#c2c2c2",
          900: "#e0e0e0",
        },
        primary: {
          100: "#050108",
          200: "#0a0210",
          300: "#0f0219",
          400: "#D5ABF7",
          500: "#190429",
          600: "#473654",
          700: "#75687f",
          800: "#a39ba9",
          900: "#d1cdd4",
        },
        greenAccent: {
          100: "#0f2505",
          200: "#1e4b09",
          300: "#2e700e",
          400: "#3d9612",
          500: "#4cbb17",
          600: "#70c945",
          700: "#94d674",
          800: "#b7e4a2",
          900: "#dbf1d1",
        },
        redAccent: {
          100: "#330000",
          200: "#660000",
          300: "#990000",
          400: "#cc0000",
          500: "#ff0000",
          600: "#ff3333",
          700: "#ff6666",
          800: "#ff9999",
          900: "#ffcccc",
        },
        blueAccent: {
          100: "#151632",
          200: "#2a2d64",
          300: "#3e4396",
          400: "#535ac8",
          500: "#6870fa",
          600: "#868dfb",
          700: "#a4a9fc",
          800: "#c3c6fd",
          900: "#e1e2fe",
        },
      }),
});

// mui theme settings
export const themeSettings = (mode) => {
  const colors = tokens(mode);

  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
            primary: {
              main: colors.primary[500],
            },
            secondary: {
              main: colors.greenAccent[500],
            },
            neutral: {
              dark: colors.grey[700],
              main: colors.grey[500],
              light: colors.grey[100],
            },
            background: {
              default: colors.primary[500],
            },
          }
        : {
            primary: {
              main: colors.primary[100],
            },
            secondary: {
              main: colors.greenAccent[500],
            },
            neutral: {
              dark: colors.grey[700],
              main: colors.grey[500],
              light: colors.grey[100],
            },
            background: {
              default: "#fcfcfc",
            },
          }),
    },
    typography: {
      fontFamily: ["Source sans 3", "sans-serif"].join(","),
      fontSize: 12,
      h1: {
        fontFamily: ["Source sans 3", "sans-serif"].join(","),
        fontSize: 40,
      },
      h2: {
        fontFamily: ["Source sans 3", "sans-serif"].join(","),
        fontSize: 32,
      },
      h3: {
        fontFamily: ["Source sans 3", "sans-serif"].join(","),
        fontSize: 24,
      },
      h4: {
        fontFamily: ["Source sans 3", "sans-serif"].join(","),
        fontSize: 20,
      },
      h5: {
        fontFamily: ["Source sans 3", "sans-serif"].join(","),
        fontSize: 16,
      },
      h6: {
        fontFamily: ["Source sans 3", "sans-serif"].join(","),
        fontSize: 14,
      },
    },
  };
};

//react context for the color mode
export const colorModeContext = createContext({
  toggleColorMode: () => {},
});

export const useMode = () => {
  const [mode, setMode] = useState("light");

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () =>
        setMode((prev) => (prev === "light" ? "dark" : "light")),
    }),
    []
  );
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return [theme, colorMode];
};
