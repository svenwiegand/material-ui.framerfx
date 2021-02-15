import { Checkbox as MuiCheckbox, FormControlLabel } from "@material-ui/core"
import { addPropertyControls, ControlDescription, ControlType } from "framer"
import * as React from "react"
import { Markdown } from "../common/markdown"
import { propertyControls, propEventHandler } from "../common/propertyControl"
import { useDerivedState } from "../common/state"
import { withTheme } from "../common/theme"

interface Props {
    label: string,
    labelPlacement: 'end' | 'start' | 'top' | 'bottom',
    checked: boolean,
    onChangeChecked: (checked: boolean) => void
}

export function Checkbox(props: Props) {
    const { label, labelPlacement, checked, onChangeChecked, ...other } = props
    const state = useDerivedState(checked, onChangeChecked)
    state.updateIfDefaultValueChanged(checked)
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => state.setValue(event.target.checked)
    const checkbox = <MuiCheckbox checked={state.value} onChange={handleChange} {...other} />
    return withTheme(
        <FormControlLabel
            control={checkbox}
            label={<Markdown text={label}/>}
            labelPlacement={labelPlacement}
        />
    )
}

addPropertyControls(Checkbox, propertyControls(
    "label",
    "checked",
    ["indeterminate", {
        type: ControlType.Boolean,
        label: "Indeterminate",
        defaultValue: false
    } as ControlDescription],
    "color",
    "disabled",
    "required",
    "labelPlacement",
    "size",
    propEventHandler("onChangeChecked")
))