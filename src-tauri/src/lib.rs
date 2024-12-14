pub mod libs;
use libs::db::cliboard_store::{clear_history, get_recent_clips, save_clipboard};

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_clipboard_manager::init())
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            save_clipboard,
            get_recent_clips,
            clear_history
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
