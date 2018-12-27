import ZeroFrame from "./zeroframe";

export default class Zero extends ZeroFrame {
  async getPosts(loaded_posts = null, posts_count = 10) {
    let posts;
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
      `select post_id,title,body,date_published from post where post_id={id}`
    );
  }
}