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
const fontAwesomeWeight = {
    fal: 300,
    far: 400,
    fas: 900,
    fa: 900,
}
const fontAwesomeFamily = "'Font Awesome 5 Pro', 'Font Awesome 5', 'Font Awesome', 'Material Icons'"
export function Icon(props) {
    const { icon, color, fontSize, ...iconProps } = props
    const fontAwesome = icon.match(/^(fa[lrs]?)\-(.*)/)
    const className = fontAwesome ? fontAwesome[1] + " fa-" + fontAwesome[2] : ""
    const content = fontAwesome ? "" : icon
    const fontParameters = fontAwesome ? {fontFamily: fontAwesomeFamily, fontWeight: fontAwesomeWeight[fontAwesome[1]]} : {}
    return withTheme(
        <MuiIcon 
            style={{ color, fontSize, ...fontParameters}}
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