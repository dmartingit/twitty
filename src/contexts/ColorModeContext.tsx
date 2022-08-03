import React from "react";
import {createTheme, CssBaseline, ThemeProvider, useMediaQuery} from "@mui/material";

const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

export type ColorModeProviderProps = {
    children?: React.ReactNode;
};

export const ColorModeProvider: React.FC<ColorModeProviderProps> = ({children}) => {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    let initialState: "light" | "dark" = prefersDarkMode ? "dark" : "light";
    const darkModeSetting = localStorage.getItem("darkMode");
    if (darkModeSetting) {
        initialState = darkModeSetting === "light" ? "light" : "dark";
    }

    const [mode, setMode] = React.useState<"light" | "dark">(initialState);
    const colorMode = React.useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) => {
                    const newMode = prevMode === "light" ? "dark" : "light";
                    localStorage.setItem("darkMode", newMode);
                    return newMode;
                });
            },
        }),
        [],
    );

    const theme = React.useMemo(
        () =>
            createTheme({
                palette: {
                    mode,
                },
            }),
        [mode],
    );

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
};

export const useColorMode = () => React.useContext(ColorModeContext);
