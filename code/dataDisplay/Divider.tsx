import { Divider as MuiDivider } from "@material-ui/core"
import { addPropertyControls, FrameProps } from "framer"
import * as React from "react"
import { Control } from "../common/propertyControl"
import { withTheme } from "../common/theme"

export type DividerVariant = "fullWidth" | "inset" | "middle"
type Props = Partial<FrameProps> & {
    flexItem: boolean
    light: boolean,
    orientation: "horizontal" | "vertical"
    variant: DividerVariant
}
export function Divider(props: Props) {
    const { flexItem, light, orientation, variant } = props
    return withTheme(<MuiDivider flexItem={flexItem} light={light} orientation={orientation} variant={variant} />)
}

Divider.defaultProps = { width: "100%", height: 1 }

addPropertyControls(Divider, {
    light: Control.Boolean("Light", false),
    orientation: Control.Enum("Orientation", ["horizontal", "vertical"], "horizontal"),
    variant: Control.Enum("Variant", ["fullWidth", "inset", "middle"], "fullWidthﬂ"),
    flexItem: Control.Boolean("Flex item", false),
})
