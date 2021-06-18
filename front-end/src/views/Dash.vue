<template>
	<div class="dash">
		<CellularAutomata></CellularAutomata>
	</div>
</template>

<script>
// import axios from "axios";
import CellularAutomata from "@/components/CellularAutomata.vue";
export default {
	name: "dash",
	components: {
		CellularAutomata,
	},
	created() {
		window.scrollTo({
			top: 0,
		});
	},
};
</script>

<style></style>
