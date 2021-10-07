import * as SQLite from 'expo-sqlite'

const db = SQLite.openDatabase('post.db')

export class DB {
  static init() {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          `CREATE TABLE IF NOT EXISTS posts (id INTEGER PRIMARY KEY NOT NULL, text TEXT NOT NULL, img TEXT, date TEXT, booked INT)`,
          [],
          resolve,
          (_, err) => reject(err)
        )
      })
    })
  }
  static getPosts() {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          `SELECT * FROM posts`,
          [],
          (_, res) => resolve(res.rows._array),
          (_, err) => reject(err)
        )
      })
    })
  }
  static createPost(post) {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          `INSERT INTO posts (text, date, booked, img) VALUES (?, ?, ?, ?)`,
          [post.text, post.date, 0, post.img],
          (_, res) => resolve(res.insertId),
          (_, err) => reject(err)
        )
      })
    })
  }
  static updatePost(post) {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          'UPDATE posts SET booked = ? WHERE id = ?',
          [post.booked ? 0 : 1, post.id],
          resolve,
          (_, err) => reject(err)
        )
      })
    })
  }
  static removePost(id) {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql('DELETE FROM posts WHERE id = ?', [id], resolve, (_, err) => reject(err))
      })
    })
  }
}
