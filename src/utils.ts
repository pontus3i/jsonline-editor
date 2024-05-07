import { lineStore, setLineStore } from "./lines-store"
import { JsonlMessage, Message } from "./types"

export function planTextToHtml(planText: string) {
    planText = planText.replace(/\n/g, '<br />')

    return planText
}

export function exportToJsonl(): string {
    const lines = lineStore.lines.map(message => JSON.stringify({
        message: [
            {
                role: 'system',
                content: message.systemMessage,
            },
            {
                role: 'user',
                content: message.userMessage,
            },
            {
                role: 'assistant',
                content: message.assistantMessage,
            },
        ]
    }))

    return lines.join('\n')
}

export function importJsonl(jsonl: string) {
    const lines = jsonl.split('\n')
    const messages: Message[] = [];

    lines.forEach(line => {
        const jsonlMessage: JsonlMessage = JSON.parse(line)
        messages.push({
            systemMessage: jsonlMessage.messages[0].content,
            userMessage: jsonlMessage.messages[1].content,
            assistantMessage: jsonlMessage.messages[2].content,
        })
    })

    setLineStore('lines', current => [
        ...current,
        ...messages,
    ])
}