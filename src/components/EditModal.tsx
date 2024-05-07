import {
	Dialog,
	Spacer,
	TextButton,
	FilledButton,
} from "@vuuui/solidjs"
import {
	RiAddLine,
	RiCloseLine,
} from 'solidjs-remixicon'
import { TextArea } from "./TextArea"
import { createSignal } from "solid-js"
import { lineStore, setLineStore } from "../lines-store"
import { plainTextToHtml, htmlToPlainText } from "../utils"

import type { InputHandler, Message } from "../types"
import type { CreateModalProps } from "./CreateModal"
import type { Component, Accessor } from 'solid-js'

export interface EditModalProps extends CreateModalProps, Message {
	index: Accessor<number>
}
export type EditModalComponent = Component<EditModalProps>

export const EditModal: EditModalComponent = props => {
	const [systemMessage, setSystemMessage] = createSignal(htmlToPlainText(props.systemMessage))
	const [assistantMessage, setAssistantMessage] = createSignal(htmlToPlainText(props.assistantMessage))
	const [userMessage, setUserMessage] = createSignal(htmlToPlainText(props.userMessage))

	const handleSystemMessage: InputHandler = event => setSystemMessage(event.currentTarget.value)
	const handleAssistantMessage: InputHandler = event => setAssistantMessage(event.currentTarget.value)
	const handleUserMessage: InputHandler = event => setUserMessage(event.currentTarget.value)

	function submitCreateForm(event: Event) {
		event.preventDefault()
		setSystemMessage(plainTextToHtml(systemMessage()))
		setUserMessage(plainTextToHtml(userMessage()))
		setAssistantMessage(plainTextToHtml(assistantMessage()))

		const lines = [...lineStore.lines];
		lines[props.index()] = {
			systemMessage: systemMessage(),
			userMessage: userMessage(),
			assistantMessage: assistantMessage(),
		}

		setLineStore('lines', () => lines)
		props.close()
	}

	return <Dialog
		open={props.open}
		close={props.close}
		title="Edit line"
		icon={<RiAddLine />}
		backdropClose
	>
		<form onSubmit={submitCreateForm}>
			<Spacer justify="right">
				<p>System message</p>
				<TextArea
					value={systemMessage()}
					required
					onChange={handleSystemMessage}
				/>

				<p>User message</p>
				<TextArea
					value={userMessage()}
					required
					onInput={handleUserMessage}
				/>

				<p>Assistant message</p>
				<TextArea
					value={assistantMessage()}
					required
					onChange={handleAssistantMessage}
				/>

				<TextButton
					icon={<RiCloseLine />}
					onClick={props.close}
					type='button'
				>Cancel</TextButton>

				<FilledButton
					icon={<RiAddLine />}
					type='submit'
				>Save</FilledButton>
			</Spacer>
		</form>
	</Dialog>
}
