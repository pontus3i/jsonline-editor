import {
	Dialog,
	Spacer,
	TextInput,
	FilledButton,
	TextButton,
} from "@vuuui/solidjs"
import {
	RiSettingsLine,
	RiDatabase2Line,
	RiCloseLine,
	RiSaveLine,
} from 'solidjs-remixicon'
import { settingsStore, setSettingsStore } from "../settings-store"
import { createSignal } from "solid-js"

import type { Component } from "solid-js"
import type { InputHandler } from "../types"

interface SettingsProps {
	open: boolean
	close(): void
}
type SettingsComponent = Component<SettingsProps>

export const Settings: SettingsComponent = props => {
	const [defaultSystemMessage, setDefaultSystemMessage] = createSignal(settingsStore.defaultSystemMessage)

	const onDefaultSystemMessageInput: InputHandler = event => {
		setDefaultSystemMessage(event.currentTarget.value)
	}

	function saveSettings(event: Event) {
		event.preventDefault()
		setSettingsStore('defaultSystemMessage', () => defaultSystemMessage())
		props.close()
	}

	return <Dialog
		open={props.open}
		close={props.close}
		title="Settings"
		icon={<RiSettingsLine />}
		backdropClose
	>
		<form onSubmit={saveSettings}>
			<Spacer justify='right'>
				<TextInput
					icon={<RiDatabase2Line />}
					placeholder="Default system message"
					value={defaultSystemMessage()}
					onInput={onDefaultSystemMessageInput}
				/>

				<TextButton
					icon={<RiCloseLine />}
					type="button"
					onClick={props.close}
				>Cancel</TextButton>

				<FilledButton
					icon={<RiSaveLine />}
				>Save</FilledButton>
			</Spacer>
		</form>
	</Dialog>
}
