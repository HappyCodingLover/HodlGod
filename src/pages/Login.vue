<template>
	<div class="login-page">
		<div class="buttons-wrapper">
			<router-link to="/register" class="button">
				<img
					src="../assets/hovered.png"
					class="button-background hovered"
				/>
				<img src="../assets/unhovered.png" class="button-background" />
				<div class="title">
					<p>Buy <span>NFT</span>s Now</p>
				</div>
			</router-link>
			<router-link to="/register" class="button">
				<img
					src="../assets/hovered.png"
					class="button-background hovered"
				/>
				<img src="../assets/unhovered.png" class="button-background" />
				<div class="title">
					<p>How to <span>Play</span></p>
				</div>
			</router-link>
		</div>
	</div>
</template>

<script>
import Navbar from '../components/Navbar.vue';
import { navLinks } from '../navlinks';

export default {
	name: 'Login',
	components: {
		Navbar,
	},
	data() {
		return {
			navLinks,
			effect1: false,
		};
	},
};
</script>

<style scoped>
.login-page {
	flex-grow: 1;
	display: flex;
	align-items: flex-end;
}
.buttons-wrapper {
	margin: 0 auto;
	display: flex;
	gap: 32px;
	margin-bottom: 48px;
}

.title {
	color: #fff;
	position: absolute;
	z-index: 999px;
	inset: 0;
	display: flex;
	justify-content: center;
	align-items: center;
}

.title > p {
	margin: 0;
	color: rgba(255, 255, 255, 0.6);
}

.title > p > span {
	color: rgba(255, 255, 255, 1) !important;
	font-weight: bold;
}

.button {
	max-width: 300px;
	margin: 16px;
	position: relative;
	transition: 0.3s ease-in;
	cursor: pointer;
}

.button-background {
	width: 100%;
	height: auto;
}

.button-background.hovered {
	position: absolute;
	opacity: 0;
	transition: 0.3s ease-in;
}

.button:hover img {
	box-shadow: 0px 0px 10px 0px #2cadff;
}

.button:hover .button-background.hovered {
	opacity: 1;
}

@media (max-width: 500px) {
	.buttons-wrapper {
		flex-direction: column;
		gap: 0;
	}
}
</style>
