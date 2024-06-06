<template>
    
            <p >Min: {{ min }}</p>
            <input  type="range" v-model="range" :min="min" :max="max" @input="filterByRange">
            <p >Max: {{ range }}</p>
      
</template>

<script>
export default {
    data() {
        return {
            range: 0,
            min: 0,
            max: 150
        };
    },
    methods: {
        filterByRange() {
            console.log(this.range)
            //emite evento del hijo al padre
            this.$emit('filter-by-range', this.range);
        }
    }
};
</script>
<style scoped>
p{
    margin-right: 2em; 
}
input{
    margin-right: 2em;
     margin-top: -1em;
}
</style>