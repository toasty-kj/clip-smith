pub mod libs;
use libs::db::cliboard_store::{
    clear_history, console_log, get_clips, get_recent_clips, save_clipboard,
};
use libs::keyboard::press_ctrl_v::simulate_paste;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_global_shortcut::Builder::new().build())
        .plugin(tauri_plugin_clipboard_manager::init())
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            save_clipboard,
            get_clips,
            clear_history,
            console_log,
            simulate_paste,
            get_recent_clips,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
