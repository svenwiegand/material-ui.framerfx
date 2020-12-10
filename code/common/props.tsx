type Color = "primary" | "secondary"
type Size = "medium" | "small"
type Variant = "filled" | "outlined" | "standard"

interface FormControl {
    label: string
    helperText: string
    color: Color
    disabled: boolean
    error: boolean
    fullWidth: boolean
    required: boolean
    size: Size
    variant: Variant
}