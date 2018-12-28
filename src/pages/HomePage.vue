<template>
	<div class="px-3 px-md-0 px-lg-2">
		<div
			v-for="post in zdata"
			:key="post.post_id"
			class="card mb-4 shadow-sm border-0 rounded"
		>
			<img :src="get_post_image(post.body)" class="rounded" />
			<div class="card-body">
				<h2 class="card-title">{{ post.title }}</h2>
				<p class="card-text" v-html="get_post_preview(post.body)"></p>
			</div>
			<div class="card-footer text-muted border-0">
				{{ format_date(post.date_published) }}
				<router-link
					class="btn-sm btn-outline-primary mr-2 float-right"
					:to="{
						name: 'BlogPage',
						params: { id: post.post_id, post },
					}"
					>Read More</router-link
				>
			</div>
		</div>
		<div
			:class="[isLoading ? loading : loaded]"
			class="container justify-content-center py-3 pb-4"
		>
			<ScaleLoader color="#02B875" />
		</div>
		<div
			class="btn btn-outline-success btn-block my-4 d-none d-sm-block d-md-none"
		>
			Load more
		</div>
	</div>
</template>

<script>
import hdate from "human-date";
import marked from "marked";
import hljs from "highlight.js";
import "highlight.js/styles/github.css";

var renderer = new marked.Renderer();

renderer.image = function(href, title, text) {
	arguments[2] = "image:" + text;
	return this.link.apply(this, arguments);
};

export default {
	data() {
		return {
			loading: "d-flex",
			loaded: "d-none",
			isLoading: true,
			zdata: [
				// Test data
				{
					post_id: 58,
					title: "Consectetur aliqua pariatur tempor.",
					date_published: 1545487485.722,
					body:
						"Fugiat voluptate mollit elit **duis** nulla. Incididunt aliqua cupidatat elit exercitation eu voluptate sit magna minim nulla do ![main](http://placehold.it/750x300).\n\n ``` Voluptate proident do esse ullamco commodo sint aute non labore nulla non est.```\n\n Anim sit pariatur nulla sint enim velit.",
				},
				{
					post_id: 59,
					title: "Ipsum enim et aliqua incididunt est.",
					date_published: 1233902419.924,
					body:
						"Consequat excepteur do nulla consequat `fugiat` est ad ut. \n - Reprehenderit \n - amet \n - laborum \n\nvelit dolor minim veniam nostrud magna anim. [Incididunt](#) exercitation consequat enim aute eiusmod. \n ```js \nfunction func(){\n  /* comment */\n} \n ```\n",
				},
				{
					post_id: 52,
					title: "Aute tempor magna consectetur.",
					date_published: 1323402419.924,
					body:
						"Eiusmod id et ut in. Non dolore esse laboris minim. \n > Anim enim eiusmod \n\n eiusmod est ipsum magna sunt incididunt labore cupidatat irure. Laboris incididunt nostrud duis aliquip. Pariatur excepteur aliqua quis incididunt non minim do eiusmod.",
				},
			],
		};
	},
	created() {
		this.zframe.getPosts().then(val => (this.zdata = val));
	},
	methods: {
		format_date(date) {
			return hdate.relativeTime(new Date(date * 1000));
		},
		get_post_preview(content) {
			let part = content.split("\n---\n");
			if (part.length > 1) part = part[0];
			else part = content.substr(0, 100);

			marked.setOptions({
				renderer,
				highlight(code) {
					return hljs.highlightAuto(code).value;
				},
			});
			return marked(part);
		},
		get_post_image(content) {
			let main_pic = /!\[main\]\(([^\(\)\[\]]+)\)/.exec(content);
			if (main_pic) main_pic = main_pic[1];
			else {
				main_pic = /!\[.+\]\(([^\(\)\[\]]+)\)/.exec(content);
				if (main_pic) main_pic = main_pic[0];
			}
			return main_pic;
		},
	},
};
</script>

<style></style>
