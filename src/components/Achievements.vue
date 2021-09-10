<template>
	<div class="achievement-wrapper">
		<Achievement
			title="Slayer"
			description="You have killed 100 people"
			:totalCompleted="240"
			:totalRemaining="1000"
			:isAvailable="true"
			:hasProgress="true"
		/>
		<Achievement
			title="Slayer"
			description="You have killed 100 people"
			:totalCompleted="240"
			:totalRemaining="1000"
			:isAvailable="true"
			:hasProgress="false"
		/>
		<Achievement
			title="Slayer"
			description="You have killed 100 people"
			:totalCompleted="240"
			:totalRemaining="1000"
			:isAvailable="false"
			:hasProgress="false"
		/>
		<Achievement
			title="Slayer"
			description="You have killed 100 people"
			:totalCompleted="240"
			:totalRemaining="1000"
			:isAvailable="false"
			:hasProgress="true"
		/>
	</div>
</template>
<script>
import Achievement from './Achievement.vue';
export default {
	name: 'Achievements',
	components: {
		Achievement,
	},
};
</script>

<style scoped>
.achievement-wrapper {
	height: 600px;
	padding-bottom: 16px;
	padding-right: 16px;
	overflow-y: scroll;
}
</style>
