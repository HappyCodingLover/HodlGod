<template>
	<form
		style="
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			flex-grow: 1;
		"
	>
		<div style="display: flex; flex-direction: column">
			<div
				style="display: flex; box-sizing: border-box"
				class="container"
			>
				<div
					style="
						display: flex;
						flex-direction: column;
						box-sizing: border-box;
						flex-grow: 1;
					"
				>
					<label class="label">Username</label>
					<Input
						textAlign="start"
						:defaultValue="userInfo.Username || ''"
					/>
				</div>
				<div
					style="
						display: flex;
						flex-direction: column;
						box-sizing: border-box;
						flex-grow: 1;
					"
				>
					<label class="label">E-mail</label>
					<Input
						textAlign="start"
						:defaultValue="userInfo.PrivateInfo?.Email || ''"
					/>
				</div>
			</div>
			<div
				style="
					display: flex;
					flex-direction: column;
					box-sizing: border-box;
				"
			>
				<label class="label">Wax Address</label>
				<Input
					textAlign="start"
					:defaultValue="userInfo.WaxAddress || ''"
				/>
			</div>
			<Button
				title="Login to WAX"
				style="margin: 0; margin-right: auto"
				type="button"
				@click="login"
				v-if="!isWaxLoggedIn"
			/>
			<Button
				title="Link Wallet"
				style="margin: 0; margin-right: auto; margin-top: 32px"
				type="button"
				@click="sign"
			/>
		</div>
		<Button
			title="Save Changes"
			style="margin: 32px 0; margin-left: auto !important"
		/>
	</form>
</template>

<script>
import Button from './Button.vue';
import Input from './Input.vue';
import * as waxjs from '@waxio/waxjs/dist';
window.global = window;

export default {
	name: 'MyProfile',
	components: {
		Button,
		Input,
	},
	props: {
		userInfo: Object,
	},
	data() {
		return {
			wax: undefined,
			NFTID: '',
			isWaxLoggedIn: false,
		};
	},
	mounted() {
		this.wax = new waxjs.WaxJS({
			rpcEndpoint: 'https://wax.greymass.com',
			tryAutoLogin: false,
		});

		const EntityToken = JSON.parse(
			window.localStorage.getItem('EntityToken')
		);
		this.ClientGenerateNFTsId2(EntityToken);
	},
	methods: {
		async login() {
			try {
				const userAccount = await this.wax.login();
				this.$emit('updateWax', userAccount);
				this.isWaxLoggedIn = true;
			} catch (e) {
				console.log(e);
			}
		},
		async sign() {
			if (!this.isWaxLoggedIn) {
				alert('Login with WAX first');
				return;
			}
			if (!this.wax.api) {
				return;
			}
			try {
				console.log('x');
				console.log(this.wax.userAccount);
				const result = await this.wax.api.transact(
					{
						actions: [
							{
								account: 'eosio',
								name: 'delegatebw',
								authorization: [
									{
										actor: this.wax.userAccount,
										permission: 'active',
									},
								],
								data: {
									from: this.wax.userAccount,
									receiver: this.wax.userAccount,
									stake_net_quantity: '0.00000001 WAX',
									stake_cpu_quantity: '0.00000000 WAX',
									transfer: false,
								},
							},
							{
								account: 'eosio.token',
								name: 'transfer',
								authorization: [
									{
										actor: this.wax.userAccount,
										permission: 'active',
									},
								],
								data: {
									from: this.wax.userAccount,
									to: 'ot.ay.wam',
									quantity: '0.00000001 WAX',
									memo: this.NFTID,
								},
								transaction_id: {
									name: 'transaction_id',
								},
							},
						],
					},
					{
						blocksBehind: 3,
						expireSeconds: 30,
					}
				);
				console.log('y');
				const WaxTransactionId = result.transaction_id;

				this.ClientVerifyWaxTransaction(WaxTransactionId);
			} catch (e) {
				console.log(e);
			}
		},
		async ClientVerifyWaxTransaction(WaxTransactionId) {
			const url =
				'https://f10ef.playfabapi.com/CloudScript/ExecuteEntityCloudScript';
			const EntityToken = JSON.parse(
				window.localStorage.getItem('EntityToken')
			);

			const data = JSON.stringify({
				//Cloud script name is ClientWCWVeriy
				FunctionName: 'ClientWCWVeriy',
				FunctionParameter: {
					transaction_id: WaxTransactionId,
				},
			});

			await fetch(url, {
				headers: {
					'X-EntityToken': EntityToken,
					'Content-Type': 'application/json',
				},
				method: 'POST',
				body: data,
			});
		},

		async ClientGenerateNFTsId2(EntityToken) {
			const url =
				'https://f10ef.playfabapi.com/CloudScript/ExecuteEntityCloudScript';

			const data = JSON.stringify({
				FunctionName: 'ClientGenerateNFTsId2',
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
			this.NFTID = result.data.FunctionResult.messageValue;
		},
	},
};
</script>

<style scoped>
.container {
	gap: 32px;
}
@media (max-width: 881px) {
	.container {
		flex-direction: column;
		gap: 0;
	}
}
</style>
