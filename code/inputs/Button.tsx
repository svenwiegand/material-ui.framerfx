import { Button as MuiButton } from "@material-ui/core"
import { addPropertyControls } from "framer"
import * as React from "react"
import { Control, DefaultControl } from "../common/propertyControl"
import { ThemeChoice, withSelectedTheme } from "../common/theme"
import { Icon } from "../dataDisplay/Icon"

export interface ButtonProps {
    label?: string
    href?: string
    startIcon?: string
    endIcon?: string
    variant?: "text" | "contained" | "outlined"
    theme?: ThemeChoice
    color?: Color
    disabled?: boolean
    disableElevation?: boolean
    size?: SizeSML
    fullWidth?: boolean
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
}
export function Button(props: ButtonProps) {
    const { theme, label, startIcon, endIcon, ...buttonProps } = props
    const content = label.startsWith("icon:") ? <Icon icon={label.substring("icon:".length)} /> : label
    return withSelectedTheme(theme,
        <MuiButton
            startIcon={startIcon > "" ? <Icon icon={startIcon} /> : undefined}
            endIcon={endIcon > "" ? <Icon icon={endIcon} /> : undefined}
            {...buttonProps}
        >
            {content}
        </MuiButton>
    )
}

addPropertyControls(Button, {
    label: Control.String("Label", "", "Use 'icon:note' for icon"),
    href: Control.String("Link URL", ""),
    startIcon: Control.String("Start icon", "", "Icon name"),
    endIcon: Control.String("End icon", "", "Icon name"),
    variant: Control.Enum("Variant", ["text", "contained", "outlined"], "contained"),
    theme: DefaultControl.theme,
    color: DefaultControl.color,
    disabled: DefaultControl.disabled,
    disableElevation: Control.Boolean("Disable elevation", false),
    size: Control.Enum("Size", ["small", "medium", "large"], "medium"),
    fullWidth: Control.Boolean("Full width", false),
    onClick: DefaultControl.onClick,
})