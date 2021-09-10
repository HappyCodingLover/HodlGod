<template>
	<div class="container">
		<img src="../assets/button.png" class="image" />
		<div class="title">
			<p>{{ title }}</p>
			<button class="test" :type="type ? type : 'submit'"></button>
		</div>
	</div>
</template>

<script>
export default {
	name: 'Button',
	props: {
		title: String,
		type: String,
	},
};
</script>

<style scoped>
.image {
	object-fit: contain;
	width: 100%;
	height: 100%;
	opacity: 0;
	transition: 0.3s ease-in;
}

.test {
	position: absolute;
	inset: 0;
	width: 100%;
	height: 100%;
	opacity: 0;
	cursor: pointer;
}

.container {
	height: 60px;
	width: fit-content;
	margin: 32px auto;
	position: relative;
	border: 1px solid #2d4457;
	background: #0f1114;
	cursor: pointer;
}

.container:hover .image {
	opacity: 1;
}

.title {
	z-index: 1;
	color: #fff;
	position: absolute;
	width: 100%;
	height: 100%;
	top: 0;
	margin: 0;
	display: flex;
	justify-content: center;
	align-items: center;
}

.title > p {
	font-weight: bold;
	font-size: 18px;
	text-transform: uppercase;
	margin: 0;
}
</style>
