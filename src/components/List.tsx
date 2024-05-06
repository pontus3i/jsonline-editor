import { Container } from "@vuuui/solidjs"
import { lineStore } from "../lines-store"
import { For } from "solid-js"

export const List = () => {
	return <Container class='table-wrapper'>
		<table>
			<thead>
				<tr>
					<th>Line</th>
					<th>System</th>
					<th>User</th>
					<th>Assistant</th>
				</tr>
			</thead>

			<tbody>
				<For each={lineStore.lines}>
					{(msg, index) => <tr>
						<td>{index()}</td>
						<td>{msg.systemMessage}</td>
						<td>{msg.userMessage}</td>
						<td>{msg.assistantMessage}</td>
					</tr>}
				</For>
			</tbody>
		</table>

	</Container>
}
