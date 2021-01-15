import * as React from "react"
import { addPropertyControls, ControlType } from "framer"
import { withTheme } from "../common/theme"
import { propertyControls, InputVariant, propEventHandler, propNumber } from "../common/propertyControl"
import { useDerivedState, useDerivedStateCalculatedFromProp } from "../common/state"
import { Slider as MuiSlider } from "@material-ui/core"

interface Props {
    value: number
    min: number
    max: number
    onValueChanged: (value: number) => void
}
export function Slider(props: Props) {
    const { value, onValueChanged, ...otherProps } = props
    const state = useDerivedState(value, onValueChanged)
    state.updateIfDefaultValueChanged(value)
    const handleChange = (eventy: any, newValue: number) => state.setValue(newValue)
    return withTheme(
        <MuiSlider value={state.value} onChange={handleChange} {...otherProps} />
    )
}

addPropertyControls(Slider, propertyControls(
    propNumber("value", "Value", 0),
    propNumber("min", "Min", 0),
    propNumber("max", "Max", 100),
    propEventHandler("onValueChanged")
))