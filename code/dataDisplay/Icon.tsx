import { Icon as MuiIcon } from '@material-ui/core'
import { addPropertyControls } from "framer"
import * as React from "react"
import { loadStyle } from '../common/loadStyle'
import { Control } from "../common/propertyControl"
import { withTheme } from "../common/theme"
import { Badge, badgePropertyControl } from './Badge'

loadStyle(
    "mui-icon-font",
    "https://fonts.googleapis.com/icon?family=Material+Icons"
)

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
    const { icon, color, fontSize, badge, ...iconProps } = props
    const fontAwesome: Array<string> | null = icon?.match(/^(fa[lrs]?)\-([^,]*)(,[\+\-][0-9]+)?/)
    const className = fontAwesome ? fontAwesome[1] + " fa-" + fontAwesome[2] : ""
    const offset = fontAwesome?.length > 3 ? Number.parseInt(fontAwesome[3]?.substr(1)) : 0
    const content = fontAwesome ? <i className={className} style={{fontSize: "0.85em", marginLeft: offset}} /> : icon
    const layoutParameters = fontAwesome ? {display: "flex", alignItems: "center", justifyContent: "center"} : {}
    const fontSizeStyle = typeof fontSize === "number" ? {fontSize} : {}
    const fontSizeProp = typeof fontSize !== "number" ? {fontSize} : {}
    return withTheme(
        <Badge {...badge}>
            <MuiIcon 
                style={{ color, ...fontSizeStyle, ...layoutParameters, ...fontSizeStyle }}
                {...fontSizeProp}
                {...iconProps}
            >
                {content}
            </MuiIcon>
        </Badge>
    )
}

addPropertyControls(Icon, {
    icon: Control.String("Icon", "add_circle"),
    color: Control.Color("Color"),
    fontSize: Control.Number("Font size", 24),
    ...badgePropertyControl,
})