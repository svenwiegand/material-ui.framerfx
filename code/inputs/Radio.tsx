import * as React from "react"
import { addPropertyControls } from "framer"
import { withTheme } from "../common/theme"
import { propEventHandler, propertyControls } from "../common/propertyControl"
import { FormControlLabel, Radio as MuiRadio } from "@material-ui/core"
import { useDerivedState } from "../common/state"

interface Props {
    label: string,
    checked: boolean,
    labelPlacement: 'end' | 'start' | 'top' | 'bottom',
    onChangeChecked: (checked: boolean) => void
}
export function Radio(props: Props) {
    const { label, labelPlacement, checked, onChangeChecked, ...other } = props
    const state = useDerivedState(checked)
    state.updateIfDefaultValueChanged(checked)
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => state.setValue(event.target.checked)
    const radio = <MuiRadio checked={state.value} onChange={handleChange} {...other} />
    return withTheme(
        <FormControlLabel
            control={radio}
            label={label}
            labelPlacement={labelPlacement}
        />
    )
}

addPropertyControls(Radio, propertyControls(
    "label",
    "checked",
    "color",
    "disabled",
    "required",
    "labelPlacement",
    "size",
    propEventHandler("onChangeChecked")
))