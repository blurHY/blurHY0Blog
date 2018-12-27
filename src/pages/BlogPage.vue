<template>
	<div class="root p-4 mb-4 mx-3 mx-md-0 rounded">
		<!-- Post Content Column -->
		<div>
			<!-- Title -->
			<h1>{{ this.$route.params.post.title }}</h1>
			<!-- Author -->
			<p class="lead">
				by blurHY /
				{{
					relatime(
						new Date(this.$route.params.post.date_published * 1000)
					)
				}}
			</p>

			<div v-html="marked(this.$route.params.post.body)"></div>

			<div class="form-group mt-5">
				<textarea
					class="form-control"
					rows="3"
					placeholder="Markdown is supported"
				></textarea>
			</div>
			<button type="submit" class="btn btn-primary">Reply</button>

			<coment-component />
			<coment-component>
				<template slot="nested-component">
					<coment-component />
					<coment-component />
					<coment-component />
				</template>
			</coment-component>
		</div>
	</div>
</template>

<script>
import ComentComponent from "../components/CommentComponent.vue";
import hdate from "human-date";
import marked from "marked";

let renderer = new marked.Renderer();

export default {
	components: {
		ComentComponent,
	},
	data() {
		return {};
	},
	methods: {
		relatime: hdate.relativeTime,
		marked() {
			marked.setOptions({ renderer: renderer });
			return marked.apply(this, arguments);
		},
	},
	created() {
		if (!this.$route.params.post) {
			this.zframe
				.getPost(this.$route.params.id)
				.then(val => (this.$route.params.post = val));
		}
	},
	beforeCreate() {},
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
