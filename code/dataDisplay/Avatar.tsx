import * as React from "react"
import { addPropertyControls, ControlType } from "framer"
import { withTheme } from "../common/theme"
import { Avatar as MuiAvatar, Icon } from '@material-ui/core'
import { propertyControls } from "../common/propertyControl"

export function Avatar(props) {
    const { letters, icon, color, size, width, height, ...avatarProps } = props
    const sizeStyle = size === "fill" ? { width: Math.min(width, height), height: Math.min(width, height) } : {}
    const content = icon > "" ? <Icon>{icon}</Icon> : letters
    return withTheme(
        <MuiAvatar
            style={{ backgroundColor: color, ...sizeStyle }}
            {...avatarProps}
        >
            {content}
        </MuiAvatar>
    )
}

addPropertyControls(Avatar, propertyControls(
    ["src", {
        type: ControlType.Image,
        title: "Image",
        defaultValue: "https://images.unsplash.com/photo-1537815749002-de6a533c64db?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
    }],
    ["letters", {
        type: ControlType.String,
        title: "Letters",
        defaultValue: ""
    }],
    ["icon", {
        type: ControlType.String,
        title: "Icon",
        placeholder: "Icon name",
        defaultValue: "person"
    }],
    ["variant", {
        type: ControlType.Enum,
        title: "Variant",
        options: ["circle", "rounded", "square"],
        defaultValue: "circle"
    }],
    ["color", {
        type: ControlType.Color,
        title: "Fallback color",
        defaultValue: "#b5b5b5"
    }],
    ["size", {
        type: ControlType.Enum,
        title: "Size",
        options: ["native", "fill"],
        defaultValue: "native"
    }],
    "onClick"
))