import { Theme } from "@material-ui/core"
import MuiInputBase from "@material-ui/core/InputBase"
import { addPropertyControls } from "framer"
import * as React from "react"
import { Control, DefaultControl } from "../common/propertyControl"
import { useDerivedState } from "../common/state"
import { theme, withTheme } from "../common/theme"

const typographyOptions = ["h1", "h2", "h3", "h4", "h5", "h6", "subtitle1", "subtitle2", "body1", "body2", "button", "caption", "overline"] as const
type Typography = typeof typographyOptions[number]
export interface Props {
    value: string
    typography?: Typography
    color?: string
    disabled?: boolean
    onChangeText: (text: string) => void
    placeholder?: string
    autoFocus?: boolean
    multiline?: boolean
    type?: string
    fullWidth?: boolean
}
export function InputBase(props: Props) {
    const { value, typography, color, onChangeText, ...other } = props
    const state = useDerivedState(value, onChangeText)
    state.updateIfDefaultValueChanged(value)
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => state.setValue(event.target.value)
    const inputStyle: React.CSSProperties = { 
        ...(typography ? theme().typography[typography] as React.CSSProperties : {}),
        color: props.disabled ? undefined : color
    }
    return withTheme(<MuiInputBase value={state.value} inputProps={{style: inputStyle}} onChange={handleChange} {...other} />)
}

addPropertyControls(InputBase, {
    placeholder: DefaultControl.placeholder,
    value: Control.String("Value", "", "", true),
    multiline: Control.Boolean("Multiline", false),
    type: Control.Enum("Type", ["text", "number", "password"], "text"),
    autoFocus: DefaultControl.autoFocus,
    disabled: DefaultControl.disabled,
    typography: Control.Enum("Typography", [...typographyOptions], "button"),
    color: Control.Color("Color", theme().palette.text.primary),
    onChangeText: Control.EventHandler(),
    fullWidth: DefaultControl.fullWidth,
})