import * as React from "react"
import { addPropertyControls, ControlType, ControlDescription } from "framer"
import { withTheme } from "../common/theme"
import { propertyControls, propString } from "../common/propertyControl"
import { IconButton as MuiIconButton, Icon } from "@material-ui/core"

interface ButtonProps {
    icon: string
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
}
export function IconButton(props: ButtonProps) {
    const { icon, ...buttonProps } = props
    const content = icon.startsWith("fa-") ? <Icon className={"fa " + icon} /> : <Icon>{icon}</Icon>
    return withTheme(
        <MuiIconButton
            {...buttonProps}
        >
            {content}
        </MuiIconButton>
    )
}

addPropertyControls(IconButton, propertyControls(
    propString("icon", "Icon", "star", "Icon name"),
    "color",
    ["size", {
        type: ControlType.Enum,
        title: "Size",
        options: ["small", "medium", "large"],
        defaultValue: "medium"
    }],
    "disabled",
    ["href", {
        type: ControlType.String,
        title: "Link URL",
        defaultValue: "",
    }],
    "onClick"
))