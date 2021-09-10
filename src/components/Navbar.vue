<template>
	<nav id="navbar">
		<img src="../assets/nav-corner.png" class="img-left" />
		<img src="../assets/nav-corner.png" class="img-right" />
		<router-link to="/" style="z-index: 1"
			><img src="../assets/logo.png" class="logo"
		/></router-link>
		<div class="nav-link-wrapper">
			<router-link
				v-for="link in navLinks"
				:key="link.id"
				class="nav-link"
				:to="link.href"
			>
				{{ link.name }}
			</router-link>
			<svg
				viewBox="0 0 44 44"
				xmlns="http://www.w3.org/2000/svg"
				class="hamburger"
				@click="openDrawer"
			>
				<path
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M4.40002 8.80005C4.01103 8.80005 3.63798 8.95457 3.36293 9.22963C3.08787 9.50468 2.93335 9.87773 2.93335 10.2667C2.93335 10.6557 3.08787 11.0288 3.36293 11.3038C3.63798 11.5789 4.01103 11.7334 4.40002 11.7334H39.6C39.989 11.7334 40.3621 11.5789 40.6371 11.3038C40.9122 11.0288 41.0667 10.6557 41.0667 10.2667C41.0667 9.87773 40.9122 9.50468 40.6371 9.22963C40.3621 8.95457 39.989 8.80005 39.6 8.80005H4.40002ZM2.93335 22C2.93335 21.6111 3.08787 21.238 3.36293 20.963C3.63798 20.6879 4.01103 20.5334 4.40002 20.5334H39.6C39.989 20.5334 40.3621 20.6879 40.6371 20.963C40.9122 21.238 41.0667 21.6111 41.0667 22C41.0667 22.389 40.9122 22.7621 40.6371 23.0371C40.3621 23.3122 39.989 23.4667 39.6 23.4667H4.40002C4.01103 23.4667 3.63798 23.3122 3.36293 23.0371C3.08787 22.7621 2.93335 22.389 2.93335 22ZM2.93335 33.7334C2.93335 33.3444 3.08787 32.9713 3.36293 32.6963C3.63798 32.4212 4.01103 32.2667 4.40002 32.2667H39.6C39.989 32.2667 40.3621 32.4212 40.6371 32.6963C40.9122 32.9713 41.0667 33.3444 41.0667 33.7334C41.0667 34.1224 40.9122 34.4954 40.6371 34.7705C40.3621 35.0455 39.989 35.2001 39.6 35.2001H4.40002C4.01103 35.2001 3.63798 35.0455 3.36293 34.7705C3.08787 34.4954 2.93335 34.1224 2.93335 33.7334Z"
				></path>
			</svg>
			<div
				class="wrapper"
				v-on="{
					click: hasSessionTicket ? redirectAccount : showLoginModal,
				}"
			>
				<img src="../assets/user.png" class="user" />
			</div>
		</div>
		<div :class="{ drawer: true, open: isOpen }">
			<div class="close-drawer">
				<svg
					width="41"
					height="41"
					viewBox="0 0 41 41"
					class="close"
					xmlns="http://www.w3.org/2000/svg"
					@click="closeDrawer"
				>
					<path
						d="M20.5 20.5L32.4583 32.4583"
						stroke="white"
						stroke-width="2"
						stroke-linecap="round"
					/>

					<path
						d="M20.4998 20.5L8.5415 8.54169"
						stroke="white"
						stroke-width="2"
						stroke-linecap="round"
					/>

					<path
						d="M20.4998 20.5L8.5415 32.4583"
						stroke="white"
						stroke-width="2"
						stroke-linecap="round"
					/>

					<path
						d="M20.5 20.5L32.4583 8.54169"
						stroke="white"
						stroke-width="2"
						stroke-linecap="round"
					/>
				</svg>
			</div>

			<div class="navigation-content">
				<div class="navigation-links">
					<div
						class="link-container"
						v-for="link in navLinks"
						:key="link.id"
					>
						<router-link
							:to="link.href"
							:class="{
								active: $route.path.includes(link.href),
							}"
							@click="closeDrawer"
							>{{ link.name }}</router-link
						>
					</div>
					<div
						class="link-container"
						@click="closeDrawer"
						v-if="hasSessionTicket"
					>
						<router-link to="/account/profile"
							>My Profile</router-link
						>
					</div>
					<div
						class="link-container"
						@click="closeDrawer"
						v-if="hasSessionTicket"
					>
						<router-link to="/account/nfts">My NFTs</router-link>
					</div>
					<div
						class="link-container"
						@click="closeDrawer"
						v-if="hasSessionTicket"
					>
						<router-link to="/account/achievements"
							>Achievements</router-link
						>
					</div>
					<div
						class="link-container"
						@click="closeDrawer"
						v-if="hasSessionTicket"
					>
						<router-link to="/account/leaderboards"
							>Leaderboards</router-link
						>
					</div>

					<div
						style="
							display: flex;
							text-align: center;
							margin-top: 32px;
						"
						v-if="hasSessionTicket"
					>
						<a
							style="flex-grow: 1"
							class="link"
							href="/"
							@click="signOut"
							>Sign out</a
						>
					</div>
				</div>
			</div>
		</div>
	</nav>
	<LoginModal
		:isShowing="isShowing"
		v-if="!hasSessionTicket"
		@closeModal="hideLoginModal"
	/>
