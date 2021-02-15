import * as React from "react"
import snarkdown from "snarkdown"

function markdown(markdown?: string) {
    return markdown ? snarkdown(markdown) : ""
}

interface MarkdownProps {
    text?: string
    element?: keyof JSX.IntrinsicElements
}

export function Markdown(props: MarkdownProps) {
    const { text, element } = props
    const Tag = (element || "span") as keyof JSX.IntrinsicElements
    return text ? <Tag dangerouslySetInnerHTML={{ __html: markdown(text) }} /> : null
}

export function MarkdownDiv(props: MarkdownProps) {
    return <Markdown text={props.text} element="div" />
}