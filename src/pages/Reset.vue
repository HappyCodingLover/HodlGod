<template>
	<div class="reset-page">
		<form class="reset-form" @submit.prevent="handleReset">
			<img src="../assets/reset.png" class="reset-background" />
			<div class="wrapper">
				<p class="text">
					If an account is associated with this e-mail, you will
					receive a message with a link to reset your password
				</p>
				<Input
					style="max-width: 500px; width: calc(100% - 50px)"
					placeholder="E-mail"
					type="email"
				/>
				<p class="error" v-if="error" style="margin-top: 0">
					{{ error }}
				</p>
			</div>
			<div style="position: absolute; bottom: -50px; width: 100%">
				<Button title="Reset" />
			</div>
		</form>
	</div>
</template>
<script>
import Button from '../components/Button.vue';
import Input from '../components/Input.vue';

export default {
	name: 'Reset',
	components: { Button, Input },
	data() {
		return {
			error: '',
		};
	},
	methods: {
		async handleReset(ev) {
			const url =
				'https://f10ef.playfabapi.com/Client/SendAccountRecoveryEmail';
			const [emailInput] = ev.target.elements;
			const email = emailInput.value;
			const data = {
				Email: email,
				TitleId: 'F10EF',
			};

			const response = await fetch(url, {
				method: 'POST',
				headers: {
					'Content-Type': 'Application/json',
				},
				body: JSON.stringify(data),
			});

			const result = await response.json();

			if (result.errorMessage) {
				this.error = result.errorMessage;
				emailInput.value = '';
			} else {
				location.replace('/');
			}
		},
	},
};
</script>
<style scoped>
* {
	box-sizing: border-box;
}
.reset-page {
	flex-grow: 1;
	display: flex;
	justify-content: center;
	align-items: center;
}
.reset-form {
	max-width: 900px;
	width: 100%;
	position: relative;
}
.reset-background {
	width: 100%;
	top: 0;
}

.text {
	color: #fff;
	font-size: 20px;

	padding: 32px;
	text-align: center;
	max-width: 600px;
	width: 100%;
}

.wrapper {
	position: absolute;
	top: 0;
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
}
@media (max-width: 929px) {
	.reset-background {
		display: none;
	}
	.reset-form {
		height: 340px;
	}
}
@media (max-width: 929px) {
	.reset-background {
		display: none;
	}
	.reset-form {
		height: 340px;
	}
	.reset-page {
		background-image: url('../assets/register-background.png');
		background-size: cover;
		background-repeat: repeat-y;
	}
}
</style>
