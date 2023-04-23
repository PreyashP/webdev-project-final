import { createTheme } from "@mui/material/styles";

export const themeModes = {
  dark: "dark",
};

const themeConfigs = {
  custom: ({ mode }) => {
    const customPalette = {
      // Button Colors (Top bar, Movie Genre, etc.)
      primary: {
        main: "#7D00BD",
        contrastText: "#ffffff"
      },
      // Logo second Color 'Media'
      secondary: {
        main: "#7D00BD",
        contrastText: "#ffffff"
      },
      // Background Color Main
      background: {
        default: "#0E0120",
        // top and bottom bar post scrolling color
        paper: "#131313"
      }
    };

    return createTheme({
      palette: {
        mode,
        ...customPalette
      },
      components: {
        MuiButton: {
          defaultProps: { disableElevation: true }
        }
      }
    });
  }
};

export default themeConfigs;
