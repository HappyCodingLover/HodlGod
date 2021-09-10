import { createRouter, createWebHistory } from 'vue-router';
import MyProfile from '../components/MyProfile.vue';
import MyNfts from '../components/MyNfts.vue';
import Achievements from '../components/Achievements.vue';
import Leaderboard from '../components/Leaderboard.vue';
import Account from '../pages/Account.vue';
const history = createWebHistory();
const router = createRouter({
	history,
	routes: [
		{
			path: '/',
			component: () => {
				const SessionTicket = JSON.parse(
					localStorage.getItem('SessionTicket')
				);
				if (!SessionTicket) {
					return import('../pages/Login.vue');
				} else {
					location.replace('/account');
					return import('../pages/Account.vue');
				}
			},
			name: 'Login',
		},
		{
			path: '/register',
			name: 'Register',
			component: () => {
				const SessionTicket = JSON.parse(
					localStorage.getItem('SessionTicket')
				);
				if (!SessionTicket) {
					return import('../pages/Register.vue');
				} else {
					location.replace('/account');
					return import('../pages/Account.vue');
				}
			},
		},
		{
			path: '/reset',
			name: 'Reset',
			component: () => {
				const SessionTicket = JSON.parse(
					localStorage.getItem('SessionTicket')
				);
				if (!SessionTicket) {
					return import('../pages/Reset.vue');
				} else {
					location.replace('/account');
					return import('../pages/Account.vue');
				}
			},
		},
		{
			path: '/account',
			name: 'Account',
			component: () => {
				const SessionTicket = JSON.parse(
					localStorage.getItem('SessionTicket')
				);
				if (SessionTicket) {
					return import('../pages/Account.vue');
				} else {
					return import('../pages/Register.vue');
				}
			},
			children: [
				{ path: '', component: MyProfile },
				{
					path: 'profile',
					name: 'MyProfile',
					component: MyProfile,
				},
				{
					path: 'nfts',
					name: 'MyNfts',
					component: MyNfts,
				},
				{
					path: 'achievements',
					name: 'Achievements',
					component: Achievements,
				},
				{
					path: 'leaderboards',
					name: 'Leaderboards',
					component: Leaderboard,
				},
			],
		},
	],
});

export default router;
