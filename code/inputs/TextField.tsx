import MuiTextField from "@material-ui/core/TextField"
import { addPropertyControls } from "framer"
import * as React from "react"
import { Control, DefaultControl, FormControlControls, FormControlLabelControls } from "../common/propertyControl"
import { useDerivedState } from "../common/state"
import { withTheme } from "../common/theme"

interface Props extends FormControl {
    placeholder: string,
    defaultValue: string,
    multiline: boolean,
    autoFocus: boolean,
    type: string,
    onChangeText: (text: string) => void
}
export function TextField(props: Props) {
    const { defaultValue, onChangeText, ...other } = props
    const state = useDerivedState(defaultValue, onChangeText)
    state.updateIfDefaultValueChanged(defaultValue)
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => state.setValue(event.target.value)
    return withTheme(<MuiTextField value={state.value} onChange={handleChange} fullWidth {...other} />)
}

addPropertyControls(TextField, {
    ... FormControlLabelControls,
    placeholder: DefaultControl.placeholder,
    defaultValue: Control.String("Value", "", "", true),
    autoFocus: DefaultControl.autoFocus,
    multiline: Control.Boolean("Multiline"),
    type: Control.Enum("Type", ["text", "number", "password"], "text"),
    ... FormControlControls,
    onChangeText: Control.EventHandler() 
})