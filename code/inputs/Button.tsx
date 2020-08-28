import * as React from "react"
import { addPropertyControls, ControlType, ControlDescription } from "framer"
import { withTheme } from "../common/theme"
import { propertyControls } from "../common/propertyControl"
import { Button as MuiButton, Icon } from "@material-ui/core"

interface Props {
    label: string
    startIcon: string
    endIcon: string
}
export function Button(props: Props) {
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

addPropertyControls(Button, propertyControls(
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
        options: ["standard", "contained", "outlined"],
        defaultValue: "contained"
    }],
    "color",
    "disabled",
    "size",
    "onClick"
))