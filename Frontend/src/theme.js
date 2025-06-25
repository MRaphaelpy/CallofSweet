import { createTheme, alpha } from "@mui/material/styles";

const colorPalette = {
  light: {
    primary: {
      main: "#7c4dff",
      light: "#b47cff",
      dark: "#3f1dcb",
      contrastText: "#ffffff",
      50: "#f3e5f5",
      100: "#e1bee7",
      200: "#ce93d8",
      300: "#ba68c8",
      400: "#ab47bc",
      500: "#7c4dff",
      600: "#6200ea",
      700: "#5502c0",
      800: "#4a00a0",
      900: "#3700b3",
      A100: "#d9c2ff",
      A200: "#b388ff",
      A400: "#7c4dff",
      A700: "#651fff",
    },
    secondary: {
      main: "#aa00ff",
      light: "#e254ff",
      dark: "#7200ca",
      contrastText: "#ffffff",
      50: "#f3e5f5",
      100: "#e1bee7",
      200: "#ce93d8",
      300: "#ba68c8",
      400: "#ab47bc",
      500: "#9c27b0",
      600: "#8e24aa",
      700: "#7b1fa2",
      800: "#6a1b9a",
      900: "#4a148c",
      A100: "#ea80fc",
      A200: "#e040fb",
      A400: "#d500f9",
      A700: "#aa00ff",
    },
    success: {
      main: "#00c853",
      light: "#69f0ae",
      dark: "#00923f",
      contrastText: "#ffffff",
    },
    info: {
      main: "#9c27b0",
      light: "#d05ce3",
      dark: "#6a0080",
      contrastText: "#ffffff",
    },
    warning: {
      main: "#ffab00",
      light: "#ffdd4b",
      dark: "#c67c00",
      contrastText: "rgba(0, 0, 0, 0.87)",
    },
    error: {
      main: "#d50000",
      light: "#ff5131",
      dark: "#9b0000",
      contrastText: "#ffffff",
    },
  },
  dark: {
    primary: {
      main: "#b388ff",
      light: "#e7b9ff",
      dark: "#805acb",
      contrastText: "rgba(0, 0, 0, 0.87)",
      50: "#f3e5f5",
      100: "#e1bee7",
      200: "#ce93d8",
      300: "#ba68c8",
      400: "#ab47bc",
      500: "#9c27b0",
      600: "#8e24aa",
      700: "#7b1fa2",
      800: "#6a1b9a",
      900: "#4a148c",
      A100: "#d9c2ff",
      A200: "#b388ff",
      A400: "#7c4dff",
      A700: "#651fff",
    },
    secondary: {
      main: "#ea80fc",
      light: "#ffb2ff",
      dark: "#b64fc8",
      contrastText: "rgba(0, 0, 0, 0.87)",
      50: "#f3e5f5",
      100: "#e1bee7",
      200: "#ce93d8",
      300: "#ba68c8",
      400: "#ab47bc",
      500: "#9c27b0",
      600: "#8e24aa",
      700: "#7b1fa2",
      800: "#6a1b9a",
      900: "#4a148c",
      A100: "#ea80fc",
      A200: "#e040fb",
      A400: "#d500f9",
      A700: "#aa00ff",
    },
    success: {
      main: "#69f0ae",
      light: "#9fffe0",
      dark: "#2bbd7e",
      contrastText: "rgba(0, 0, 0, 0.87)",
    },
    info: {
      main: "#d05ce3",
      light: "#ffa9ff",
      dark: "#9c27b0",
      contrastText: "rgba(0, 0, 0, 0.87)",
    },
    warning: {
      main: "#ffdd4b",
      light: "#ffff7e",
      dark: "#c8aa00",
      contrastText: "rgba(0, 0, 0, 0.87)",
    },
    error: {
      main: "#ff5131",
      light: "#ff867c",
      dark: "#c50000",
      contrastText: "rgba(0, 0, 0, 0.87)",
    },
  },
};


