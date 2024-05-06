import { createStore } from "solid-js/store"

export const [settingsStore, setSettingsStore] = createStore({
	defaultSystemMessage: "Bạn là một trợ lý cute hột me",
})
