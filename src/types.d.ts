import { JSX } from "solid-js"

export interface Message {
	systemMessage: string
	assistantMessage: string
	userMessage: string
}

type InputHandler = JSX.EventHandlerUnion<HTMLInputElement, InputEvent>
