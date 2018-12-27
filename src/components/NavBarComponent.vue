<template>
	<b-navbar
		type="light"
		variant="light"
		fixed="top"
		toggleable="md"
		class="d-flex"
	>
		<div
			class="container d-flex flex-lg-nowrap flex-wrap align-items-center"
		>
			<b-navbar-brand class="flex-grow-0">
				<img
					src="../assets/huaji_rect_17kb.png"
					width="30"
					height="30"
					class="d-inline-block align-top"
					alt
				/>
				blurHY
			</b-navbar-brand>
			<b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
			<b-collapse is-nav class="flex-grow-1" id="nav_collapse">
				<b-navbar-nav class="ml-sm-0 mr-xl-5 flex-grow-1">
					<b-nav-item href="#">
						<router-link class="nav-link" :to="{ name: 'HomePage' }"
							>Home</router-link
						>
					</b-nav-item>
					<b-nav-item href="#">
						<router-link
							class="nav-link"
							:to="{ name: 'AboutPage' }"
							>About</router-link
						>
					</b-nav-item>
					<b-nav-item href="#">
						<router-link
							class="nav-link"
							:to="{ name: 'ContactPage' }"
							>Contact</router-link
						>
					</b-nav-item>
				</b-navbar-nav>
				<div class="form-inline flex-lg-nowrap" v-if="showSearchbar">
					<input
						class="form-control mr-sm-2"
						type="search"
						placeholder="Search"
						aria-label="Search"
					/>
					<button
						class="btn btn-outline-success my-2 my-sm-0 disabled"
						type="submit"
						@click.prevent
					>
						Search
					</button>
				</div>
			</b-collapse>
		</div>
	</b-navbar>
</template>

<script>
export default {
	props: {
		showSearchbar: {
			requried: false,
			default: true,
			type: Boolean,
		},
	},
	data() {
		return {
			selectedTabIndex: 1,
		};
	},
};
</script>

<style lang="scss">
.navbar {
	font-size: 16px;
	font-weight: bold;
	@media screen and (max-width: 992px) {
		.container {
			max-width: initial;
		}
	}
}
</style>