</template>

<script>
import LoginModal from './LoginModal.vue';
export default {
	name: 'Navbar',
	props: {
		navLinks: Array,
	},
	data() {
		return { isShowing: false, hasSessionTicket: false, isOpen: false };
	},
	methods: {
		showLoginModal() {
			this.isShowing = !this.isShowing;
		},
		hideLoginModal() {
			this.isShowing = false;
		},
		redirectAccount() {
			location.replace('/');
		},
		closeDrawer() {
			this.isOpen = false;
			document.querySelector('body').style.overflow = 'auto';
		},
		openDrawer() {
			this.isOpen = true;
			document.querySelector('body').style.overflow = 'hidden';
		},
		signOut() {
			localStorage.removeItem('SessionTicket');
			localStorage.removeItem('EntityToken');
		},
	},
	components: {
		LoginModal,
	},
	mounted() {
		const SessionTicket = localStorage.getItem('SessionTicket');
		if (SessionTicket) {
			this.hasSessionTicket = true;
		}
	},
};
</script>

<style scoped>
#navbar {
	background-color: red;
	height: 80px;
	background-repeat: no-repeat;
	background-position: right;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0 120px;
	position: relative;
	background-color: #0c0e11;
}

.hamburger {
	fill: #fff;
	width: 2em;
	height: 2em;
	display: none;
	cursor: pointer;
	z-index: 1;
}

.img-left {
	position: absolute;
	left: 0;
	height: 80px;
	animation: fade ease-in 1s;
	z-index: 0;
}

.img-right {
	position: absolute;
	right: 0;
	height: 80px;
	z-index: 0;
	animation: fade ease-in 1s;
	transform: scaleX(-1);
}

@keyframes fade {
	0% {
		opacity: 0.1;
	}
	100% {
		opacity: 1;
	}
}

.user {
	max-height: 24px;
	user-select: none;
}

.logo {
	max-height: 40px;
}
.nav-link {
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	color: #fff;
	text-decoration: none;
	background-position: center;
	position: relative;
	z-index: 0;
}

.nav-link::before {
	content: '';
	background-image: url('../assets/navbar-link-hover.png');
	width: 146px;
	height: 80px;
	position: absolute;
	background-size: contain;
	background-repeat: no-repeat;
	z-index: -1;
	opacity: 0;
	transition: 300ms ease-in-out;
	pointer-events: none;
}

.nav-link:hover::before {
	opacity: 1;
}
.wrapper {
	padding: 9px;
	display: flex;
	align-items: flex-start;
	z-index: 1;
	cursor: pointer;
	border: 1px solid #4fe8ff;
	background-color: #1f2329;
}

.nav-link-wrapper {
	display: flex;
	gap: 32px;
	height: 100%;
	align-items: center;
}

@media (max-width: 1080px) {
	.nav-link {
		display: none;
	}
}

@media (max-width: 500px) {
	.nav-link {
		display: none;
	}
	#navbar {
		padding: 0 64px;
	}
}

@media (max-width: 1078px) {
	.hamburger {
		display: flex;
	}
}

.drawer {
	background-color: #0c0e11;
	width: 100%;
	height: 100%;
	position: fixed;
	top: 0;
	right: -100%;
	transition: 0.5s;
	z-index: 10;
	overflow: auto;
	z-index: 10000;
}

.drawer.open {
	right: 0%;
}

.close-drawer {
	display: flex;
	justify-content: flex-start;
}

.drawer-links {
	display: -webkit-box;
	display: -webkit-flex;
	display: -ms-flexbox;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 32px;
	justify-content: center;
	width: 100%;
	height: 100%;
}

.drawer-link {
	color: #ffffff;
	font-size: 16px;
	text-transform: capitalize;
	font-weight: 600;
	opacity: 1;
	padding: 0 10px;
	text-decoration: none;
}

.drawer-link.active {
	opacity: 1;
}

.close {
	fill: #fff;
	margin-top: 16px;
	margin-right: 48px;
	margin-left: auto;
	cursor: pointer;
}
.navigation-content {
	margin: 0 auto;
}

.link-container {
	height: auto;
}

.link-container a:hover {
	opacity: 1;
}

.navigation-content {
	z-index: 1;
	flex-grow: 1;
	padding: 64px;
	width: 300px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
}

.navigation-links {
	display: flex;
	flex-direction: column;
	text-align: center;
	gap: 32px;
}

.navigation-links a {
	text-decoration: none;
	color: #fff;
	opacity: 0.7;
	position: relative;
	font-size: 18px;
}
</style>
