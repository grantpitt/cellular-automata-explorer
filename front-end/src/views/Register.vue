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
					<legend>Register</legend>
					<input
						placeholder="first name"
						type="text"
						name="firstName"
						v-model="firstName"
					/>
					<input
						placeholder="last name"
						type="text"
						name="lastName"
						v-model="lastName"
					/>
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
						@click.prevent="register"
					>
						Register
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
	name: "register",
	data() {
		return {
			firstName: "",
			lastName: "",
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
		async register() {
			this.error = "";
			this.errorLogin = "";
			if (
				!this.firstName ||
				!this.lastName ||
				!this.username ||
				!this.password
			)
				return;
			try {
				let response = await axios.post("/api/users", {
					firstName: this.firstName,
					lastName: this.lastName,
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
};
</script>

<style></style>
