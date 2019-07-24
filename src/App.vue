<template>
	<div id="app">
		<router-view/>
	</div>
</template>

<script>
import "~/layout/layoutStyle/layout.scss"
export default {
    name: 'App'
}
</script>

<style lang="scss">
	html,body{
		height: 100%;
	}
	*{
		margin: 0;
		padding: 0;
	}
	#app{
		height: 100%;
	}
</style>