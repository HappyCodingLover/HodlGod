<template>
	<transition name="fade">
		<form class="overlay" @submit.prevent="submit" v-show="isShowing">
			<Input placeholder="Username" type="text" />
			<Input placeholder="Password" type="password" />
			<div class="links">
				<router-link to="/reset" @click="this.$emit('closeModal')"
					>Forgot Password?</router-link
				>
				<span class="separator">|</span>
				<router-link to="/register" @click="this.$emit('closeModal')"
					>Sign Up</router-link
				>
			</div>
			<p class="error" v-show="error">{{ error }}</p>
			<Button title="Login" type="submit" />
		</form>
	</transition>
</template>

<script>
import Input from './Input.vue';
import Button from './Button.vue';

export default {
	name: 'LoginModal',
	props: {
		isShowing: Boolean,
	},
	data() {
		return {
			error: '',
		};
	},
	methods: {
		async submit(e) {
			const [usernameInput, passwordInput] = e.target.elements;
			const username = usernameInput.value;
			const password = passwordInput.value;
			await this.loginWithPlayFab(username, password, () => {
				usernameInput.value = '';
				passwordInput.value = '';
			});
			usernameInput.value = '';
			passwordInput.value = '';
		},
		async loginWithPlayFab(username, password, clearFormData) {
			const url = 'https://f10ef.playfabapi.com/Client/LoginWithPlayFab';

			// Make dynamic input for username and password
			const data = JSON.stringify({
				TitleId: 'F10EF',
				Username: username,
				Password: password,
			});

			const response = await fetch(url, {
				headers: {
					'Content-Type': 'application/json',
				},
				method: 'POST',
				body: data,
			});

			const result = await response.json();
			if (result.errorMessage) {
				this.error = result.errorMessage;
				clearFormData();
			} else {
				// Set SessionTicket
				const SessionTicket = result.data.SessionTicket;
				window.localStorage.setItem(
					'SessionTicket',
					JSON.stringify(SessionTicket)
				);

				// Set EntityToken
				const EntityToken = result.data.EntityToken.EntityToken;
				window.localStorage.setItem(
					'EntityToken',
					JSON.stringify(EntityToken)
				);
				location.replace('/account');
			}
		},
	},
	components: {
		Input,
		Button,
	},
	mounted() {
		const form = document.querySelector('.overlay');
		const wrapper = document.querySelector('.wrapper');
		document.addEventListener('click', ev => {
			if (
				this.$parent.isShowing &&
				!form.contains(ev.target) &&
				!wrapper.contains(ev.target)
			) {
				this.$parent.isShowing = false;
				this.error = '';
			}
		});
	},
};
</script>

<style>
.overlay {
	position: absolute;
	max-width: 330px;
	width: 100%;
	min-height: 100px;
	background: rgba(3, 4, 4, 1);
	top: 80px;
	right: 114px;
	display: flex;
	flex-direction: column;
	padding: 50px 30px 0 30px;
	z-index: 1000;
}

.error {
	color: #dc3545;
	text-align: center;
	margin: 0;
	margin-top: 16px;
}

.links {
	display: flex;
	color: #fff;
	justify-content: center;
}

.links > a {
	font-size: 12px;
	color: #fff;
	text-decoration: none;
	transition: 300ms;
}

.links > a:hover {
	text-decoration: underline;
}

.separator {
	margin: 0 8px;
}

.fade-enter-from {
	opacity: 0;
}

.fade-enter-to {
	opacity: 1;
}

.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
	opacity: 0;
}

@media (max-width: 500px) {
	.overlay {
		right: 61px;
	}
}

@media (max-width: 412px) {
	.overlay {
		right: unset;
		top: 80px;
		max-width: 100vw;
		height: calc(100vh - 80px);
		z-index: 100000;
	}
}
</style>
