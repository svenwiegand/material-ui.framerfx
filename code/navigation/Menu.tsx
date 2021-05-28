import { Divider, ListItemIcon, MenuItem, MenuList, Paper, Typography } from "@material-ui/core"
import { addPropertyControls, PropertyControls } from "framer"
import * as React from "react"
import { Markdown } from "../common/markdown"
import { Control, DefaultControl } from "../common/propertyControl"
import { ThemeChoice, withSelectedTheme } from "../common/theme"
import { DividerVariant } from "../dataDisplay/Divider"
import { Icon } from "../dataDisplay/Icon"

export type ItemClickHandler = (itemIndex: number, label: string) => void

export interface MenuItemProps {
    label?: string
    icon?: string
    selected?: boolean
    disabled?: boolean
    divider?: boolean
}

export interface MenuProps {
    theme?: ThemeChoice,
    denseItems?: boolean
    disableItemGutters?: boolean
    dividerLight?: boolean
    dividerVariant?: DividerVariant
    items?: MenuItemProps[]
    onItemClicked?: ItemClickHandler
}

function ItemIcon({ icon }: { icon: string }) {
    if (icon) {
        return (
            <ListItemIcon>
                <Icon icon={icon}/>
            </ListItemIcon>
        )
    } else {
        return null
    }
}

function createItem(index: number, item: MenuItemProps, menu: MenuProps) {
    const { divider, label, icon, selected, disabled } = item
    if (divider && !label && !icon) {
        return <Divider key={index} light={menu.dividerLight} variant={menu.dividerVariant} />
    } else {
        const { denseItems: dense, disableItemGutters: disableGutters, onItemClicked } = menu
        const props = { selected, disabled, dense, disableGutters, divider }
        const onClick = onItemClicked && (() => onItemClicked(index, label))
        return (
            <MenuItem key={index} {...props} onClick={onClick}>
                <ItemIcon icon={icon}/>
                <Typography variant="inherit"><Markdown text={label}/></Typography>
            </MenuItem>    
        )
    }
}

export function createItems(menu: MenuProps) {
    return menu.items ? menu.items.map((item, index) => createItem(index, item, menu)) : []
}

export function Menu(props: MenuProps) {
    return withSelectedTheme(props.theme, 
        <Paper elevation={8} style={{ zIndex: 1300, position: "relative" }}>
            <MenuList>
                {createItems(props)}
            </MenuList>
        </Paper>
    )
}

export const menuItemPropertyControls = {
    label: Control.String("Label"),
    icon: Control.String("Icon", undefined, "icon name"),
    selected: DefaultControl.selected,
    disabled: DefaultControl.disabled,
    divider: Control.Boolean("Divider"),
}

export const menuPropertyControls = {
    theme: DefaultControl.theme,
    denseItems: DefaultControl.dense,
    disableItemGutters: DefaultControl.disableGutters,
    dividerLight: Control.Boolean("Divider light"),
    dividerVariant: Control.Enum("Divider variant", ["fullWidth", "inset", "middle"], "fullWidth"),
    items: Control.Array("Items", Control.Object("Item", menuItemPropertyControls)),
    onItemClicked: Control.EventHandler(),
}
addPropertyControls(Menu, menuPropertyControls)