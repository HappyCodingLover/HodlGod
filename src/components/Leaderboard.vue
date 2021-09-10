<template>
	<div class="filter" @click="filterLeaderboard">
		Filtered by: {{ filter }}
	</div>
	<div class="spinner-wrapper" v-if="leaderboardData.length === 0">
		<div class="spinner">
			<div class="bounce1"></div>
			<div class="bounce2"></div>
			<div class="bounce3"></div>
		</div>
	</div>
	<div class="table-wrapper" v-else>
		<table class="table">
			<tr>
				<th>Rank</th>
				<th>Username</th>
				<th>Kills</th>
				<th>XP</th>
			</tr>
			<tr v-for="data in leaderboardData" :key="data.id">
				<td>
					<div
						class="badge-wrapper"
						v-if="data.position >= 0 && data.position <= 2"
					>
						<p>{{ data.position + 1 }}</p>
						<img
							:src="'/img/' + getImgUrl(data.position) + '.png'"
							class="badge"
						/>
					</div>
					<p style="margin: 0" v-else>{{ data.position + 1 }}</p>
				</td>
				<td>{{ data.displayName || 'John Doe' }}</td>
				<td>{{ data.kills }}</td>
				<td>{{ data.xp }}</td>
			</tr>
		</table>
	</div>
</template>

<script>
export default {
	name: 'Leaderboard',
	data() {
		return {
			leaderboardData: [],
			filter: 'Kills',
		};
	},
	props: {
		userInfo: Object,
	},
	emits: ['updateWax'],
	methods: {
		getImgUrl(position) {
			if (position === 0) {
				return 'first';
			} else if (position === 1) {
				return 'second';
			} else if (position === 2) {
				return 'third';
			} else {
				return;
			}
		},
		async filterLeaderboard() {
			const SessionTicket = JSON.parse(
				window.localStorage.getItem('SessionTicket')
			);
			const filter = this.filter;

			if (filter === 'Kills') {
				this.leaderboardData = await this.getLeaderboardData(
					SessionTicket,
					'XP'
				);
				this.filter = 'XP';
			} else {
				this.leaderboardData = await this.getLeaderboardData(
					SessionTicket,
					'Kills'
				);
				this.filter = 'Kills';
			}
		},
		async getLeaderboardData(SessionTicket, filter) {
			const url = 'https://f10ef.playfabapi.com/Client/GetLeaderboard';
			this.leaderboardData = [];
			const data = JSON.stringify({
				StartPosition: 0,
				StatisticName: filter,
				MaxResultsCount: 100,
				ProfileConstraints: {
					ShowStatistics: true,
					ShowDisplayName: true,
				},
			});

			const response = await fetch(url, {
				headers: {
					'X-Authorization': SessionTicket,
					'Content-Type': 'application/json',
				},
				method: 'POST',
				body: data,
			});

			const result = await response.json();

			return result.data.Leaderboard.map((d, i) => {
				let killsIndex = d.Profile.Statistics.findIndex(
					d => d.Name === 'Kills' && d.Version >= 2
				);

				const xpIndex = d.Profile.Statistics.findIndex(
					d => d.Name === 'XP' && d.Version >= 1
				);

				if (killsIndex === -1) {
					return {
						displayName: d.DisplayName,
						position: d.Position,
						kills: 0,
						xp: d.Profile.Statistics[xpIndex].Value,
					};
				}

				return {
					displayName: d.DisplayName,
					position: d.Position,
					kills: d.Profile.Statistics[killsIndex].Value,
					xp: d.Profile.Statistics[xpIndex].Value,
				};
			});
		},
	},
	async mounted() {
		const SessionTicket = JSON.parse(
			window.localStorage.getItem('SessionTicket')
		);
		if (SessionTicket) {
			this.leaderboardData = await this.getLeaderboardData(
				SessionTicket,
				this.filter
			);
		}
	},
};
</script>

<style scoped>
.filter {
	margin: -28px 0 16px auto;
	color: #fff;
	border: 1px solid #4fe8ff;
	padding: 9px;
	cursor: pointer;
}

.badge-wrapper p {
	margin: 0;
}

.badge-wrapper {
	position: relative;
}

.badge {
	position: absolute;
	top: 0;
	width: 50px;
	z-index: -1;
	transform: translateX(-50%);
}

.table-wrapper {
	display: flex;
	height: 600px;
	overflow-y: auto;
}

.table {
	border-spacing: 0;
	color: #fff;
	text-align: left;
	overflow-y: scroll;
	max-height: 600px;
	flex-grow: 1;
	text-align: center;
}

th,
td {
	font-weight: 400;
	font-size: 18px;
	padding: 16px;
	position: relative;
	z-index: 1;
}

th:nth-child(1) {
	width: 140px;
}

tr:nth-child(2n + 1) {
	background: rgb(32, 36, 41);
	background: linear-gradient(
		90deg,
		rgba(32, 36, 41, 1) 0%,
		rgba(20, 23, 28, 1) 35%
	);
}

table tr td:nth-child(2) {
	text-align: left;
}

table th:nth-child(2) {
	text-align: left;
}

table tr td:nth-child(3) {
	color: #4fe8ff;
}

table tr td:nth-child(4) {
	color: #4fe8ff;
}

tr:nth-child(1) {
	background-image: url('../assets/table-head.png');
}

@media only screen and (max-width: 588px),
	(min-device-width: 768px) and (max-device-width: 1024px) {
	/* Force table to not be like tables anymore */
	table,
	thead,
	tbody,
	th,
	td,
	tr {
		display: block;
	}
	th,
	td {
		margin: 0 auto;
		text-align: center !important;
	}
	/* Hide table headers (but not display: none;, for accessibility) */
	thead tr {
		position: absolute;
		top: -9999px;
		left: -9999px;
	}

	tr {
		border: 1px solid #ccc;
	}

	td {
		/* Behave  like a "row" */
		border: none;
		border-bottom: 1px solid #eee;
		position: relative;
	}

	td:before {
		/* Now like a table header */
		position: absolute;
		/* Top/left values mimic padding */
		top: 6px;
		left: 6px;
		width: 45%;
		padding-right: 10px;
		white-space: nowrap;
	}
}
</style>
