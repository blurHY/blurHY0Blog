<template>
  <div class="root p-4 mb-4 mx-3 mx-md-0 rounded">
    <!-- Post Content Column -->
    <div>
      <!-- Title -->
      <h1>{{ post.title }}</h1>
      <!-- Author -->
      <p class="lead">
        by blurHY /
        {{
        relatime(
        new Date(post.date_published * 1000)
        )
        }}
      </p>

      <div v-html="marked(post.body)"></div>
      <div class="form-group mt-5">
        <textarea class="form-control" rows="3" placeholder="Markdown is supported"></textarea>
      </div>
      <button type="submit" class="btn btn-primary">Reply</button>
    </div>
    <coment-component
      v-for="comment in comments"
      :username="comment.username"
      :body="comment.body"
      :userpub="comment.userpub"
      :date_added="comment.date_added"
      :key="comment.comment_id"
    />
  </div>
</template>

<script>
import ComentComponent from "../components/CommentComponent.vue";
import hdate from "human-date";
import marked from "marked";

let renderer = new marked.Renderer();

export default {
  components: {
    ComentComponent
  },
  data() {
    return {
      post: {
        title: "Loading ...",
        date_published: Date.now() / 1000,
        body:
          "Culpa occaecat occaecat Lorem cillum excepteur enim quis pariatur sit aute ea esse.\n Nostrud voluptate non esse nostrud ut ex non mollit laboris eu incididunt dolor proident nulla.\n Aute exercitation proident adipisicing id sint aliqua commodo."
      },
      comments: []
    };
  },
  methods: {
    relatime: hdate.relativeTime,
    marked() {
      marked.setOptions({
        renderer: renderer,
        highlight(code) {
          return hljs.highlightAuto(code).value;
        },
        sanitize: false
      });
      return marked.apply(this, arguments);
    }
  },
  created() {
    console.log("this.$route.params", this.$route.params);
    if (!this.$route.params.post) {
      this.zframe.getPost(this.$route.params.id).then(val => {
        try {
          this.post = val[0];
          this.zframe
            .getComments(this.$route.params.id)
            .then(val => (this.comments = val));
        } catch (e) {
          console.log(e);
          this.post = {
            title: "Error: Post doesn't exist",
            date_published: Date.now(),
            body: e
          };
        }
      });
    } else {
      this.post = this.$route.params.post;
      this.zframe
        .getComments(this.$route.params.id)
        .then(val => (this.comments = val));
    }
  }
};
</script>

<style lang="scss">
.root {
  background: white;
  img {
    max-width: 100% !important;
  }
}
</style>
