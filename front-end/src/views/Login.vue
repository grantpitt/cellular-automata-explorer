<template>
	<div class="auth">
		<div class="general-rel-wrap flex">
			<span class="general-abs-wrap">
				<img
					id="front-img"
					class="general-img-cover"
					src="@/assets/CA_rule110s.png"
					alt=""
				/>
			</span>
			<div class="center">
				<form class="login-box">
					<legend>Login</legend>
					<input
						placeholder="username"
						type="text"
						name="username"
						v-model="username"
					/>
					<input
						placeholder="password"
						type="password"
						name="password"
						v-model="password"
					/>
					<button
						type="submit"
						class="submit-btn"
						@click.prevent="login"
					>
						Login
					</button>
					<p v-if="error" class="error">{{ error }}</p>
				</form>
			</div>
		</div>
	</div>
</template>

<script>
import axios from "axios";
export default {
	name: "login",
	data() {
		return {
			username: "",
			password: "",
			error: "",
		};
	},
	created() {
		if (this.$root.$data.user) {
			this.$router.push({ name: "Dash" });
		}
	},
	methods: {
		async login() {
			this.error = "";
			if (!this.username || !this.password) return;
			try {
				let response = await axios.post("/api/users/login", {
					username: this.username,
					password: this.password,
				});
				this.$root.$data.user = response.data.user;
				this.$router.push({ name: "Dash" });
			} catch (error) {
				this.error = "Error: " + error.response.data.message;
				this.$root.$data.user = null;
			}
		},
	},
	computed: {
		user() {
			return this.$root.$data.user;
		},
	},
};
</script>

<style>
.auth {
	height: calc(94vh - 46px);
	display: flex;
	max-width: 100%;
	position: relative;
}
.center {
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	align-content: center;
}
.login-box {
	z-index: 999;
	background-color: var(--c9-terminal);
	border: 2px solid #dcdcdc;
	padding: 3em;
	display: grid;
	border: 1px solid #000;
}
.login-box legend {
	font-size: 2em;
	font-weight: 700;
	margin: 10px;
}
.login-box input {
	font-family: inherit;
	margin: 10px;
	padding: 5px;
	font-size: 1.4em;
	border: 1px solid #000;
}
.submit-btn {
	padding: 5px;
	margin: 10px;
	background-color: var(--gradient-3) !important;
	color: #fff;
	font-size: 1.2em;
	border: 1px solid #000;
}
.submit-btn:hover {
	opacity: 0.9;
}

.error {
	margin: 10px;
	display: inline;
	text-align: center;
	box-sizing: border-box;
	padding: 5px 20px;
	font-size: 12px;
	background-color: #d9534f;
	color: #fff;
	border: 1px solid #000;
}
</style>
