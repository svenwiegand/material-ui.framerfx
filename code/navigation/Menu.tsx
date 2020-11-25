import * as React from "react"
import { Divider, Menu as MuiMenu, MenuItem, PopoverOrigin, Popper } from "@material-ui/core"
import { addPropertyControls, ControlDescription, ControlType } from "framer"
import { propArray, propEnum, propertyControls, propEventHandler, propString } from "../common/propertyControl"
import { withTheme } from "../common/theme"
import { Button, ButtonProps, buttonStylePropertyControls } from "../inputs/Button"

interface MenuProps {
    items: string[]
    verticalAnchorOrigin: PopoverOrigin['vertical']
    horizontalAnchorOrigin: PopoverOrigin['horizontal']
    verticalTransformOrigin: PopoverOrigin['vertical']
    horizontalTransformOrigin: PopoverOrigin['horizontal']
    onItemClicked?: (itemIndex: number) => void
}

function createItem(label: string, onClick: () => void) {
    return label === "---" ? <Divider /> : <MenuItem onClick={onClick}>{label}</MenuItem>
}

export function MenuButton(props: ButtonProps & MenuProps) {
    const { 
        items,
        verticalAnchorOrigin, horizontalAnchorOrigin, verticalTransformOrigin, horizontalTransformOrigin, 
        onItemClicked,
        ...buttonProps 
    } = props
    const [anchor, setAnchor] = React.useState<null | HTMLElement>(null)
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchor(event.currentTarget)
    }
    const handleClose = () => setAnchor(null)
    const handleItemClick = (index: number) => () => {
        handleClose()
        onItemClicked && onItemClicked(index)
    }

    return withTheme(
        <div>
            <Button onClick={handleClick} {...buttonProps} />
            <MuiMenu
                anchorEl={anchor}
                open={Boolean(anchor)}
                onClose={handleClose}
                getContentAnchorEl={null}
                anchorOrigin={{vertical: verticalAnchorOrigin, horizontal: horizontalAnchorOrigin}}
                transformOrigin={{vertical: verticalTransformOrigin, horizontal: horizontalTransformOrigin}}
            >
                {items && items.map((item, n) => createItem(item, handleItemClick(n)))}
            </MuiMenu>
        </div>
    )
}

addPropertyControls(MenuButton, {
    ... buttonStylePropertyControls,
    ... propertyControls(
        propEnum("verticalTransformOrigin", "Vertical transform origin", "top", ["top", "center", "bottom"]),
        propEnum("horizontalTransformOrigin", "Horizontal transform origin", "left", ["left", "center", "right"]),
        propEnum("verticalAnchorOrigin", "Vertical anchor origin", "top", ["top", "center", "bottom"]),
        propEnum("horizontalAnchorOrigin", "Horizontal anchor origin", "left", ["left", "center", "right"]),
        propEventHandler("onItemClicked")
        propArray("items", "Items", propString("", "Label", "", "Label or ---")),
    )
})