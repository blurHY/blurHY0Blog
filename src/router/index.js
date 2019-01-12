import Vue from "vue";
import Router from "vue-router";

import HomePage from "@/pages/HomePage";
import AboutPage from "@/pages/AboutPage";
import ContactPage from "@/pages/ContactPage";
import BlogPage from "@/pages/BlogPage";

Vue.use(Router);

export default new Router({
	mode: "hash",
	routes: [{
			path: "/",
			name: "HomePage",
			component: HomePage,
		},
		{
			path: "/Post:id",
			name: "BlogPage",
			component: BlogPage,
		},
		{
			path: "/About",
			name: "AboutPage",
			component: AboutPage,
		},
		{
			path: "/Contact",
			name: "ContactPage",
			component: ContactPage,
		},
	],
	scrollBehavior(to, from, savedPosition) {
		if (savedPosition) return savedPosition;
		return {
			x: 0,
			y: 0,
		};
	},
});