import { Typography as MuiTypography } from '@material-ui/core'
import { addPropertyControls, ControlType } from "framer"
import * as React from "react"
import { MarkdownDiv } from "../common/markdown"
import { DefaultControl } from "../common/propertyControl"
import { withSelectedTheme } from "../common/theme"
import { Badge, badgePropertyControl } from "./Badge"


export function Typography(props) {
    const { weight, badge, ...typoProps } = props
    const style = !weight || weight === "inherit" ? {} : { fontWeight: weight }
    return withSelectedTheme(props.theme,
        <Badge {...badge}>
            <MuiTypography
                style={style}
                {...typoProps}
            >
                <MarkdownDiv text={props.text}/>
            </MuiTypography>
        </Badge>
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
        optionTitles: ["inherit", "thin (100)", "extra light (200)", "light (300)", "regular (400)", "medium (500)", "semi bold (600)", "bold (700)", "extra bold (800)", "heavy (900)"],
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
    },
    ...badgePropertyControl,
})