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
    fontSize?: number | string
}
const fontAwesomeWeight = {
    fal: 300,
    far: 400,
    fas: 900,
    fa: 900,
}
const fontAwesomeFamily = "'Font Awesome 6 Pro', 'Font Awesome 6', 'Font Awesome 5 Pro', 'Font Awesome 5', 'Font Awesome', 'Material Icons'"
export function Icon(props) {
    const { icon, color, fontSize, ...iconProps } = props
    const fontAwesome: Array<string> | null = icon?.match(/^(fa[lrs]?)\-([^,]*)(,[\+\-][0-9]+)?/)
    const className = fontAwesome ? fontAwesome[1] + " fa-" + fontAwesome[2] : ""
    const offset = fontAwesome?.length > 3 ? Number.parseInt(fontAwesome[3]?.substr(1)) : 0
    const content = fontAwesome ? <i className={className} style={{fontSize: "0.7em", marginLeft: offset}} /> : icon
    const layoutParameters = fontAwesome ? {display: "flex", alignItems: "center", justifyContent: "center"} : {}
    const fontSizeStyle = typeof fontSize === "number" ? {fontSize} : {}
    const fontSizeProp = typeof fontSize !== "number" ? {fontSize} : {}
    return withTheme(
        <MuiIcon 
            style={{ color, ...fontSizeStyle, ...layoutParameters, ...fontSizeStyle }}
            {...fontSizeProp}
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