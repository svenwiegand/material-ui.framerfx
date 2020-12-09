import * as React from "react"
import { addPropertyControls, ControlType } from "framer"
import { withTheme } from "../common/theme"
import { Skeleton as MuiSkeleton } from "@material-ui/lab"
import { Control } from "../common/propertyControl"

export function Skeleton(props) {
    return withTheme(<MuiSkeleton {...props} />)
}

addPropertyControls(Skeleton, {
    variant: Control.enum("Variant", ["text", "rect", "circle"], "rect"),
    animation: Control.enum("Animation", ["pulse", "wave", "none"], "pulse"),
})
