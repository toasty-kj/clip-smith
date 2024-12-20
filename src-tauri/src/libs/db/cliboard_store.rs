use bincode;
use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};
use sled::Db;
use uuid::Uuid;

#[derive(Serialize, Deserialize)]
pub struct ClipboardEntry {
    id: String,
    content: String,
    timestamp: DateTime<Utc>,
}

struct ClipboardStore {
    db: Db,
}

impl ClipboardStore {
    fn new() -> Result<Self, sled::Error> {
        let db = sled::open("clipboard_store")?;
        Ok(Self { db })
    }

    // save clipboard content
    fn save_entry(&self, content: String) -> Result<(), Box<dyn std::error::Error>> {
        let entry = ClipboardEntry {
            content,
            timestamp: Utc::now(),
            id: Uuid::new_v4().to_string(),
        };

        let encoded = bincode::serialize(&entry)?;
        let key = entry.timestamp.timestamp().to_be_bytes();

        // delete existing entry with the same content
        let mut batch = sled::Batch::default();
        for item in self.db.iter() {
            let (existing_key, existing_value) = item?;
            let existing_entry: ClipboardEntry = bincode::deserialize(&existing_value)?;
            if existing_entry.content == entry.content {
                batch.remove(existing_key);
            }
        }
        self.db.apply_batch(batch)?;

        self.db.insert(key, encoded)?;
        self.db.flush()?;

        Ok(())
    }

    // get recent entries
    fn get_entries(&self, limit: usize) -> Result<Vec<ClipboardEntry>, Box<dyn std::error::Error>> {
        let mut entries = Vec::new();

        for item in self.db.iter().rev().take(limit) {
            let (_, value) = item?;
            let entry: ClipboardEntry = bincode::deserialize(&value)?;
            entries.push(entry);
        }

        Ok(entries)
    }

    // get entries from last week
    fn get_recent_clips(&self) -> Result<Vec<ClipboardEntry>, Box<dyn std::error::Error>> {
        let mut entries = Vec::new();
        let week_ago = Utc::now() - chrono::Duration::days(7);
        let week_ago_timestamp = week_ago.timestamp().to_be_bytes();

        for item in self.db.iter().rev() {
            let (key, value) = item?;
            if key.as_ref() < week_ago_timestamp.as_slice() {
                break;
            }
            let entry: ClipboardEntry = bincode::deserialize(&value)?;
            entries.push(entry);
        }

        Ok(entries)
    }

    // // 古いエントリーの削除
    // fn cleanup_old_entries(&self, days: i64) -> Result<(), Box<dyn std::error::Error>> {
    //     let cutoff = Utc::now() - chrono::Duration::days(days);
    //     let cutoff_timestamp = cutoff.timestamp().to_be_bytes();

    //     let mut batch = sled::Batch::default();

    //     for item in self.db.iter().take_while(|item| {
    //         if let Ok((key, _)) = item {
    //             key.as_ref() <= cutoff_timestamp.as_slice()
    //         } else {
    //             false
    //         }
    //     }) {
    //         if let Ok((key, _)) = item {
    //             batch.remove(key);
    //         }
    //     }

    //     self.db.apply_batch(batch)?;
    //     self.db.flush()?;
    //     Ok(())
    // }

    fn delete_all(&self) -> Result<(), Box<dyn std::error::Error>> {
        self.db.clear()?;
        self.db.flush()?;
        Ok(())
    }

    // キーワードによる検索
    fn search(&self, query: &str) -> Result<Vec<ClipboardEntry>, Box<dyn std::error::Error>> {
        let mut results = Vec::new();
        let query = query.to_lowercase();

        for item in self.db.iter() {
            let (_, value) = item?;
            let entry: ClipboardEntry = bincode::deserialize(&value)?;

            if entry.content.to_lowercase().contains(&query) {
                results.push(entry);
            }
        }

        Ok(results)
    }
}

// Tauriコマンド
#[tauri::command]
pub async fn save_clipboard(content: String) -> Result<(), String> {
    let store = ClipboardStore::new().map_err(|e| e.to_string())?;
    store.save_entry(content).map_err(|e| e.to_string())
}

#[tauri::command]
pub async fn get_clips(limit: usize) -> Result<Vec<ClipboardEntry>, String> {
    let store = ClipboardStore::new().map_err(|e| e.to_string())?;
    store.get_entries(limit).map_err(|e| e.to_string())
}

#[tauri::command]
pub async fn clear_history() -> Result<(), String> {
    let store = ClipboardStore::new().map_err(|e| e.to_string())?;
    store.delete_all().map_err(|e| e.to_string())
}

#[tauri::command]
pub fn console_log(content: String) -> Result<(), String> {
    println!("{}", content);
    Ok(())
}

#[tauri::command]
pub async fn get_recent_clips() -> Result<Vec<ClipboardEntry>, String> {
    let store = ClipboardStore::new().map_err(|e| e.to_string())?;
    store.get_recent_clips().map_err(|e| e.to_string())
}
