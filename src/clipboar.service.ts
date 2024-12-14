import { invoke } from "@tauri-apps/api/core";
import { ClipboardHistory } from "./interface";

export const getClipboardHistory = async (limit: number): Promise<ClipboardHistory[]> => {
    const clipboardHistory = await invoke("get_recent_clips", { limit });
    return clipboardHistory as ClipboardHistory[];
}

export const saveClipboard = async (content: string): Promise<void> => {
    await invoke("save_clipboard", { content });
}

export const clearHistory = async (): Promise<void> => {
    await invoke("clear_history", {});
}