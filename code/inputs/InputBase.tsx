import MuiInputBase from "@material-ui/core/InputBase"
import { addPropertyControls } from "framer"
import * as React from "react"
import { Control, DefaultControl } from "../common/propertyControl"
import { useDerivedState } from "../common/state"
import { withTheme } from "../common/theme"

export interface Props extends FormControl {
    placeholder: string,
    value: string,
    multiline: boolean,
    autoFocus: boolean,
    type: string,
    onChangeText: (text: string) => void
}
export function InputBase(props: Props) {
    const { value, onChangeText, ...other } = props
    const state = useDerivedState(value, onChangeText)
    state.updateIfDefaultValueChanged(value)
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => state.setValue(event.target.value)
    return withTheme(<MuiInputBase value={state.value} onChange={handleChange} {...other} />)
}

addPropertyControls(InputBase, {
    placeholder: DefaultControl.placeholder,
    value: Control.String("Value", "", "", true),
    autoFocus: DefaultControl.autoFocus,
    multiline: Control.Boolean("Multiline", false),
    type: Control.Enum("Type", ["text", "number", "password"], "text"),
    required: DefaultControl.required,
    error: DefaultControl.error,
    disabled: DefaultControl.disabled,
    fullWidth: DefaultControl.fullWidth,
    onChangeText: Control.EventHandler() 
})