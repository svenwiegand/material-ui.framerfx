import * as React from "react"
import { addPropertyControls, ControlType } from "framer"
import { withTheme } from "../common/theme"
import { Typography as MuiTypography } from '@material-ui/core'

export function Typography(props) {
    const { text, ...typoProps } = props
    return withTheme(
        <MuiTypography
            {...typoProps}
        >
            {text}   
        </MuiTypography>
    )
}

addPropertyControls(Typography, {
    text: {
        type: ControlType.String,
        title: "Text",
        defaultValue: ""
    },
    variant: {
        type: ControlType.Enum,
        title: "Variant",
        options: ["h1", "h2", "h3", "h4", "h5", "h6", "subtitle1", "subtitle2", "body1", "body2", "caption", "button", "overline"],
        defaultValue: "body1"
    },
    color: {
        type: ControlType.Enum,
        title: "Color",
        options: ["initial", "inherit", "primary", "secondary", "textPrimary", "textSecondary", "error"],
        defaultValue: "initial"
    },
    align: {
        type: ControlType.Enum,
        title: "Align",
        options: ["inherit", "left", "center", "right", "justify"],
        defaultValue: "inherit"
    },
    noWrap: {
        type: ControlType.Boolean,
        title: "No wrap",
        defaultValue: false
    },
    gutterBottom: {
        type: ControlType.Boolean,
        title: "Gutter bottom",
        defaultValue: false
    },
    paragraph: {
        type: ControlType.Boolean,
        title: "Paragraph",
        defaultValue: false
    }
})