<template>
	<view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list:[]
			}
		},
		methods: {
			
		},
		component: {},
		created(){
			this.api.get2('/characterList',{}).then(data => {
				this.list = data;
			}).catch(function(msg) {
				console.log(msg)
			})
		}
	}
</script>

<style>

</style>
