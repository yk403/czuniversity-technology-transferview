<template>
    <div>
        <h1>HomePage</h1>
    </div>
</template>

<script>
export default {
  mounted() {
    console.log('已完成')
    this.$router.push({name: 'sys-UserList'})
  }
}
</script>

<style>
</style>