import * as React from "react"
import { colors } from "../canvas"

import {
    createMuiTheme,
    createStyles,
    makeStyles,
    Theme as MuiTheme,
    ThemeOptions,
    ThemeProvider as MuiThemeProvider,
} from "@material-ui/core/styles"
import { Color } from "framer"
import { PaletteOptions } from "@material-ui/core/styles/createPalette"
import { loadStyle } from "./loadStyle"

loadStyle(
    "fira-sans",
    "https://fonts.googleapis.com/css2?family=Fira+Sans:ital,wght@0,400;0,500;0,600;1,400;1,500;1,600&display=swap"
)

const colorPattern = /(rgba?\(\d+, \d+, \d+(?:, [\d\.]+)?\))/
function parseColor(colorKey: string): Color {
    const cssColorDef = colors[colorKey]
    if (cssColorDef) {
        const [fullMatch, rgba] = colorPattern.exec(cssColorDef)
        return Color(rgba)
    } else {
        console.error("Unknown color " + colorKey)
        return Color("#000000")
    }
}
function color(colorKey: string): string {
    const color = parseColor(colorKey)
    return Color.toString(color)
}
function alpha(colorKey: string): number {
    const color = parseColor(colorKey)
    return Color.toRgb(color).a
}

const primary = {
    light: color("primary.light"),
    main: color("primary.main"),
    dark: color("primary.dark"),
}
const secondary = {
    light: color("secondary.light"),
    main: color("secondary.main"),
    dark: color("secondary.dark"),
}
const info = {
    light: color("info.light"),
    main: color("info.main"),
    dark: color("info.dark"),
}
const success = {
    light: color("success.light"),
    main: color("success.main"),
    dark: color("success.dark"),
}
const warning = {
    light: color("warning.light"),
    main: color("warning.main"),
    dark: color("warning.dark"),
}
const error = {
    light: color("error.light"),
    main: color("error.main"),
    dark: color("error.dark"),
}

const basePalette = {
    primary,
    secondary,
    info,
    success,
    warning,
    error,
}
const paletteLight: PaletteOptions = {
    type: "light",
    ...basePalette,
    text: {
        primary: color("text.primary"),
        secondary: color("text.secondary"),
        disabled: color("text.disabled"),
    },
    action: {
        active: color("action.active"),
        activatedOpacity: alpha("action.active"),
        hover: color("action.hover"),
        hoverOpacity: alpha("action.hover"),
        selected: color("action.selected"),
        selectedOpacity: alpha("action.selected"),
        disabled: color("action.disabled"),
        disabledOpacity: alpha("action.disabled"),
        disabledBackground: color("action.disabledBackground"),
        // focus: string;
        // focusOpacity: number;
    },
    background: {
        default: color("background.default"),
        paper: color("background.paper"),
    },
    divider: color("divider"),
}
const paletteDark: PaletteOptions = {
    type: "dark",
    ...basePalette,
    text: {
        primary: color("dark.text.primary"),
        secondary: color("dark.text.secondary"),
        disabled: color("dark.text.disabled"),
    },
    action: {
        active: color("dark.action.active"),
        activatedOpacity: alpha("dark.action.active"),
        hover: color("dark.action.hover"),
        hoverOpacity: alpha("dark.action.hover"),
        selected: color("dark.action.selected"),
        selectedOpacity: alpha("dark.action.selected"),
        disabled: color("dark.action.disabled"),
        disabledOpacity: alpha("dark.action.disabled"),
        disabledBackground: color("dark.action.disabledBackground"),
        // focus: string;
        // focusOpacity: number;
    },
    background: {
        default: color("dark.background.default"),
        paper: color("dark.background.paper"),
    },
    divider: color("dark.divider"),
}

const themeSpec: ThemeOptions = {
    typography: {
        fontFamily: [
            "Fira GO", 
            "Fira Sans", 
            "-apple-system", 
            "BlinkMacSystemFont", 
            "Segoe UI", 
            "Roboto",
            "Helvetica Neue",
            "Arial",
            "sans-serif",
            "Apple Color Emoji",
            "Segoe UI Emoji",
            "Segoe UI Symbol"
        ].join(","),
        h1: {
            fontSize: 32,
            lineHeight: "38px",
            fontWeight: 600,
            letterSpacing: -0.24
        },
        h2: {
            fontSize: 24,
            lineHeight: "28px",
            fontWeight: 600,
            letterSpacing: 0.16
        },
        h3: {
            fontSize: 18,
            lineHeight: "28px",
            fontWeight: 600,
            letterSpacing: 0.24
        },
        h4: {
            fontSize: 15,
            lineHeight: "25px",
            fontWeight: 600,
            letterSpacing: 0.16
        },
        h5: {
            fontSize: 14,
            lineHeight: "17px",
            fontWeight: 500,
            letterSpacing: 0.16
        },
        h6: {
            fontSize: 12,
            lineHeight: "14px",
            fontWeight: 500,
            letterSpacing: 0.16
        },
        subtitle1: {
            fontSize: 13,
            lineHeight: "18px",
            fontWeight: 400,
            letterSpacing: 0.16
        },
        subtitle2: {
            fontSize: 12,
            lineHeight: "16px",
            fontWeight: 400,
            letterSpacing: 0.32
        },
        body1: {
            fontSize: 15,
            lineHeight: "25px",
            fontWeight: 400,
            letterSpacing: -0.12
        },
        body2: {
            fontSize: 15,
            lineHeight: "21px",
            fontWeight: 400,
            letterSpacing: -0.12
        },
        button: {
            fontSize: 15,
            lineHeight: "15px",
            fontWeight: 400,
            letterSpacing: 0,
            textTransform: "none"
        },
        caption: {
            fontSize: 13,
            lineHeight: "18px",
            fontWeight: 400,
            letterSpacing: 0.16,
            textAlign: "center"
        },
        overline: {
            fontSize: 12,
            lineHeight: "16px",
            fontWeight: 400,
            letterSpacing: 0.32
        }
    }
}
export const themeLight = createMuiTheme({ palette: paletteLight, ...themeSpec})
export const themeDark = createMuiTheme({ palette: paletteDark, ...themeSpec})

export type ThemeChoice = "light" | "dark"
export function theme(theme?: ThemeChoice): MuiTheme {
    return theme === "dark" ? themeDark : themeLight
}

export const useStyles = makeStyles((theme: MuiTheme) =>
    createStyles({
        formControl: {
            width: "100%",
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
        },
    })
)

interface ThemeProps {
    theme?: ThemeChoice,
    children: React.ReactNode,
}
export function ThemeProvider(props: ThemeProps) {
    return <MuiThemeProvider theme={theme(props.theme)}>{props.children}</MuiThemeProvider>
}

export function withTheme(component: JSX.Element) {
    return withSelectedTheme("light", component)
}

export function withSelectedTheme(themeChoice: ThemeChoice | undefined, component: JSX.Element) {
    return <ThemeProvider theme={themeChoice}>{component}</ThemeProvider>
}