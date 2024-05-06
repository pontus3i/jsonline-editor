import {
	Dialog,
	Spacer,
	TextInput,
	TextButton,
	FilledButton,
} from "@vuuui/solidjs"
import {
	RiAddLine,
	RiDatabase2Line,
	RiRobot2Line,
	RiChatSmile2Line,
	RiCloseLine,
} from 'solidjs-remixicon'
import { createSignal } from "solid-js"
import { settingsStore } from "../settings-store"
import { setLineStore } from "../lines-store"

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
				<TextInput
					icon={<RiDatabase2Line />}
					placeholder="System message"
					value={systemMessage()}
					required
					onInput={handleSystemMessage}
				/>

				<TextInput
					icon={<RiChatSmile2Line />}
					placeholder="User message"
					value={userMessage()}
					required
					onInput={handleUserMessage}
				/>

				<TextInput
					icon={<RiRobot2Line />}
					placeholder="Assistant message"
					value={assistantMessage()}
					required
					onInput={handleAssistantMessage}
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
