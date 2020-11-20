import * as React from "react"
import { addPropertyControls, ControlType, ControlDescription } from "framer"
import MuiTextField from "@material-ui/core/TextField"
import { withTheme } from "../common/theme"
import { eventHandler, propertyControls } from "../common/propertyControl"
import { useDerivedState } from "../common/state"

interface Props {
    defaultValue: string,
    onChangeText: (text: string) => void
}
export function TextField(props: Props) {
    const { defaultValue, onChangeText, ...other } = props
    const state = useDerivedState(defaultValue, onChangeText)
    state.updateIfDefaultValueChanged(defaultValue)
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => state.setValue(event.target.value)
    return withTheme(<MuiTextField value={state.value} onChange={handleChange} fullWidth {...other} />)
}

addPropertyControls(TextField, propertyControls(
    "label",
    ["defaultValue", {
        type: ControlType.String,
        title: "Value",
        displayTextArea: true,
        defaultValue: ""
    }],
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
    eventHandler("onChangeText")
))