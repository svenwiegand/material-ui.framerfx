import * as React from "react"
import { addPropertyControls } from "framer"
import MuiTextField from "@material-ui/core/TextField"
import { withTheme } from "../common/theme"
import { propertyControls } from "../common/propertyControl"

export function TextField(props: any) {
    const { defaultValue, width, height, ...other } = props
    const [value, setValue] = React.useState(defaultValue)
    const [prevDefaultValue, setPrevDefaultValue] = React.useState(defaultValue)
    if(defaultValue !== prevDefaultValue) {
        setValue(defaultValue)
        setPrevDefaultValue(defaultValue)
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => setValue(event.target.value)
    return withTheme(<MuiTextField value={value} onChange={handleChange} fullWidth {...other} />)
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