import * as React from "react"
import { addPropertyControls, ControlType, ControlDescription, Color } from "framer"
import { withTheme } from "../common/theme"
import { propertyControls } from "../common/propertyControl"
import { Icon as MuiIcon } from '@material-ui/core'

const styleId = "material-ui-fonts"
async function importMuiFont() {
    const link = document.createElement("link")
    link.id = styleId
    link.href = "https://fonts.googleapis.com/icon?family=Material+Icons"
    link.rel = "stylesheet"
    document.head.appendChild(link)
}

if (!document.getElementById(styleId)) {
    importMuiFont()
}

interface Props {
    icon?: string
    color?: string
    fontSize?: number
}
export function Icon(props) {
    const { icon, color, fontSize, ...iconProps } = props
    const fontAwesome = icon.match(/^(fa[lrs]?)\-(.*)/)
    const className = fontAwesome ? fontAwesome[1] + " fa-" + fontAwesome[2] : ""
    const content = fontAwesome ? "" : icon
    return withTheme(
        <MuiIcon 
            style={{ color, fontSize }}
            className={className}
            {...iconProps}
        >
            {content}
        </MuiIcon>
    )
}

addPropertyControls(Icon, propertyControls(
    ["icon", {
        type: ControlType.String,
        title: "Icon",
        defaultValue: "add_circle"
    }],
    ["color", {
        type: ControlType.Color,
        title: "Free color"
    } as ControlDescription],
    ["fontSize", {
        type: ControlType.Number,
        title: "Font size",
        defaultValue: 24
    }]
))