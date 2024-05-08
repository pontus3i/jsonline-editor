import { lineStore, setLineStore } from "./lines-store"
import { JsonlMessage, Message } from "./types"

export function plainTextToHtml(planText: string) {
    planText = planText.replace(/\n/g, '<br />')
    return planText
}

export function htmlToPlainText(html: string) {
    html = html.replace(/<br \/>/g, '\n')
    return html
}

export function exportToJsonl(): string {
    const lines = lineStore.lines.map(message => JSON.stringify({
        messages: [
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
        console.log(jsonlMessage);
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