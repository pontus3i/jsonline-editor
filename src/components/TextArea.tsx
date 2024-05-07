import type { JSX, Component } from "solid-js"

interface TextAreaProps extends JSX.TextareaHTMLAttributes<HTMLTextAreaElement> {

}
type TextAreaComponent = Component<TextAreaProps>

export const TextArea: TextAreaComponent = props => {
    return <textarea {...props} class='textarea'>

    </textarea>
}