import { addPropertyControls } from "framer"
import * as React from "react"
import { Control, DefaultControl } from "../common/propertyControl"
import { useDerivedState } from '../common/state'

interface Props {
    pages: Array<React.ReactElement>
    currentPage: number
    padding: number
    mixedPadding: boolean
    paddingTop: number
    paddingRight: number
    paddingBottom: number
    paddingLeft: number 
}

export function ContentSwitcher(props: Props) {
    const { pages, currentPage, padding, mixedPadding, paddingTop, paddingRight, paddingBottom, paddingLeft } = props
    const pageIndex = useDerivedState(currentPage, () => {})
    pageIndex.updateIfDefaultValueChanged(currentPage)
    const position = mixedPadding ? {top: paddingTop, right: paddingRight, bottom: paddingBottom, left: paddingLeft} : {top: padding, right: padding, bottom: padding, left: padding} 
    const layout = {...position, width: "auto", height: "auto"}
    return (
        <div
            style={{
                width: "100%",
                height: "100%",
            }}
        >
            {React.isValidElement(pages[currentPage]) ? React.cloneElement(pages[currentPage], layout) : undefined}
        </div>
    )
}

addPropertyControls(ContentSwitcher, {
    pages: Control.Array("Pages", Control.ComponentInstance("Content")),
    currentPage: Control.Number("Current page", 0, 0),
    padding: DefaultControl.padding,
})