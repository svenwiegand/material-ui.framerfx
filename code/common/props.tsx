type Color = "inherit" | "primary" | "secondary" | "default"
type SizeSM = "small" | "medium"
type SizeSML = "small" | "medium" | "large"
type Variant = "filled" | "outlined" | "standard"
type MouseEventHandler = (event: React.MouseEvent<HTMLButtonElement>) => void
type InputEventHandler = (event: React.ChangeEvent<HTMLInputElement>) => void

interface FormControl {
    label: string
    helperText: string
    color: Color
    disabled: boolean
    error: boolean
    fullWidth: boolean
    required: boolean
    size: SizeSM
    variant: Variant
}