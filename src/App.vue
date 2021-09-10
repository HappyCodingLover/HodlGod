<template>
	<Navbar :navLinks="navLinks" />
	<div class="content">
		<router-view />
	</div>
</template>

<script>
import Navbar from './components/Navbar.vue';
import { navLinks } from './navlinks';

export default {
	name: 'App',
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
// This starter template is using Vue 3 experimental <script setup> SFCs
// Check out https://github.com/vuejs/rfcs/blob/master/active-rfcs/0040-script-setup.md
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative&family=Montserrat&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative&family=Montserrat:wght@400;700&display=swap');
#app {
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	margin: 0;
	font-family: 'Montserrat', sans-serif;
}
body {
	margin: 0;
}
.content {
	min-height: calc(100vh - 80px);
	background-image: url('./assets/content-background.png');
	background-size: cover;
	background-repeat: no-repeat;
	background-position: center center;
	background-color: #0c0e11;
	display: flex;
}
* {
	box-sizing: border-box;
}
::-webkit-scrollbar-track {
	background-color: #0c0f12;
}

::-webkit-scrollbar {
	width: 6px;
}

::-webkit-scrollbar-thumb {
	background-color: #38bed3;
}
</style>
