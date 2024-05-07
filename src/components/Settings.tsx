import {
	Dialog,
	Spacer,
	FilledButton,
	TextButton,
} from "@vuuui/solidjs"
import {
	RiSettingsLine,
	RiCloseLine,
	RiSaveLine,
} from 'solidjs-remixicon'
import { TextArea } from "./TextArea"
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
				<p>Default system message</p>
				<TextArea
					value={defaultSystemMessage()}
					onChange={onDefaultSystemMessageInput}
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
