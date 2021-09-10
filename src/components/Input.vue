<template>
	<input
		class="input"
		:type="type"
		:placeholder="placeholder"
		autofocus
		:required="required"
		:defaultValue="defaultValue"
		:style="{ textAlign: textAlign || 'center' }"
	/>
</template>
<script>
export default {
	name: 'Input',
	props: {
		placeholder: String,
		type: String,
		textAlign: String,
		required: Boolean,
		defaultValue: String,
	},
};
</script>
<style scoped>
.input {
	height: 50px;
	background: #0f1114;
	border: 1px solid #2f383e;
	transition: 200ms;
	outline: none;
	color: #8c969a;
	margin-bottom: 24px;
	box-sizing: border-box;
	padding: 0 8px;
	font-size: 16px;
}

input::placeholder {
	color: #8c969a;
}

.input:focus-within {
	border-color: #2d4457;
}
</style>
