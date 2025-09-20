// import * as SQLite from 'expo-sqlite';

// export const db = SQLite.openDatabase('cinema_unlimited.db');

// // Initialize database table
// export const initDatabase = () => {
//   db.transaction(tx => {
//     tx.executeSql(
//       `CREATE TABLE IF NOT EXISTS upload_drafts (
//         id INTEGER PRIMARY KEY AUTOINCREMENT,
//         title TEXT,
//         description TEXT,
//         category TEXT,
//         video_file_path TEXT,
//         thumbnail_path TEXT,
//         duration REAL,
//         progress REAL DEFAULT 0,
//         upload_state TEXT DEFAULT 'idle',
//         created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
//         updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
//       );`,
//       [],
//       () => console.log('Database initialized successfully'),
//       (tx, error) => console.error('Error initializing database:', error)
//     );
//   });
// };

// // Save draft to database
// export const saveDraftToDB = state => {
//   return new Promise((resolve, reject) => {
//     db.transaction(tx => {
//       tx.executeSql(
//         `INSERT OR REPLACE INTO upload_drafts (
//           id, title, description, category, video_file_path, thumbnail_path,
//           duration, progress, upload_state, updated_at
//         ) VALUES (
//           1, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now')
//         );`,
//         [
//           state.title || '',
//           state.description || '',
//           state.category || '',
//           state.localVideoFile?.uri || '',
//           state.selectedThumb?.uri || '',
//           state.duration || 0,
//           state.progress || 0,
//           state.uploadState || 'idle'
//         ],
//         (tx, result) => {
//           console.log('Draft saved to database successfully');
//           resolve(result);
//         },
//         (tx, error) => {
//           console.error('Error saving draft to database:', error);
//           reject(error);
//         }
//       );
//     });
//   });
// };

// // Load draft from database
// export const loadDraftFromDB = () => {
//   return new Promise((resolve, reject) => {
//     db.transaction(tx => {
//       tx.executeSql(
//         'SELECT * FROM upload_drafts WHERE id = 1;',
//         [],
//         (tx, results) => {
//           if (results.rows.length > 0) {
//             const draft = results.rows.item(0);
//             console.log('Draft loaded from database:', draft);
//             resolve(draft);
//           } else {
//             resolve(null);
//           }
//         },
//         (tx, error) => {
//           console.error('Error loading draft from database:', error);
//           reject(error);
//         }
//       );
//     });
//   });
// };