const transitions = {
  easing: {
    
    easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
    easeOut: "cubic-bezier(0.0, 0, 0.2, 1)",
    easeIn: "cubic-bezier(0.4, 0, 1, 1)",
    sharp: "cubic-bezier(0.4, 0, 0.6, 1)",
    
    elegant: "cubic-bezier(0.25, 0.8, 0.25, 1)",
    
    bounce: "cubic-bezier(0.34, 1.56, 0.64, 1)",
  },
  duration: {
    shortest: 150,
    shorter: 200,
    short: 250,
    standard: 300,
    complex: 375,
    enteringScreen: 225,
    leavingScreen: 195,
  },
};


const generateElevation = (mode) => {
  const baseColor = mode === "light" ? "103, 58, 183" : "183, 136, 255"; 
  const opacity = mode === "light" ? 0.14 : 0.2;

  return Array(25)
    .fill(0)
    .map((_, index) => {
      const elevation = index + 1;
      const y = elevation * 0.5;
      const blur = elevation * 2;
      return `0px ${y}px ${blur}px rgba(${baseColor}, ${
        opacity * (elevation / 24)
      })`;
    });
};


export function createAppTheme(mode) {
  
  const colors = colorPalette[mode];
  const shadows = generateElevation(mode);

  return createTheme({
    palette: {
      mode,
      primary: colors.primary,
      secondary: colors.secondary,
      success: colors.success,
      error: colors.error,
      warning: colors.warning,
      info: colors.info,
      background: {
        default: mode === "light" ? "#f8f9fa" : "#121212",
        paper: mode === "light" ? "#ffffff" : "#1e1e1e",
        subtle: mode === "light" ? "#f7f2ff" : "#2c2835", 
        contrast: mode === "light" ? "#eee5f7" : "#352e40", 
      },
      text: {
        primary:
          mode === "light"
            ? "rgba(0, 0, 0, 0.87)"
            : "rgba(255, 255, 255, 0.87)",
        secondary:
          mode === "light" ? "rgba(0, 0, 0, 0.6)" : "rgba(255, 255, 255, 0.6)",
        disabled:
          mode === "light"
            ? "rgba(0, 0, 0, 0.38)"
            : "rgba(255, 255, 255, 0.38)",
        hint:
          mode === "light"
            ? "rgba(0, 0, 0, 0.38)"
            : "rgba(255, 255, 255, 0.38)",
      },
      divider:
        mode === "light"
          ? "rgba(103, 58, 183, 0.12)"
          : "rgba(183, 136, 255, 0.12)", 
      action: {
        active:
          mode === "light" ? "rgba(0, 0, 0, 0.54)" : "rgba(255, 255, 255, 0.7)",
        hover:
          mode === "light"
            ? "rgba(103, 58, 183, 0.04)"
            : "rgba(183, 136, 255, 0.08)", 
        hoverOpacity: 0.08,
        selected:
          mode === "light"
            ? "rgba(103, 58, 183, 0.08)"
            : "rgba(183, 136, 255, 0.16)", 
        selectedOpacity: 0.16,
        disabled:
          mode === "light" ? "rgba(0, 0, 0, 0.26)" : "rgba(255, 255, 255, 0.3)",
        disabledBackground:
          mode === "light"
            ? "rgba(0, 0, 0, 0.12)"
            : "rgba(255, 255, 255, 0.12)",
        disabledOpacity: 0.38,
        focus:
          mode === "light"
            ? "rgba(103, 58, 183, 0.12)"
            : "rgba(183, 136, 255, 0.12)", 
        focusOpacity: 0.12,
        activatedOpacity: 0.12,
      },
    },
    typography: {
      fontFamily: [
        "Poppins", 
        "-apple-system",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        "Roboto",
        '"Helvetica Neue"',
        "Arial",
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(","),
      h1: {
        fontWeight: 700,
        fontSize: "2.5rem",
        lineHeight: 1.2,
        letterSpacing: "-0.01562em",
      },
      h2: {
        fontWeight: 700,
        fontSize: "2rem",
        lineHeight: 1.2,
        letterSpacing: "-0.00833em",
      },
      h3: {
        fontWeight: 600,
        fontSize: "1.75rem",
        lineHeight: 1.3,
        letterSpacing: "0em",
      },
      h4: {
        fontWeight: 600,
        fontSize: "1.5rem",
        lineHeight: 1.35,
        letterSpacing: "0.00735em",
      },
      h5: {
        fontWeight: 600,
        fontSize: "1.25rem",
        lineHeight: 1.4,
        letterSpacing: "0em",
      },
      h6: {
        fontWeight: 600,
        fontSize: "1rem",
        lineHeight: 1.5,
        letterSpacing: "0.0075em",
      },
      subtitle1: {
        fontWeight: 500,
        fontSize: "1rem",
        lineHeight: 1.5,
        letterSpacing: "0.00938em",
      },
      subtitle2: {
        fontWeight: 500,
        fontSize: "0.875rem",
        lineHeight: 1.57,
        letterSpacing: "0.00714em",
      },
      body1: {
        fontWeight: 400,
        fontSize: "1rem",
        lineHeight: 1.5,
        letterSpacing: "0.00938em",
      },
      body2: {
        fontWeight: 400,
        fontSize: "0.875rem",
        lineHeight: 1.43,
        letterSpacing: "0.01071em",
      },
      button: {
        fontWeight: 500,
        fontSize: "0.875rem",
        lineHeight: 1.75,
        letterSpacing: "0.02857em",
        textTransform: "none", 
      },
      caption: {
        fontWeight: 400,
        fontSize: "0.75rem",
        lineHeight: 1.66,
        letterSpacing: "0.03333em",
      },
      overline: {
        fontWeight: 500,
        fontSize: "0.75rem",
        lineHeight: 2.66,
        letterSpacing: "0.08333em",
        textTransform: "uppercase",
      },
    },
    shape: {
      borderRadius: 10, 
    },
    transitions: transitions,
    shadows: shadows,
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          "@global": {
            "@font-face": [
              {
                fontFamily: "Poppins",
                fontStyle: "normal",
                fontWeight: 400,
                src: `url(https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap)`,
                fontDisplay: "swap",
              },
            ],
          },
          html: {
            WebkitFontSmoothing: "antialiased",
            MozOsxFontSmoothing: "grayscale",
            boxSizing: "border-box",
          },
          "*, *::before, *::after": {
            boxSizing: "inherit",
            transition:
              "background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
          },
          body: {
            margin: 0,
            color:
              mode === "light"
                ? "rgba(0, 0, 0, 0.87)"
                : "rgba(255, 255, 255, 0.87)",
            backgroundColor: mode === "light" ? "#f8f9fa" : "#121212",
            scrollbarColor:
              mode === "dark" ? "#6e42c1 #2b2b2b" : "#9c27b0 #f5f5f5",
            "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
              backgroundColor: mode === "dark" ? "#2b2b2b" : "#f5f5f5",
              width: "10px",
              height: "10px",
              borderRadius: "5px",
            },
            "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
              borderRadius: "10px",
              backgroundColor: mode === "dark" ? "#6e42c1" : "#9c27b0",
              minHeight: 24,
              border:
                mode === "dark" ? "3px solid #2b2b2b" : "3px solid #f5f5f5",
            },
            "&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus":
              {
                backgroundColor: mode === "dark" ? "#8e68d0" : "#ac47c0",
              },
            "&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active":
              {
                backgroundColor: mode === "dark" ? "#8e68d0" : "#ac47c0",
              },
            "&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover":
              {
                backgroundColor: mode === "dark" ? "#8e68d0" : "#ac47c0",
              },
            "&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner": {
              backgroundColor: mode === "dark" ? "#2b2b2b" : "#f5f5f5",
            },
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: "none",
            borderRadius: 10,
            fontWeight: 500,
            boxShadow: "none",
            transition: "all 0.25s cubic-bezier(0.25, 0.8, 0.25, 1)",
            "&:hover": {
              transform: "translateY(-2px)",
              boxShadow:
                mode === "light"
                  ? "0 4px 12px rgba(103, 58, 183, 0.25)"
                  : "0 4px 12px rgba(183, 136, 255, 0.3)",
            },
            "&:active": {
              transform: "translateY(0)",
              boxShadow: "none",
            },
          },
          
          contained: {
            background:
              mode === "light"
                ? "linear-gradient(45deg, #673ab7 30%, #9c27b0 90%)"
                : "linear-gradient(45deg, #7e57c2 30%, #b39ddb 90%)",
            "&:hover": {
              background:
                mode === "light"
                  ? "linear-gradient(45deg, #5e35b1 30%, #8e24aa 90%)"
                  : "linear-gradient(45deg, #7048b0 30%, #9575cd 90%)",
              boxShadow:
                mode === "light"
                  ? "0 6px 12px rgba(103, 58, 183, 0.3)"
                  : "0 6px 12px rgba(183, 136, 255, 0.4)",
            },
          },
          outlined: {
            borderWidth: "2px",
            borderColor: colors.primary.main,
            "&:hover": {
              borderWidth: "2px",
              borderColor: colors.primary.dark,
              backgroundColor:
                mode === "light"
                  ? "rgba(103, 58, 183, 0.08)"
                  : "rgba(183, 136, 255, 0.12)",
            },
          },
          text: {
            "&:hover": {
              backgroundColor:
                mode === "light"
                  ? "rgba(103, 58, 183, 0.08)"
                  : "rgba(183, 136, 255, 0.12)",
              transform: "none",
              boxShadow: "none",
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 16,
            transition:
              "transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)",
            overflow: "hidden",
            "&:hover": {
              transform: "translateY(-8px)",
              boxShadow:
                mode === "light"
                  ? "0 14px 28px rgba(103, 58, 183, 0.18), 0 10px 10px rgba(103, 58, 183, 0.12)"
                  : "0 14px 28px rgba(0, 0, 0, 0.4), 0 10px 10px rgba(0, 0, 0, 0.3)",
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: "none",
            transition: "box-shadow 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)",
          },
          elevation1: {
            boxShadow:
              mode === "light"
                ? "0 1px 3px rgba(103, 58, 183, 0.12), 0 1px 2px rgba(103, 58, 183, 0.24)"
                : "0 1px 3px rgba(0, 0, 0, 0.5), 0 1px 2px rgba(0, 0, 0, 0.7)",
          },
          elevation2: {
            boxShadow:
              mode === "light"
                ? "0 2px 4px rgba(103, 58, 183, 0.12), 0 2px 3px rgba(103, 58, 183, 0.2)"
                : "0 2px 4px rgba(0, 0, 0, 0.5), 0 2px 3px rgba(0, 0, 0, 0.7)",
          },
          elevation4: {
            boxShadow:
              mode === "light"
                ? "0 4px 6px rgba(103, 58, 183, 0.15), 0 2px 4px rgba(103, 58, 183, 0.12)"
                : "0 4px 6px rgba(0, 0, 0, 0.5), 0 2px 4px rgba(0, 0, 0, 0.7)",
          },
        },
      },
      MuiDialog: {
        styleOverrides: {
          paper: {
            borderRadius: 20,
            boxShadow:
              mode === "light"
                ? "0 24px 38px rgba(103, 58, 183, 0.14), 0 9px 46px rgba(103, 58, 183, 0.12), 0 11px 15px rgba(103, 58, 183, 0.2)"
                : "0 24px 38px rgba(0, 0, 0, 0.7), 0 9px 46px rgba(0, 0, 0, 0.9), 0 11px 15px rgba(0, 0, 0, 0.95)",
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            boxShadow:
              mode === "light"
                ? "0 2px 4px rgba(103, 58, 183, 0.1)"
                : "0 2px 4px rgba(0, 0, 0, 0.5)",
            backgroundImage:
              mode === "light"
                ? "linear-gradient(to right, #673ab7, #9c27b0)"
                : "linear-gradient(to right, #4a338a, #7b1fa2)",
          },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            transition:
              "transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1), background-color 0.2s cubic-bezier(0.25, 0.8, 0.25, 1)",
            "&:hover": {
              transform: "scale(1.15)",
              backgroundColor:
                mode === "light"
                  ? "rgba(103, 58, 183, 0.08)"
                  : "rgba(183, 136, 255, 0.12)",
            },
          },
        },
      },
      MuiSwitch: {
        styleOverrides: {
          root: {
            width: 42,
            height: 26,
            padding: 0,
            "& .MuiSwitch-switchBase": {
              padding: 0,
              margin: 2,
              transitionDuration: "300ms",
              "&.Mui-checked": {
                transform: "translateX(16px)",
                color: "#fff",
                "& + .MuiSwitch-track": {
                  backgroundColor: colors.primary.main,
                  opacity: 1,
                  border: 0,
                },
                "&.Mui-disabled + .MuiSwitch-track": {
                  opacity: 0.5,
                },
              },
              "&.Mui-disabled .MuiSwitch-thumb": {
                color:
                  mode === "light"
                    ? "rgba(255, 255, 255, 0.8)"
                    : "rgba(0, 0, 0, 0.8)",
              },
              "&.Mui-disabled + .MuiSwitch-track": {
                opacity: mode === "light" ? 0.7 : 0.3,
              },
            },
            "& .MuiSwitch-thumb": {
              boxSizing: "border-box",
              width: 22,
              height: 22,
              boxShadow:
                "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)",
              transition: "all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)",
            },
            "& .MuiSwitch-track": {
              borderRadius: 26 / 2,
              backgroundColor:
                mode === "light"
                  ? "rgba(103, 58, 183, 0.38)"
                  : "rgba(183, 136, 255, 0.38)",
              opacity: 1,
              transition:
                "background-color 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)",
            },
          },
        },
      },
      MuiFormControlLabel: {
        styleOverrides: {
          root: {
            transition: "all 0.2s cubic-bezier(0.25, 0.8, 0.25, 1)",
          },
        },
      },
      MuiInput: {
        styleOverrides: {
          root: {
            transition: "border 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)",
          },
          underline: {
            "&:before": {
              borderBottomColor:
                mode === "light"
                  ? "rgba(103, 58, 183, 0.38)"
                  : "rgba(183, 136, 255, 0.38)",
            },
            "&:hover:not(.Mui-disabled):before": {
              borderBottomColor:
                mode === "light"
                  ? "rgba(103, 58, 183, 0.6)"
                  : "rgba(183, 136, 255, 0.6)",
            },
            "&.Mui-focused:after": {
              borderBottomColor: colors.primary.main,
            },
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            transition: "all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)",
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor:
                mode === "light"
                  ? "rgba(103, 58, 183, 0.5)"
                  : "rgba(183, 136, 255, 0.5)",
              borderWidth: "1px",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: colors.primary.main,
              borderWidth: "2px",
            },
          },
          notchedOutline: {
            transition: "all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)",
            borderRadius: 10,
            borderColor:
              mode === "light"
                ? "rgba(103, 58, 183, 0.23)"
                : "rgba(183, 136, 255, 0.23)",
          },
        },
      },
      MuiTabs: {
        styleOverrides: {
          root: {
            borderRadius: 10,
            overflow: "hidden",
            backgroundColor:
              mode === "light"
                ? "rgba(103, 58, 183, 0.05)"
                : "rgba(183, 136, 255, 0.05)",
          },
          indicator: {
            height: 4,
            borderTopLeftRadius: 4,
            borderTopRightRadius: 4,
            background:
              mode === "light"
                ? "linear-gradient(to right, #673ab7, #9c27b0)"
                : "linear-gradient(to right, #7e57c2, #ba68c8)",
            transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
          },
        },
      },
      MuiTab: {
        styleOverrides: {
          root: {
            textTransform: "none",
            fontWeight: 500,
            transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
            borderRadius: 4,
            "&:hover": {
              backgroundColor:
                mode === "light"
                  ? "rgba(103, 58, 183, 0.05)"
                  : "rgba(183, 136, 255, 0.08)",
              transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1) 0ms",
              color: colors.primary.main,
            },
            "&.Mui-selected": {
              fontWeight: 600,
              color: colors.primary.main,
            },
          },
        },
      },
      MuiList: {
        styleOverrides: {
          root: {
            padding: 8,
          },
        },
      },
      MuiListItem: {
        styleOverrides: {
          root: {
            borderRadius: 10,
            transition: "all 0.25s cubic-bezier(0.25, 0.8, 0.25, 1)",
            "&:hover": {
              backgroundColor:
                mode === "light"
                  ? "rgba(103, 58, 183, 0.05)"
                  : "rgba(183, 136, 255, 0.08)",
            },
          },
          button: {
            "&:hover": {
              transform: "translateX(4px)",
            },
          },
        },
      },
      MuiFab: {
        styleOverrides: {
          root: {
            background:
              mode === "light"
                ? "linear-gradient(45deg, #673ab7 30%, #9c27b0 90%)"
                : "linear-gradient(45deg, #7e57c2 30%, #b39ddb 90%)",
            boxShadow:
              mode === "light"
                ? "0 3px 5px rgba(103, 58, 183, 0.3), 0 2px 2px rgba(103, 58, 183, 0.22)"
                : "0 3px 5px rgba(0, 0, 0, 0.5), 0 2px 2px rgba(0, 0, 0, 0.7)",
            transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
            "&:hover": {
              background:
                mode === "light"
                  ? "linear-gradient(45deg, #5e35b1 30%, #8e24aa 90%)"
                  : "linear-gradient(45deg, #7048b0 30%, #9575cd 90%)",
              boxShadow:
                mode === "light"
                  ? "0 6px 10px rgba(103, 58, 183, 0.3), 0 3px 15px rgba(103, 58, 183, 0.22)"
                  : "0 6px 10px rgba(0, 0, 0, 0.5), 0 3px 15px rgba(0, 0, 0, 0.7)",
              transform: "translateY(-3px)",
            },
            "&:active": {
              boxShadow:
                mode === "light"
                  ? "0 1px 3px rgba(103, 58, 183, 0.24), 0 1px 2px rgba(103, 58, 183, 0.22)"
                  : "0 1px 3px rgba(0, 0, 0, 0.5), 0 1px 2px rgba(0, 0, 0, 0.7)",
              transform: "translateY(0)",
              background:
                mode === "light"
                  ? "linear-gradient(45deg, #512da8 30%, #7b1fa2 90%)"
                  : "linear-gradient(45deg, #673ab7 30%, #9575cd 90%)",
            },
          },
        },
      },
      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            backgroundColor:
              mode === "light"
                ? "rgba(103, 58, 183, 0.9)"
                : "rgba(183, 136, 255, 0.9)",
            color: mode === "light" ? "#fff" : "rgba(0, 0, 0, 0.87)",
            borderRadius: 8,
            boxShadow:
              mode === "light"
                ? "0 2px 6px rgba(103, 58, 183, 0.3)"
                : "0 2px 6px rgba(0, 0, 0, 0.5)",
            fontSize: "0.75rem",
            fontWeight: 500,
            padding: "8px 12px",
          },
          arrow: {
            color:
              mode === "light"
                ? "rgba(103, 58, 183, 0.9)"
                : "rgba(183, 136, 255, 0.9)",
          },
        },
      },
      MuiSnackbar: {
        styleOverrides: {
          root: {
            "& .MuiAlert-root": {
              borderRadius: 10,
              boxShadow:
                mode === "light"
                  ? "0 3px 5px rgba(103, 58, 183, 0.2), 0 1px 2px rgba(103, 58, 183, 0.24)"
                  : "0 3px 5px rgba(0, 0, 0, 0.5), 0 1px 2px rgba(0, 0, 0, 0.7)",
            },
          },
        },
      },
      MuiLinearProgress: {
        styleOverrides: {
          root: {
            borderRadius: 6,
            overflow: "hidden",
            height: 6,
            backgroundColor:
              mode === "light"
                ? "rgba(103, 58, 183, 0.12)"
                : "rgba(183, 136, 255, 0.12)",
          },
          bar: {
            background:
              mode === "light"
                ? "linear-gradient(to right, #673ab7, #9c27b0)"
                : "linear-gradient(to right, #7e57c2, #ba68c8)",
          },
        },
      },
      MuiCircularProgress: {
        styleOverrides: {
          circle: {
            strokeLinecap: "round",
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            transition: "all 0.25s cubic-bezier(0.25, 0.8, 0.25, 1)",
            borderRadius: 16,
            "&:hover": {
              boxShadow:
                mode === "light"
                  ? "0 1px 3px rgba(103, 58, 183, 0.18), 0 1px 2px rgba(103, 58, 183, 0.22)"
                  : "0 1px 3px rgba(0, 0, 0, 0.5), 0 1px 2px rgba(0, 0, 0, 0.7)",
            },
            "&.MuiChip-colorPrimary": {
              background:
                mode === "light"
                  ? "linear-gradient(45deg, #673ab7 30%, #9c27b0 90%)"
                  : "linear-gradient(45deg, #7e57c2 30%, #b39ddb 90%)",
            },
          },
          deleteIcon: {
            transition: "all 0.25s cubic-bezier(0.25, 0.8, 0.25, 1)",
            "&:hover": {
              color:
                mode === "light"
                  ? "rgba(103, 58, 183, 0.6)"
                  : "rgba(183, 136, 255, 0.7)",
            },
          },
        },
      },
      MuiAvatar: {
        styleOverrides: {
          root: {
            transition: "all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)",
            "&:hover": {
              transform: "scale(1.1)",
              boxShadow:
                mode === "light"
                  ? "0 3px 5px rgba(103, 58, 183, 0.2), 0 1px 2px rgba(103, 58, 183, 0.24)"
                  : "0 3px 5px rgba(0, 0, 0, 0.5), 0 1px 2px rgba(0, 0, 0, 0.7)",
            },
          },
          colorDefault: {
            background:
              mode === "light"
                ? "linear-gradient(45deg, #673ab7 30%, #9c27b0 90%)"
                : "linear-gradient(45deg, #7e57c2 30%, #b39ddb 90%)",
          },
        },
      },
      MuiTableRow: {
        styleOverrides: {
          root: {
            transition: "all 0.25s cubic-bezier(0.25, 0.8, 0.25, 1)",
            "&:hover": {
              backgroundColor:
                mode === "light"
                  ? "rgba(103, 58, 183, 0.04)"
                  : "rgba(183, 136, 255, 0.08)",
            },
          },
        },
      },
      MuiBadge: {
        styleOverrides: {
          badge: {
            transition: "all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)",
            fontWeight: 600,
            "&:hover": {
              transform: "scale(1.1)",
            },
            "&.MuiBadge-colorPrimary": {
              background:
                mode === "light"
                  ? "linear-gradient(45deg, #673ab7 30%, #9c27b0 90%)"
                  : "linear-gradient(45deg, #7e57c2 30%, #b39ddb 90%)",
            },
          },
        },
      },
      MuiCheckbox: {
        styleOverrides: {
          root: {
            transition: "all 0.25s cubic-bezier(0.25, 0.8, 0.25, 1)",
            color:
              mode === "light"
                ? "rgba(103, 58, 183, 0.6)"
                : "rgba(183, 136, 255, 0.7)",
            "&.Mui-checked": {
              color: colors.primary.main,
            },
          },
        },
      },
      MuiRadio: {
        styleOverrides: {
          root: {
            transition: "all 0.25s cubic-bezier(0.25, 0.8, 0.25, 1)",
            color:
              mode === "light"
                ? "rgba(103, 58, 183, 0.6)"
                : "rgba(183, 136, 255, 0.7)",
            "&.Mui-checked": {
              color: colors.primary.main,
            },
          },
        },
      },
      MuiToggleButton: {
        styleOverrides: {
          root: {
            transition: "all 0.25s cubic-bezier(0.25, 0.8, 0.25, 1)",
            borderRadius: 10,
            textTransform: "none",
            borderColor:
              mode === "light"
                ? "rgba(103, 58, 183, 0.12)"
                : "rgba(183, 136, 255, 0.12)",
            "&.Mui-selected": {
              fontWeight: 600,
              background:
                mode === "light"
                  ? "rgba(103, 58, 183, 0.12)"
                  : "rgba(183, 136, 255, 0.12)",
              color: colors.primary.main,
              "&:hover": {
                background:
                  mode === "light"
                    ? "rgba(103, 58, 183, 0.16)"
                    : "rgba(183, 136, 255, 0.16)",
              },
            },
            "&:hover": {
              backgroundColor:
                mode === "light"
                  ? "rgba(103, 58, 183, 0.08)"
                  : "rgba(183, 136, 255, 0.08)",
            },
          },
        },
      },
      MuiSlider: {
        styleOverrides: {
          root: {
            transition: "all 0.25s cubic-bezier(0.25, 0.8, 0.25, 1)",
            color: colors.primary.main,
            height: 8,
            "& .MuiSlider-thumb": {
              transition: "all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)",
              "&:hover": {
                boxShadow: `0px 0px 0px 8px ${alpha(
                  colors.primary.main,
                  0.16
                )}`,
              },
              "&.Mui-active": {
                boxShadow: `0px 0px 0px 14px ${alpha(
                  colors.primary.main,
                  0.16
                )}`,
              },
            },
            "& .MuiSlider-track": {
              background:
                mode === "light"
                  ? "linear-gradient(to right, #673ab7, #9c27b0)"
                  : "linear-gradient(to right, #7e57c2, #ba68c8)",
              height: 4,
            },
            "& .MuiSlider-rail": {
              color:
                mode === "light"
                  ? "rgba(103, 58, 183, 0.2)"
                  : "rgba(183, 136, 255, 0.2)",
              height: 4,
              opacity: 1,
            },
          },
          valueLabel: {
            background: colors.primary.main,
          },
        },
      },
      
      MuiTouchRipple: {
        styleOverrides: {
          rippleVisible: {
            opacity: 0.2,
            animation: `$enter 550ms ${transitions.easing.easeInOut}`,
          },
          child: {
            backgroundColor: "currentColor",
          },
          "@keyframes enter": {
            "0%": {
              transform: "scale(0)",
              opacity: 0.1,
            },
            "100%": {
              transform: "scale(1)",
              opacity: 0.2,
            },
          },
        },
      },
      
      MuiAccordion: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            overflow: "hidden",
            transition: "all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)",
            "&:before": {
              display: "none",
            },
            "&.Mui-expanded": {
              boxShadow:
                mode === "light"
                  ? "0 3px 6px rgba(103, 58, 183, 0.12), 0 3px 6px rgba(103, 58, 183, 0.08)"
                  : "0 3px 6px rgba(0, 0, 0, 0.5), 0 3px 6px rgba(0, 0, 0, 0.7)",
              margin: "16px 0",
            },
          },
        },
      },
      MuiAccordionSummary: {
        styleOverrides: {
          root: {
            transition: "all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)",
            "&:hover": {
              backgroundColor:
                mode === "light"
                  ? "rgba(103, 58, 183, 0.04)"
                  : "rgba(183, 136, 255, 0.08)",
            },
            "&.Mui-expanded": {
              background:
                mode === "light"
                  ? "rgba(103, 58, 183, 0.08)"
                  : "rgba(183, 136, 255, 0.12)",
            },
          },
          expandIconWrapper: {
            transition: "transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
          },
        },
      },
      MuiAccordionDetails: {
        styleOverrides: {
          root: {
            padding: "16px 24px 24px",
            position: "relative",
            "&:after": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 24,
              right: 24,
              height: "1px",
              backgroundColor:
                mode === "light"
                  ? "rgba(103, 58, 183, 0.12)"
                  : "rgba(183, 136, 255, 0.12)",
            },
          },
        },
      },
      
      MuiMenuItem: {
        styleOverrides: {
          root: {
            transition: "all 0.25s cubic-bezier(0.25, 0.8, 0.25, 1)",
            borderRadius: 6,
            margin: "2px 8px",
            padding: "8px 16px",
            "&:hover": {
              backgroundColor:
                mode === "light"
                  ? "rgba(103, 58, 183, 0.08)"
                  : "rgba(183, 136, 255, 0.12)",
            },
            "&.Mui-selected": {
              backgroundColor:
                mode === "light"
                  ? "rgba(103, 58, 183, 0.12)"
                  : "rgba(183, 136, 255, 0.24)",
              "&:hover": {
                backgroundColor:
                  mode === "light"
                    ? "rgba(103, 58, 183, 0.16)"
                    : "rgba(183, 136, 255, 0.28)",
              },
            },
          },
        },
      },
      MuiMenu: {
        styleOverrides: {
          paper: {
            borderRadius: 12,
            padding: "8px 0",
            boxShadow:
              mode === "light"
                ? "0 8px 16px rgba(103, 58, 183, 0.12), 0 3px 6px rgba(103, 58, 183, 0.08)"
                : "0 8px 16px rgba(0, 0, 0, 0.5), 0 3px 6px rgba(0, 0, 0, 0.7)",
          },
        },
      },
    },
  });
}


export const lightTheme = createAppTheme("light");
export const darkTheme = createAppTheme("dark");


export default lightTheme;
