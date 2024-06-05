<template>
  <div>
    <label>Por Rango:</label>
    <input type="range" v-model="range" min="1" max="151" @input="applyRangeFilter">
    <span>{{ min }}</span> - <span>{{ max }}</span>
  </div>
</template>

<script>
export default {
  name: "filtroDrango",
  props: ['pokemons', 'setFilteredPokemons'],
  data() {
    return {
      range: 1,
    };
  },
  computed: {
    min() {
      return 1;
    },
    max() {
      return this.range;
    }
  },
  methods: {
    applyRangeFilter() {
      const filtered = this.pokemons.filter(pokemon => pokemon.id <= this.range);
      this.setFilteredPokemons(filtered);
    }
  }
}
</script>
