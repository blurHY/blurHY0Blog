import ZeroFrame from "./zeroframe";
let sqlstring = require("sqlstring-sqlite")

export default class Zero extends ZeroFrame {
  async getPosts(loaded_posts = null, posts_count = 8) {
    let posts = [];

    if (loaded_posts) {
      posts = await this.cmdp(
        "dbQuery",
        `select post_id,title,body,date_published from post order by -date_published limit ${posts_count} offset ${loaded_posts.length}`
      );
      return loaded_posts.concat(posts);
    }

    posts = await this.cmdp(
      "dbQuery",
      `select post_id,title,body,date_published from post order by -date_published limit ${posts_count}`
    );

    return posts;
  }
  async getPost(id) {
    return await this.cmdp(
      "dbQuery",
      `select post_id,title,body,date_published from post where post_id = ${id}`
    );
  }
  async searchPosts(search) {
    let like = `%${sqlstring.format(search)}%`
    let sql = `select post_id,title,body,date_published from post where title like '${like}' or body like '${like}'`
    return await this.cmdp("dbQuery", sql)
  }
  async getComments(post_id) {
    let comments = []
    let sql = `
SELECT comment_id,body,date_added,replace(json.directory,"users/","") as userpub,value as username FROM comment LEFT JOIN json USING (json_id) LEFT JOIN json AS json_content ON (json_content.directory = json.directory AND json_content.file_name='content.json') LEFT JOIN keyvalue ON (keyvalue.json_id = json_content.json_id AND key = 'cert_user_id') where post_id=${post_id}`
    comments = await this.cmdp("dbQuery", sql)
    console.log(comments)
    return comments
  }
}