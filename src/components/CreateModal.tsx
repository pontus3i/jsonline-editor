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
import { settingsStore } from "../settings-store"
import { setLineStore } from "../lines-store"
import { planTextToHtml } from "../utils"

import type { Component } from "solid-js"
import type { InputHandler } from "../types"

interface CreateModalProps {
	open: boolean
	close(): void
}
type CreateModalComponent = Component<CreateModalProps>

export const CreateModal: CreateModalComponent = props => {
	const [systemMessage, setSystemMessage] = createSignal(settingsStore.defaultSystemMessage)
	const [assistantMessage, setAssistantMessage] = createSignal('')
	const [userMessage, setUserMessage] = createSignal('')

	const handleSystemMessage: InputHandler = event => setSystemMessage(event.currentTarget.value)
	const handleAssistantMessage: InputHandler = event => setAssistantMessage(event.currentTarget.value)
	const handleUserMessage: InputHandler = event => setUserMessage(event.currentTarget.value)

	function resetForm() {
		setSystemMessage(settingsStore.defaultSystemMessage)
		setAssistantMessage('')
		setUserMessage('')
	}

	function submitCreateForm(event: Event) {
		event.preventDefault()
		setSystemMessage(planTextToHtml(systemMessage()))
		setUserMessage(planTextToHtml(userMessage()))
		setAssistantMessage(planTextToHtml(assistantMessage()))

		setLineStore('lines', current => [
			...current,
			{
				systemMessage: systemMessage(),
				assistantMessage: assistantMessage(),
				userMessage: userMessage(),
			},
		])

		props.close()
		resetForm()
	}

	return <Dialog
		open={props.open}
		close={props.close}
		title="Create"
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
				>Create</FilledButton>
			</Spacer>
		</form>
	</Dialog>
}
