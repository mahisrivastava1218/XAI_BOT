// No need to import BorderColor – removing it
// Generates a custom theme based on the selected mode (light/dark)

export const getThemePallete = (mode) => ({
  palette: {
    mode, // light or dark mode

    ...(mode === "light"
      ? {
          // Light mode theme colors
          primary: {
            main: "#D7C7F4",
            light: "#ffffff",
            dark: "#AF9FCD",
            bglight: "#fafafa",
            bgtheme: "#FAF7FF",
            bg: "#AF9FCD",
          },
          text: {
            primary: "#000000",
            secondary: "rgba(0, 0, 0, 0.5)",
          },
        }
      : {
          // Dark mode theme colors
          primary: {
            main: "#34303d",
            light: "#3d3b41",
            dark: "#2a2730",
            bglight: "#212025",
            bgtheme: "#212025",
            bg: "#2a2730",
          },
          text: {
            primary: "#ffffff",
            secondary: "rgba(255, 255, 255, 0.7)",
          },
        }),
  },

  typography: {
    // Default text style
    body1: {
      fontFamily: "Open Sans, sans-serif",
    },
    // Headings
    h1: {
      fontFamily: "Ubuntu, sans-serif",
      color: mode === "light" ? "#9785BA" : "#D7C7F4",
      fontSize: 28,
      fontWeight: 700,
    },
    h2: {
      fontFamily: "Ubuntu, sans-serif",
      color: "text.primary",
      fontSize: 28,
      fontWeight: 500,
      "@media (max-width:600px)": {
        fontSize: 22,
      },
    },
    heading: {
      fontFamily: "Ubuntu, sans-serif",
    },
  },

  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
        size: "large",
      },
      styleOverrides: {
        root: {
          textTransform: "none",
          fontFamily: "Open Sans, sans-serif",
        },
        contained: {
          fontFamily: "Ubuntu, sans-serif",
          border: 1,
        },
        outlined: {
          fontFamily: "Ubuntu, sans-serif",
          color: mode === "light" ? "#000" : "#fff",
          borderColor: mode === "light" ? "#9785BA" : "#3d3b41",
          "&:hover": {
            backgroundColor: mode === "light" ? "#AF9FCD" : "#2a2730",
          },
        },
      },
    },
  },

  // Custom breakpoints for responsive design
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});
