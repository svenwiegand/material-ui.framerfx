import * as React from "react"
import { addPropertyControls, ControlType, ControlDescription } from "framer"
import { ThemeChoice, withSelectedTheme } from "../common/theme"
import { Control, DefaultControl, propertyControls, propString } from "../common/propertyControl"
import { IconButton as MuiIconButton } from "@material-ui/core"
import { Icon } from "../dataDisplay/Icon"

export interface IconButtonProps {
    icon?: string
    size?: "small" | "medium",
    theme?: ThemeChoice,
    color?: "inherit" | "primary" | "secondary" | "default",
    disabled?: boolean,
    href?: string,
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
}
export function IconButton(props: IconButtonProps) {
    const { icon, size, theme, ...buttonProps } = props
    return withSelectedTheme(theme,
        <MuiIconButton
            size={size}
            {...buttonProps}
        >
            <Icon icon={icon} fontSize={size} />
        </MuiIconButton>
    )
}

addPropertyControls(IconButton, {
    icon: Control.String("Icon", "star", "Icon name"),
    theme: DefaultControl.theme,
    color: DefaultControl.color,
    size: Control.Enum("Size", ["small", "medium"], "medium"),
    disabled: DefaultControl.disabled,
    href: Control.String("Link URL", ""),
    onClick: DefaultControl.onClick
})