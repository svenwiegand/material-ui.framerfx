import * as React from "react"
import { addPropertyControls, ControlType, ControlDescription } from "framer"
import { withTheme } from "../common/theme"
import { propertyControls } from "../common/propertyControl"
import { Button as MuiButton, Icon } from "@material-ui/core"

export interface ButtonProps {
    label: string
    startIcon: string
    endIcon: string
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
}
export function Button(props: ButtonProps) {
    const { label, startIcon, endIcon, ...buttonProps } = props
    const content = label.startsWith("icon:") ? <Icon>{label.substring("icon:".length)}</Icon> : label
    return withTheme(
        <MuiButton
            startIcon={startIcon > "" ? <Icon>{startIcon}</Icon> : undefined}
            endIcon={endIcon > "" ? <Icon>{endIcon}</Icon> : undefined}
            {...buttonProps}
        >
            {content}
        </MuiButton>
    )
}

export const buttonPropertyControls = propertyControls(
    ["label", {
        type: ControlType.String,
        title: "Label",
        placeholder: "Use 'icon:note' for icon",
        defaultValue: ""
    }],
    ["href", {
        type: ControlType.String,
        title: "Link URL",
        defaultValue: "",
    }],
    ["startIcon", {
        type: ControlType.String,
        title: "Start icon",
        placeholder: "Icon name",
        defaultValue: ""
    }],
    ["endIcon", {
        type: ControlType.String,
        title: "End icon",
        placeholder: "Icon name",
        defaultValue: ""
    }],
    ["variant", {
        type: ControlType.Enum,
        title: "Variant",
        options: ["text", "contained", "outlined"],
        defaultValue: "contained"
    }],
    "color",
    "disabled",
    ["disableElevation", {
        type: ControlType.Boolean,
        title: "Disable elevation",
        defaultValue: false
    }],
    ["size", {
        type: ControlType.Enum,
        title: "Size",
        options: ["small", "medium", "large"]
    }],
    ["fullWidth", {
        type: ControlType.Boolean,
        title: "Full width",
        defaultValue: false
    } as ControlDescription],
    "onClick"
)
export const buttonStylePropertyControls = (() => {
    const controls = {...buttonPropertyControls}
    delete controls.href
    delete controls.onClick
    return controls
})()

addPropertyControls(Button, buttonPropertyControls)