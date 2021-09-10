<template>
	<div class="achievement" :style="cssProps">
		<div class="achievement-box"></div>
		<div class="achievement-info" v-show="isAvailable">
			<h1 class="achievement-title">{{ title }}</h1>
			<p class="achievement-description">{{ description }}</p>
			<div class="row" v-if="hasProgress">
				<div class="progress-bar">
					<div
						class="progress"
						:style="{ width: calcProgress + '%' }"
					></div>
				</div>
				<p class="achievement-completion">
					{{ totalCompleted }}<span class="slash">/</span
					>{{ totalRemaining }}
				</p>
			</div>
		</div>
		<div class="achievement-locked" v-if="!isAvailable">
			<h1 class="locked">Locked</h1>
			<svg
				viewBox="0 0 36 36"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				class="lock-svg"
			>
				<g clip-path="url(#clip0)">
					<path
						d="M28.125 13.5H27V8.99999C27 4.03649 22.9635 -7.62939e-06 18 -7.62939e-06C13.0365 -7.62939e-06 9 4.03649 9 8.99999V13.5H7.875C6.015 13.5 4.5 15.0135 4.5 16.875V32.625C4.5 34.4865 6.015 36 7.875 36H28.125C29.985 36 31.5 34.4865 31.5 32.625V16.875C31.5 15.0135 29.985 13.5 28.125 13.5ZM12 8.99999C12 5.69099 14.691 2.99999 18 2.99999C21.309 2.99999 24 5.69099 24 8.99999V13.5H12V8.99999ZM19.5 25.083V28.5C19.5 29.328 18.8295 30 18 30C17.1705 30 16.5 29.328 16.5 28.5V25.083C15.6075 24.5625 15 23.6055 15 22.5C15 20.8455 16.3455 19.5 18 19.5C19.6545 19.5 21 20.8455 21 22.5C21 23.6055 20.3925 24.5625 19.5 25.083Z"
					/>
				</g>
				<defs>
					<clipPath id="clip0">
						<rect width="36" height="36" fill="white" />
					</clipPath>
				</defs>
			</svg>
		</div>
	</div>
</template>
<script>
export default {
	name: 'Achievement',
	props: {
		title: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		totalCompleted: {
			type: Number,
			required: true,
		},
		totalRemaining: {
			type: Number,
			required: true,
		},
		hasProgress: {
			type: Boolean,
			required: true,
		},
		isAvailable: {
			type: Boolean,
			required: true,
		},
	},

	computed: {
		calcProgress() {
			return (this.totalCompleted / this.totalRemaining) * 100;
		},
		cssProps() {
			return {
				'--fill-width':
					(this.totalCompleted / this.totalRemaining) * 100 + '%',
			};
		},
	},
};
</script>

<style scoped>
.achievement-locked {
	display: flex;
	align-items: center;
	flex-grow: 1;
	margin-left: 32px;
}
.locked {
	font-size: 24px;
	color: #3c4347;
}

.lock-svg {
	fill: #3c4347;
	width: 2em;
	height: 2em;
	margin-left: 24px;
}

.achievement {
	background: rgb(32, 36, 41);
	background: linear-gradient(
		90deg,
		rgba(32, 36, 41, 1) 0%,
		rgba(20, 23, 28, 1) 35%
	);
	padding: 24px;
	display: flex;
	color: #fff;
	margin-right: 64px;
	margin-bottom: 8px;
}

.achievement-box {
	border: 2px solid #38bed3;
	background-color: #090b0c;
	flex-grow: 1;
	max-width: 150px;
	height: 150px;
}
.achievement-info {
	display: flex;
	flex-direction: column;
	flex-grow: 1;
	margin-left: 32px;
}
.row {
	display: flex;
	align-items: center;
	flex-grow: 1;
}

.progress-bar {
	flex-grow: 1;
	height: 8px;
	background-color: #000000;
}
.progress {
	background: rgb(51, 91, 149);
	background: linear-gradient(
		90deg,
		rgba(51, 91, 149, 1) 0%,
		rgba(98, 172, 201, 1) 35%
	);
	height: 8px;
	transition: 200ms;
	animation: fill 0.3s ease-in;
}

@keyframes fill {
	0% {
		width: 0;
	}
	100% {
		width: var(--fill-width);
	}
}

.achievement-title {
	font-size: 24px;
	margin-top: 0px;
}
.achievement-description {
	font-size: 18px;
}
.achievement-completion {
	margin-left: 32px;
}

.slash {
	margin: 0 6px;
}

@media (max-width: 800px) {
	.achievement {
		flex-direction: column;
		margin-right: 0px;
	}
	.achievement-box {
		margin-bottom: 16px;
	}
	.achievement-info {
		margin: 0;
	}
	.achievement-locked {
		margin: 0;
	}
}
</style>
