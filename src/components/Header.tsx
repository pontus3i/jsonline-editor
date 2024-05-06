import { createSignal } from 'solid-js'
import {
	Container, Spacer,
	ElevatedButton,
	FilledButton,
	OutlinedButton,
} from "@vuuui/solidjs"
import {
	RiFileUploadLine,
	RiFileDownloadLine,
	RiSettingsLine,
	RiAddLine,
} from 'solidjs-remixicon'
import { Settings } from "./Settings"
import { CreateModal } from './CreateModal'

export const Header = () => {
	const [settingsOpen, setSettingsOpen] = createSignal(false)
	const [createModalOpen, setCreateModalOpen] = createSignal(false)

	return <Container>
		<Spacer justify="center">
			<ElevatedButton
				icon={<RiFileUploadLine />}
			>Open</ElevatedButton>

			<ElevatedButton
				icon={<RiFileDownloadLine />}
			>Save</ElevatedButton>

			<OutlinedButton
				icon={<RiSettingsLine />}
				onClick={() => setSettingsOpen(true)}
			>Settings</OutlinedButton>

			<FilledButton
				icon={<RiAddLine />}
				onClick={() => setCreateModalOpen(true)}
			>Create</FilledButton>
		</Spacer>

		<Settings
			open={settingsOpen()}
			close={() => setSettingsOpen(false)}
		/>

		<CreateModal
			open={createModalOpen()}
			close={() => setCreateModalOpen(false)}
		/>
	</Container>
}
