<template>
	<div class="spinner-wrapper" v-if="userNfts.length === 0">
		<div class="spinner">
			<div class="bounce1"></div>
			<div class="bounce2"></div>
			<div class="bounce3"></div>
		</div>
	</div>
	<div v-else>
		<div class="filter">
			<label class="wrapper"
				>Bounty Contract
				<input type="checkbox" />
				<span class="checkmark"></span>
			</label>
			<label class="wrapper"
				>Shards
				<input type="checkbox" />
				<span class="checkmark"></span>
			</label>
			<label class="wrapper"
				>Badges
				<input type="checkbox" />
				<span class="checkmark"></span>
			</label>
		</div>
		<div class="nfts">
			<div
				class="nft-image-wrapper"
				v-for="nft in userNfts"
				:key="nft.id"
				@mouseout="end(nft.id)"
				@mouseover="start(nft.id)"
			>
				<img
					:src="'https://ipfs.io/ipfs/' + nft.data.img"
					class="nft-item"
					loading="lazy"
					alt="nft-item"
					v-if="nft.data.img"
					v-show="nft.data.hovered"
				/>
				<video v-else></video>

				<img
					:src="nft.data.firstFrame"
					class="nft-item"
					loading="lazy"
					alt="nft-item"
					v-if="nft.data.img"
					v-show="!nft.data.hovered"
				/>

				<img
					src="../assets/nft.png"
					class="nft-image"
					alt="ntf-cover"
				/>
			</div>
			<div class="spinner-wrapper" v-show="userNfts.length !== length">
				<div class="spinner">
					<div class="bounce1"></div>
					<div class="bounce2"></div>
					<div class="bounce3"></div>
				</div>
			</div>
		</div>
		<Button
			title="Save Changes"
			style="margin: 32px 0; margin-left: auto !important"
		/>
	</div>
</template>
<script>
import Button from './Button.vue';
export default {
	name: 'MyNfts',
	components: { Button },
	props: {
		userInfo: Object,
	},
	data() {
		return {
			userNfts: [],
			hovered: false,
			hasNfts: true,
			length: 0,
		};
	},
	methods: {
		start(id) {
			const updatedNfts = this.userNfts.map(i =>
				i.id === id
					? { id: i.id, data: { ...i.data, hovered: true } }
					: i
			);
			this.userNfts = updatedNfts;
		},
		end(id) {
			const updatedNfts = this.userNfts.map(i =>
				i.id === id
					? { id: i.id, data: { ...i.data, hovered: false } }
					: i
			);
			this.userNfts = updatedNfts;
		},
	},

	async mounted() {
		const accountTemplatesURL = `https://wax.api.atomicassets.io/atomicassets/v1/accounts/${this.userInfo.WaxAddress}/hodlgod`;
		const templatesURL =
			'https://wax.api.atomicassets.io/atomicassets/v1/templates?collection_name=hodlgod&page=1&limit=200&order=desc&sort=created';

		const response = await fetch(accountTemplatesURL);
		const result = await response.json();

		const accountNfts = result.data.templates;

		const serverResponse = await fetch(templatesURL);

		const res = await serverResponse.json();

		const rawNfts = res.data.filter(item => {
			if (
				accountNfts.filter(t => t.template_id === item.template_id)
					.length > 0
			) {
				return true;
			}
			return false;
		});
		this.length = rawNfts.length;
		const _temp = document.createElement('canvas');
		const ctx = _temp.getContext('2d');
		const tasks = rawNfts.map(item => {
			const promise = new Promise((resolve, reject) => {
				const base_image = new Image();
				base_image.crossOrigin = 'anonymous';

				base_image.onload = () => {
					_temp.width = base_image.width;
					_temp.height = base_image.height;
					ctx.drawImage(base_image, 0, 0);

					const dataURL = _temp.toDataURL();
					resolve({
						id: item.template_id,
						data: {
							...item.immutable_data,
							firstFrame: dataURL,
							hovered: false,
						},
					});
				};

				base_image.onerror = reject;
				base_image.src = `https://ipfs.io/ipfs/${item.immutable_data.img}`;
			});
			return promise;
		});
		for (let task of tasks) {
			task.then(x => {
				this.userNfts.push(x);
			});
		}
	},
};
</script>

<style scoped>
.spinner-wrapper {
	display: block;
	background: transparent;
}

.nft-item {
	z-index: 100;
	width: 150px;
	height: 150px;
}

.nft-item:hover ~ .nft-image {
	border: 2px solid #4fe8ff;
}

.nft-image-wrapper {
	display: flex;
	margin-right: 16px;
	margin-bottom: 16px;
	width: 209px;
	height: 260px;
	justify-content: center;
	align-items: center;
	position: relative;
	cursor: pointer;
}

.filter {
	display: flex;
	gap: 32px;
	color: #fff;
}

.nfts {
	height: 430px;
	overflow-y: scroll;
	padding-top: 32px;
	padding-right: 16px;
	display: flex;
	justify-content: flex-start;
	align-items: center;
	flex-wrap: wrap;
}

.nft-image {
	transition: 300ms ease-in-out;
	border: 2px solid transparent;
	cursor: pointer;
	position: absolute;
}

.nft-image:hover {
	border: 2px solid #4fe8ff;
}

/* The container */
.wrapper {
	display: block;
	position: relative;
	padding-left: 35px;
	margin-bottom: 12px;
	cursor: pointer;
	font-size: 22px;
	-webkit-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	user-select: none;
}

/* Hide the browser's default checkbox */
.wrapper input {
	position: absolute;
	opacity: 0;
	cursor: pointer;
	height: 0;
	width: 0;
}

/* Create a custom checkbox */
.checkmark {
	position: absolute;
	top: 0;
	left: 0;
	height: 25px;
	width: 25px;
	background-color: #0e1114;
	border: 1px solid #2d4457;
	display: flex;
	justify-content: center;
	align-items: center;
}

/* Create the checkmark/indicator (hidden when not checked) */
.checkmark:after {
	content: '';
	display: block;
	visibility: hidden;
	opacity: 0;
	transition: opacity 200ms ease-in-out;
}

/* Show the checkmark when checked */
.wrapper input:checked ~ .checkmark:after {
	visibility: visible;
	opacity: 1;
}

/* Style the checkmark/indicator */
.wrapper .checkmark:after {
	width: calc(100% - 10px);
	height: calc(100% - 10px);
	background-color: #38bed3;
}
</style>
