import * as React from "react"
import { addPropertyControls, ControlType, ControlDescription } from "framer"
import MuiTextField from "@material-ui/core/TextField"
import { withTheme } from "../common/theme"
import { propertyControls } from "../common/propertyControl"
import { useDerivedState } from "../common/state"

export function TextField(props: any) {
    const { defaultValue, onChange, width, height, ...other } = props
    const state = useDerivedState(defaultValue, onChange)
    state.updateIfDefaultValueChanged(defaultValue)
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => state.setValue(event.target.value)
    return withTheme(<MuiTextField value={state.value} onChange={handleChange} fullWidth {...other} />)
}

addPropertyControls(TextField, propertyControls(
    "label",
    ["defaultValue", "defaultStringValue"],
    "placeholder",
    "helperText",
    "variant",
    "color",
    "multiline",
    ["type", {
        type: ControlType.Enum,
        title: "Type",
        options: ["text", "number", "password"],
        default: "text"
    } as ControlDescription],
    "disabled",
    "required",
    "error",
    "autoFocus",
    "size",
    "onChange"
))