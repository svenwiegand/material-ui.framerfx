import * as React from "react"
import { colors } from "../canvas"

import {
    createMuiTheme,
    createStyles,
    makeStyles,
    Theme as MuiTheme,
    ThemeProvider,
} from "@material-ui/core/styles"
import { Color } from "framer"

const colorPattern = /(rgb\(\d+, \d+, \d+\))/
function color(colorKey: string): string {
    const cssColorDef = colors[colorKey]
    if (cssColorDef) {
        const [fullMatch, rgb] = colorPattern.exec(cssColorDef)
        const c = Color(rgb)
        return Color.toHexString(c)
    } else {
        return "#000000"
    }
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

export const theme = createMuiTheme({
    palette: {
        primary,
        secondary,
        info,
        success,
        warning,
        error,
    },
    typography: {
        fontFamily: [
            "FiraGO", 
            "FiraSans", 
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
})

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

export function Theme(props) {
    return <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
}

export function withTheme(component: JSX.Element) {
    return <Theme>{component}</Theme>
}
