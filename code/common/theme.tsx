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
        button: {
            textTransform: "none"
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
