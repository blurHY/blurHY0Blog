<template>
	<footer class="text-muted py-2">
		<div class="container">
			<div class="row">
				<div
					class="col-xs-12 col-sm-12 col-md-12 mt-2 mt-sm-2 text-center text"
				>
					<p>Powered by Zeronet,Bootstrap and Vue</p>
					<p>
						Copyright © 2018 blurHY
						<a
							href="https://creativecommons.org/licenses/by-sa/4.0/"
						>
							<font-awesome-icon
								:icon="['fab', 'creative-commons']"
							></font-awesome-icon>
							<font-awesome-icon
								:icon="['fab', 'creative-commons-by']"
							></font-awesome-icon>
							<font-awesome-icon
								:icon="['fab', 'creative-commons-sa']"
							></font-awesome-icon>
						</a>
					</p>
				</div>
			</div>
		</div>
	</footer>
</template>

<script>
export default {
	props: {
		showLinks: {
			required: false,
			default: false,
			type: Boolean,
		},
	},
	data() {
		return {};
	},
};
</script>

<style scoped>
footer {
	position: relative;
	bottom: 0;
}
</style>
