<template>
	<div class="accounts-page">
		<div class="panel">
			<div class="panel-navigation">
				<img class="image-top" src="../assets/bg2.png" />
				<div class="navigation-content">
					<div class="navigation-links">
						<div class="link-container">
							<router-link
								to="/account/profile"
								:class="{
									active:
										$route.path === '/account/profile' ||
										$route.path === '/account',
								}"
								>My Profile</router-link
							>
							<img
								src="../assets/hover-3.png"
								class="active-img"
								v-if="
									$route.path === '/account' ||
									$route.path === '/account/profile'
								"
							/>
						</div>
						<div class="link-container">
							<router-link
								to="/account/nfts"
								:class="{
									active: $route.path === '/account/nfts',
								}"
								>My NFTs</router-link
							>
							<img
								src="../assets/hover-3.png"
								class="active-img"
								v-if="$route.path === '/account/nfts'"
							/>
						</div>
						<div class="link-container">
							<router-link
								to="/account/achievements"
								:class="{
									active:
										$route.path === '/account/achievements',
								}"
								>Achievements</router-link
							>
							<img
								src="../assets/hover-3.png"
								class="active-img"
								v-if="$route.path === '/account/achievements'"
							/>
						</div>
						<div class="link-container">
							<router-link
								to="/account/leaderboards"
								:class="{
									active:
										$route.path === '/account/leaderboards',
								}"
								>Leaderboards</router-link
							>
							<img
								src="../assets/hover-3.png"
								class="active-img"
								v-if="$route.path === '/account/leaderboards'"
							/>
						</div>
					</div>
					<div style="display: flex; text-align: center">
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
			<div class="spinner-wrapper" v-if="isLoading">
				<div class="spinner">
					<div class="bounce1"></div>
					<div class="bounce2"></div>
					<div class="bounce3"></div>
				</div>
			</div>
			<div class="panel-content" v-else>
				<router-view
					:userInfo="userInfo"
					@updateWax="updateUserWAX"
				></router-view>
			</div>
		</div>
	</div>
</template>

<script>
const SECRET_KEY = 'QJ9D75PFW8U19I9PGKCNNOABQ4NMY6MC1C3KPOZP5N3976P6H3';
export default {
	name: 'Account',
	data() {
		return {
			userInfo: {},
			isLoading: true,
		};
	},
	async mounted() {
		const SessionTicket = JSON.parse(
			window.localStorage.getItem('SessionTicket')
		);
		const url =
			'https://f10ef.playfabapi.com/Server/AuthenticateSessionTicket';
		const response = await fetch(url, {
			method: 'POST',
			headers: {
				'X-SecretKey': SECRET_KEY,
				'Content-Type': 'Application/json',
			},
			body: JSON.stringify({
				SessionTicket,
			}),
		});

		const result = await response.json();
		if (result.data.IsSessionTicketExpired) {
			window.localStorage.removeItem('SessionTicket');
			window.localStorage.removeItem('EntityToken');
			location.replace('/');
			return;
		}

		let WaxAddress;
		const userInfo = await this.GetUserInfo(SessionTicket);
		const EntityToken = JSON.parse(
			window.localStorage.getItem('EntityToken')
		);
		if (EntityToken) {
			WaxAddress = await this.getWaxAddress(EntityToken);
		}
		if (WaxAddress) {
			this.userInfo = { ...userInfo, WaxAddress };
		} else {
			this.userInfo = { ...userInfo };
		}
		this.isLoading = false;
	},
	methods: {
		signOut() {
			localStorage.removeItem('SessionTicket');
			localStorage.removeItem('EntityToken');
		},
		async getWaxAddress(EntityToken) {
			const url =
				'https://f10ef.playfabapi.com/CloudScript/ExecuteEntityCloudScript';

			const data = JSON.stringify({
				FunctionName: 'ClientIsWaxLinked',
			});

			const response = await fetch(url, {
				headers: {
					'X-EntityToken': EntityToken,
					'Content-Type': 'application/json',
				},
				method: 'POST',
				body: data,
			});

			const result = await response.json();
			return result.data.FunctionResult.Data.Wax_Address?.Value;
		},
		async GetUserInfo(SessionTicket) {
			const url = 'https://f10ef.playfabapi.com/Client/GetAccountInfo';

			const response = await fetch(url, {
				headers: {
					'X-Authorization': SessionTicket,
					'Content-Type': 'application/json',
				},
				method: 'POST',
			});
			const { data } = await response.json();

			return data.AccountInfo;
		},
		updateUserWAX(waxAddress) {
			console.log(waxAddress);
			this.userInfo = { ...this.userInfo, WaxAddress: waxAddress };
		},
	},
};
</script>

<style>
.link-container {
	display: flex;
	flex-direction: column;
	height: 50.42px;
}
.active-img {
	width: 100%;
	animation: active 200ms ease-in;
}

@keyframes active {
	0% {
		opacity: 0;
	}
	100% {
		opacity: 1;
	}
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

.link {
	text-decoration: none;
	color: #fff;
	opacity: 0.7;
	font-size: 18px;
}

.navigation-links a.active {
	text-decoration: none;
	opacity: 1;
}

.accounts-page {
	flex-grow: 1;
	display: flex;
	justify-content: center;
	align-items: center;
}

.panel {
	min-height: 700px;
	max-height: 700px;
	max-width: 1440px;
	width: 100%;
	display: flex;
}

.panel-navigation {
	width: 300px;
	background-color: #0c0e11;
	position: relative;
	display: flex;
	flex-direction: column;
}

.panel-content {
	background-color: rgba(2, 3, 3, 0.9);
	flex-grow: 1;
	padding: 48px;
	display: flex;
	flex-direction: column;
}
.spinner-wrapper {
	background-color: rgba(2, 3, 3, 0.9);
	flex-grow: 1;
	padding: 48px;
	display: flex;
	justify-content: center;
	align-items: center;
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

@media (max-width: 1108px) {
	.panel-navigation {
		display: none;
	}
}

.image-top {
	position: absolute;
	z-index: 0;
	width: 100%;
	top: 0;
}

.label {
	color: #fff;
	margin-bottom: 8px;
}

.spinner {
	width: 70px;
	text-align: center;
}

.spinner > div {
	width: 18px;
	height: 18px;
	background-color: #4fe8ff;
	border-radius: 100%;
	display: inline-block;
	-webkit-animation: sk-bouncedelay 1.4s infinite ease-in-out both;
	animation: sk-bouncedelay 1.4s infinite ease-in-out both;
}

.spinner .bounce1 {
	-webkit-animation-delay: -0.32s;
	animation-delay: -0.32s;
}

.spinner .bounce2 {
	-webkit-animation-delay: -0.16s;
	animation-delay: -0.16s;
}

@-webkit-keyframes sk-bouncedelay {
	0%,
	80%,
	100% {
		-webkit-transform: scale(0);
	}
	40% {
		-webkit-transform: scale(1);
	}
}

@keyframes sk-bouncedelay {
	0%,
	80%,
	100% {
		-webkit-transform: scale(0);
		transform: scale(0);
	}
	40% {
		-webkit-transform: scale(1);
		transform: scale(1);
	}
}

@media (max-width: 500px) {
	.panel {
		min-height: calc(100vh - 80px);
		align-items: center;
	}
	.panel-content {
		min-height: calc(100vh - 80px);
		justify-content: center;
	}
}
</style>
