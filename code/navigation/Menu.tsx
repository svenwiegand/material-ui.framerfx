import { Divider, ListItemIcon, MenuItem, MenuList, Paper, Typography } from "@material-ui/core"
import { addPropertyControls } from "framer"
import * as React from "react"
import { Markdown } from "../common/markdown"
import { Control, DefaultControl } from "../common/propertyControl"
import { ThemeChoice, withSelectedTheme } from "../common/theme"
import { Icon } from "../dataDisplay/Icon"

export type ItemClickHandler = (itemIndex: number, title: string) => void

interface MenuProps {
    theme?: ThemeChoice,
    items?: string[]
    onItemClicked?: ItemClickHandler
}

function clickHandler(index: number, label: string, onClick?: ItemClickHandler) {
    return () => onClick && onClick(index, label)
}

const iconPattern = /\!\[([^\]]+)\]/

function sanitizeLabel(label: string): string {
    const withoutIcon = label.replace(iconPattern, "")
    return withoutIcon.trim()
}

function extractIcon(label: string): string | null {
    const match = iconPattern.exec(label)
    return match ? match[1] : null
}

function ItemIcon(props: {label: string}) {
    const icon = extractIcon(props.label)
    if (icon) {
        return (
            <ListItemIcon>
                <Icon icon={icon}/>
            </ListItemIcon>
        )
    } else {
        return (<span/>)
    }
}

function createItem(index: number, label: string, onClick?: ItemClickHandler) {
    if (label.startsWith("---")) {
        return <Divider />
    } else {
        const sanitizedLabel = sanitizeLabel(label)
        return (
            <MenuItem onClick={clickHandler(index, sanitizedLabel, onClick)}>
                <ItemIcon label={label}/>
                <Typography variant="inherit"><Markdown text={sanitizedLabel}/></Typography>
            </MenuItem>    
        )
    }
}

export function createItems(items?: string[], onItemClicked?: ItemClickHandler) {
    return items ? items.map((label, index) => createItem(index, label, onItemClicked)) : []
}

export function Menu(props: MenuProps) {
    return withSelectedTheme(props.theme, 
        <Paper elevation={8} style={{ zIndex: 1300, position: "relative" }}>
            <MenuList>
                {createItems(props.items, props.onItemClicked)}
            </MenuList>
        </Paper>
    )
}

addPropertyControls(Menu, {
    theme: DefaultControl.theme,
    items: Control.Array("Items", Control.String("Item", "", "Title ![icon]")),
    onItemClicked: Control.EventHandler(),
})