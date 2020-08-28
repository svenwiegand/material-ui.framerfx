import * as React from "react"
import { addPropertyControls } from "framer"
import { withTheme } from "../common/theme"
import { propertyControls } from "../common/propertyControl"
import { FormControlLabel, Radio as MuiRadio } from "@material-ui/core"
import { useDerivedState } from "../common/state"

export function Radio(props: any) {
    const { label, labelPlacement, checked, onChange, ...other } = props
    const state = useDerivedState(checked)
    state.updateIfDefaultValueChanged(checked)
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        state.setValue(event.target.checked)
        if (onChange) onChange()
    }
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
    "onChange"
))