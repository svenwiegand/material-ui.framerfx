import DateFnsUtils from "@date-io/date-fns"
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers"
import { addPropertyControls } from "framer"
import * as React from "react"
import { Markdown } from "../common/markdown"
import { Control, DefaultControl, FormControlControls, FormControlLabelControls } from "../common/propertyControl"
import { useDerivedStateCalculatedFromProp } from "../common/state"
import { withTheme } from "../common/theme"

const dateUtil = new DateFnsUtils()

interface Props extends FormControl {
    placeholder?: string
    value?: string | null
    format?: string
    pickerVariant?: "inline" | "dialog"
    disableToolbar?: boolean
    onChangeDate?: (date: Date | null) => void
}
export function DatePicker(props: Props) {
    const { label, helperText, value, format, variant, pickerVariant, disableUnderline, color, onChangeDate, ...other } = props
    const defaultDate = value ? dateUtil.parse(value, format) : null as Date
    const state = useDerivedStateCalculatedFromProp(defaultDate, value, (date: Date | null) => onChangeDate && onChangeDate(date))
    state.updateIfDefaultValueChanged(defaultDate, value)
    return withTheme(
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
                label={label ? <Markdown text={label}/> : undefined}
                hiddenLabel={!label}
                helperText={<Markdown text={helperText}/>}
                format={format}
                value={state.value}
                variant={pickerVariant}
                inputVariant={variant}
                InputProps={{disableUnderline}}
                color={color === "secondary" ? "secondary" : "primary"}
                onChange={state.setValue}
                {...other}          
            />
        </MuiPickersUtilsProvider>
    )
}

addPropertyControls(DatePicker, {
    ...FormControlLabelControls,
    placeholder: DefaultControl.placeholder,
    value: Control.String("Date", ""),
    format: Control.String("Format", "dd.MM.yyyy"),
    pickerVariant: Control.Enum("Picker variant", ["inline", "dialog"], "inline"),
    disableToolbar: Control.Boolean("Hide toolbar"),
    ...FormControlControls,
    onChangeDate: Control.EventHandler(),
})