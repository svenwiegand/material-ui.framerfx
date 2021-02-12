import * as React from "react"
import { addPropertyControls, ControlType } from "framer"
import { withSelectedTheme } from "../common/theme"
import { Typography as MuiTypography } from '@material-ui/core'
import { DefaultControl } from "../common/propertyControl"


export function Typography(props) {
    const { weight, ...typoProps } = props
    const text: string = props.text
    const lines = text.split("\n").map(line => line.trim().length > 0 ? (<div>{line}</div>) : <br />)
    return withSelectedTheme(props.theme,
        <MuiTypography
            style={{fontWeight: weight}}
            {...typoProps}
        >
            {lines}
        </MuiTypography>
    )
}

addPropertyControls(Typography, {
    text: {
        type: ControlType.String,
        title: "Text",
        displayTextArea: true,
        defaultValue: ""
    },
    variant: {
        type: ControlType.Enum,
        title: "Variant",
        options: ["h1", "h2", "h3", "h4", "h5", "h6", "subtitle1", "subtitle2", "body1", "body2", "caption", "button", "overline"],
        defaultValue: "body1"
    },
    theme: DefaultControl.theme,
    color: {
        type: ControlType.Enum,
        title: "Color",
        options: ["initial", "inherit", "primary", "secondary", "textPrimary", "textSecondary", "error"],
        defaultValue: "initial"
    },
    weight: {
        type: ControlType.Enum,
        title: "Weight",
        optionTitles: ["inherit", "thin", "extra light", "light", "regular", "medium", "semi bold", "bold", "extra bold", "heavy"],
        options: ["inherit", 100, 200, 300, 400, 500, 600, 700, 800, 900],
        defaultValue: 0
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