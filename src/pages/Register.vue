<template>
	<div class="register-page">
		<div class="registration-form background">
			<form
				class="registration-form"
				style="box-sizing: border-box"
				@submit.prevent="handleRegister"
			>
				<h1 class="title">REGISTER</h1>
				<label class="label">Username</label>
				<Input textAlign="start" autofocus :required="true" />
				<label class="label">E-mail</label>
				<Input textAlign="start" :required="true" type="email" />
				<div
					style="
						display: flex;
						justify-content: space-between;
						box-sizing: border-box;
					"
					class="container"
				>
					<div
						style="
							display: flex;
							flex-direction: column;
							box-sizing: border-box;
						"
					>
						<label class="label">Password</label>
						<Input
							textAlign="start"
							:required="true"
							type="password"
						/>
					</div>
					<div
						style="
							display: flex;
							flex-direction: column;
							box-sizing: border-box;
						"
					>
						<label class="label">Confirm Password</label>
						<Input
							textAlign="start"
							:required="true"
							type="password"
						/>
					</div>
				</div>
				<p class="error" v-show="error">{{ error }}</p>
				<Button title="Register" />
			</form>
		</div>
	</div>
</template>

<script>
import Input from '../components/Input.vue';
import Button from '../components/Button.vue';
export default {
	name: 'Register',
	components: {
		Input,
		Button,
	},
	data() {
		return {
			erorr: '',
		};
	},
	methods: {
		validateEmail(email) {
			const re =
				/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			return re.test(String(email).toLowerCase());
		},
		async handleRegister(e) {
			const [
				usernameInput,
				emailInput,
				passwordInput,
				confirmPasswordInput,
			] = e.target.elements;
			const username = usernameInput.value;
			const email = emailInput.value;
			const password = passwordInput.value;
			const confirmPassword = confirmPasswordInput.value;
			await this.CreateAccount(
				username,
				email,
				password,
				confirmPassword,
				() => {
					usernameInput.value = '';
					emailInput.value = '';
					passwordInput.value = '';
					xconfirmPasswordInput.value = '';
				}
			);
		},
		async CreateAccount(
			username,
			email,
			password,
			confirmPassword,
			clearFormData
		) {
			if (password !== confirmPassword) {
				this.error = 'Passwords do not match';
				clearFormData;
				return;
			}

			if (!this.validateEmail(email)) {
				this.error = 'Invalid email';
				return;
			}

			const userInfo = {
				TitleId: 'F10EF',
				Email: email,
				Username: username,
				Password: password,
			};

			try {
				const response = await fetch(
					'https://titleId.playfabapi.com/Client/RegisterPlayFabUser',
					{
						headers: {
							'Content-Type': 'application/json',
						},
						method: 'POST',
						body: JSON.stringify(userInfo),
					}
				);
				const res = await response.json();
				//can add auto reidrect to account with session ticket
				if (res.errorMessage) {
					this.err = res.errorMessage;
					clearFormData();
				} else {
					location.replace('/');
				}
			} catch (err) {
				this.error = 'Something went wrong Please try again';
			}
		},
	},
};
</script>

<style scoped>
.label {
	color: #fff;
	margin-bottom: 8px;
}

.error {
	color: #dc3545;
	text-align: center;
	margin: 0;
	margin-top: 16px;
}

.title {
	font-weight: bold;
	font-size: 18px;
	color: #fff;
	text-align: center;
	margin-bottom: 128px;
}
.register-page {
	flex-grow: 1;
	display: flex;
}

.registration-form {
	display: flex;
	flex-direction: column;
	margin: 0 auto;
	max-width: 500px;
	height: 100%;
	width: 100%;
	justify-content: center;
	padding: 0 16px;
}

.registration-form.background {
	max-width: 600px !important;
	background-image: url('../assets/register-background.png');
	background-size: cover;
	background-repeat: repeat-y;
}
@media (min-width: 2000px) {
	.registration-form.background {
		max-width: 900px !important;
	}
}

@media (max-width: 499px) {
	.container {
		flex-direction: column;
	}
	.title {
		margin-bottom: 32px;
	}
}

@media (max-width: 360px) {
	.title {
		margin-top: 32px;
	}
}
</style>
