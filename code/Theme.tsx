import * as React from "react"

import {
    createMuiTheme,
    createStyles,
    makeStyles,
    Theme as MuiTheme,
    ThemeProvider,
} from "@material-ui/core/styles"

const primary = {
    light: "#0096FF",
    main: "#006EE6",
    dark: "#1455B4",
}
const secondary = {
    light: "#E0E0E0",
    main: "#9E9E9E",
    dark: "#424242",
}
const info = {
    light: "#00B4FF",
    main: "#0078FF",
    dark: "#0064D2",
}
const success = {
    light: "#7DA11A",
    main: "#8BB31D",
    dark: "#AECA61",
}
const warning = {
    light: "#E88735",
    main: "#F0AC43",
    dark: "#F4C34C",
}
const error = {
    light: "#FF7070",
    main: "#FF4747",
    dark: "#FF3333",
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
