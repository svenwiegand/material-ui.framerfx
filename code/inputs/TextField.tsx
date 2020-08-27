import * as React from "react"
import { addPropertyControls } from "framer"
import MuiTextField from "@material-ui/core/TextField"
import { withTheme } from "../common/theme"
import { propertyControls } from "../common/propertyControl"

export function TextField(props: any) {
    const { width, height } = props
    return withTheme(<MuiTextField fullWidth {...props} />)
}

addPropertyControls(TextField, propertyControls(
    "label",
    "defaultValue",
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