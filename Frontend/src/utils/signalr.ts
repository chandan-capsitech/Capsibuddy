import * as signalR from "@microsoft/signalr";

export function createSignalRConnection(sessionId: string) {
    return new signalR.HubConnectionBuilder()
        .withUrl(`http://localhost:5151/chathub?sessionId=${encodeURIComponent(sessionId)}`)
        .withAutomaticReconnect()
        .build();
}