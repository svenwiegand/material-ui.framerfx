import { Avatar as MuiAvatar } from '@material-ui/core'
import { addPropertyControls } from "framer"
import * as React from "react"
import { Control } from "../common/propertyControl"
import { themeLight, withTheme } from "../common/theme"
import { Icon } from "./Icon"

export type AvatarVariant = 'circle' | 'rounded' | 'square'
export interface AvatarProps {
    src?: string
    letters?: string
    icon?: string
    iconColor?: string
    variant?: AvatarVariant
    color?: string
    size?: 'native' | 'fill',
    width?: number
    height?: number
    onClick?: () => void
}
export function Avatar(props: AvatarProps) {
    const { letters, icon, iconColor, color, size, width, height, ...avatarProps } = props
    const sizeStyle = size === "fill" ? { width: Math.min(width, height), height: Math.min(width, height) } : {}
    const content = icon > "" ? <Icon icon={icon} color={iconColor} /> : letters
    return withTheme(
        <MuiAvatar
            style={{ backgroundColor: color, ...sizeStyle }}
            {...avatarProps}
        >
            {content}
        </MuiAvatar>
    )
}

addPropertyControls(Avatar, {
    src: Control.Image("Image", "https://images.unsplash.com/photo-1537815749002-de6a533c64db?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"),
    letters: Control.String("Letters"),
    icon: Control.String("Icon name", "person"),
    iconColor: Control.Color("Icon color", themeLight.palette.action.active),
    variant: Control.Enum("Variant", ["circle", "rounded", "square"], "circle"),
    color: Control.Color("Fallback color", "#b5b5b5"),
    size: Control.Enum("Size", ["native", "fill"], "native"),
    onClick: Control.EventHandler()
})