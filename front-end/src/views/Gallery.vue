<template>
	<div class="gallery-conatiner">
		<h2 class="gal-title">Explore the Computational Universe!</h2>
		<WorldCollection :worlds="worlds" />
	</div>
</template>

<script>
import axios from "axios";
import WorldCollection from "@/components/WorldCollection.vue";

export default {
	name: "Gallery",
	components: {
		WorldCollection,
	},
	data() {
		return {
			worlds: [],
		};
	},
	created() {
		this.getAllWorlds();
	},
	methods: {
		async getAllWorlds() {
			try {
				let response = await axios.get("/api/worlds/all");
				this.worlds = response.data;
			} catch (error) {
				this.error = "Error: " + error.response.data.message;
			}
		},
	},
};
</script>

<style scoped="">
.gallery-conatiner {
	box-sizing: border-box;
	max-width: 1350px;
	margin: auto;
	padding: 30px 40px;
}
.gal-title {
	color: #000;
	font-size: 30px;
}
</style>
