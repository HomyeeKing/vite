<template>
    <div class="test">{{foo}}</div>
</template>
<script setup>
import { ref } from 'vue'

const foo = ref('foo')
</script>