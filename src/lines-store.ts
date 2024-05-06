import { createStore } from "solid-js/store"
import type { Message } from "./types"

export const [lineStore, setLineStore] = createStore<{
	lines: Message[]
}>({
	lines: [],
})
