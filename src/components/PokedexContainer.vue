<template>
    <div>
      <p>COntainer</p>
      <div>
        <div class="card">
          <div class="card-body" style="border: 2px solid salmon">
            <div class="mb-3" v-for="pokemon in pokemons" :key="pokemon.id">
              <pokemonCard :pokemon="pokemon" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import pokemonCard from "./pokemonCard.vue";
  
  export default {
    components: {
      pokemonCard,
    },
    data() {
      return {
        pokemons: [
          { id: 1, name: "Pikachu", type: "Electric" },
          { id: 2, name: "Charmander", type: "Fire" },
          { id: 3, name: "Squirtle", type: "Water" },
          { id: 4, name: "Bulbasaur", type: "Grass" },
        ],
      };
    },
  };
  </script>
  
  <style scoped>
  /* Estilos específicos del componente van aquí */
  </style>
  