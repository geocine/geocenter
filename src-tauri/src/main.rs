#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use tauri::{Window};

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet, fullscreen_change])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}!", name)
}

// tauri command for fullscreen change from js
#[tauri::command]
fn fullscreen_change(window: Window, is_fullscreen: bool) {
    if is_fullscreen {
        window.set_fullscreen(true).unwrap();
    } else {
        window.set_fullscreen(false).unwrap();
    }
}
