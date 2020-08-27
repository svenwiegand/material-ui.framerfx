import * as React from "react"
import { addPropertyControls } from "framer"
import MuiTextField from "@material-ui/core/TextField"
import { withTheme } from "../common/theme"
import { propertyControls } from "../common/propertyControl"

export function TextField(props: any) {
    const { width, height, ...other } = props
    return withTheme(<MuiTextField fullWidth {...other} />)
}

addPropertyControls(TextField, propertyControls(
    "label",
    ["defaultValue", "defaultStringValue"],
    "placeholder",
    "helperText",
    "variant",
    "color",
    "multiline",
    "disabled",
    "required",
    "error",
    "autoFocus",
    "size",
))