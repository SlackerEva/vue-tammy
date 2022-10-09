<template>
  <div class="min-h-full font-Poppins box-border">
    <Nav></Nav>
    <CardsList></CardsList>
  </div>
</template>

<script>
import Nav from '@/components/Nav-bar.vue';
import CardsList from '@/components/CardsList.vue'

export default {
  name: 'App',
  components: {
    Nav,
    CardsList
  }
}
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700&display=swap");
</style>
