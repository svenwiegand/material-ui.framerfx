import MuiTextField from "@material-ui/core/TextField"
import { addPropertyControls } from "framer"
import * as React from "react"
import { Markdown } from "../common/markdown"
import { Control, DefaultControl, FormControlControls, FormControlLabelControls } from "../common/propertyControl"
import { useDerivedState } from "../common/state"
import { withTheme } from "../common/theme"

interface Props extends FormControl {
    placeholder: string,
    value: string,
    multiline: boolean,
    autoFocus: boolean,
    type: string,
    onChangeText: (text: string) => void
}
export function TextField(props: Props) {
    const { label, helperText, value: value, onChangeText, ...other } = props
    const state = useDerivedState(value, onChangeText)
    state.updateIfDefaultValueChanged(value)
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => state.setValue(event.target.value)
    return withTheme(
        // @ts-ignore
        <MuiTextField 
            label={<Markdown text={label}/>}
            hiddenLabel={!label}
            helperText={<Markdown text={helperText}/>}
            value={state.value} 
            onChange={handleChange} 
            {...other} 
        />
    )
}

addPropertyControls(TextField, {
    ... FormControlLabelControls,
    placeholder: DefaultControl.placeholder,
    value: Control.String("Value", "", "", true),
    autoFocus: DefaultControl.autoFocus,
    multiline: Control.Boolean("Multiline"),
    type: Control.Enum("Type", ["text", "number", "password"], "text"),
    ... FormControlControls,
    onChangeText: Control.EventHandler() 
})