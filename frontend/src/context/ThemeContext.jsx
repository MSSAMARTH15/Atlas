import { createContext, useContext, useState } from "react";
import { themes } from "../themes/theme";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {

    const [themeName, setThemeName] = useState("dark");

    const toggleTheme = () => {
        setThemeName(prev =>
            prev === "dark" ? "light" : "dark"
        );
    };

    return (
        <ThemeContext.Provider
            value={{
                theme: themes[themeName],
                themeName,
                toggleTheme
            }}
        >
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    return useContext(ThemeContext);
}