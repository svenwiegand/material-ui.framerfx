import { Badge as MuiBadge } from '@material-ui/core'
import * as React from "react"
import { addPropertyControls } from '../../../../../Library/Application Support/Framer/library/build/framer'
import { Control } from "../common/propertyControl"
import { withTheme } from '../common/theme'

export interface BadgeProps {
    anchorHorizontal?: "left" | "right"
    anchorVertical?: "top" | "bottom"
    badgeContent?: string
    children?: React.ReactNode,
    color?: "primary" | "secondary" | "error"
    overlap?: "circle" | "rectangle"
    visible?: boolean
}

export const Badge: React.FunctionComponent<BadgeProps> = (props) => {
    const { anchorHorizontal, anchorVertical, children, visible, ...badgeProps } = props
    const variant = badgeProps.badgeContent ? "standard" : "dot"
    const anchor = {
        horizontal: anchorHorizontal ?? "right",
        vertical: anchorVertical ?? "top",
    }
    return withTheme( 
        <MuiBadge 
            anchorOrigin={anchor} 
            invisible={!visible} 
            showZero  
            variant={variant}
            {...badgeProps} 
        >
            {children}
        </MuiBadge>
    )
} 

export const badgePropertyControls = {
    visible: Control.Boolean("Visible"),
    badgeContent: Control.String("Content"),
    color: Control.Enum("Color", ["primary", "secondary", "error"], "primary"),
    overlap: Control.Enum("Overlap", ["circle", "rectangle"], "rectangle"),
    anchorVertical: Control.Enum("Vertical", ["top", "bottom"], "top"),
    anchorHorizontal: Control.Enum("Horizontal", ["left", "right"], "right"),
}

export const badgePropertyControl = {
    badge: Control.Object("Badge", badgePropertyControls)
}

addPropertyControls(Badge, {
    ...badgePropertyControls,
    visible: Control.Boolean("Visible", true),
    children: Control.ComponentInstance("Child"),
})