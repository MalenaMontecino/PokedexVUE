<template>
  <div style="border: 2px solid salmon; height: 100vh;">
    <div style="margin: 2rem;">
      <h1>Pokedex</h1>
      <div class="row mt-3">
        <p>Filtrado</p>
        <div class="col-2">
          <select class="form-select" aria-label="Default select example" v-model="filter" @change="applyFilter">
            <option value="">Todos</option>
            <option value="favorites">Favoritos</option>
            <option value="team">Equipo</option>
            <option value="type">Por tipo</option>
            <option value="range">Por rango</option>
          </select>
          <select v-if="filter === 'type'" class="form-select" aria-label="Default select example" v-model="typeFilter">
            <option value="">Todos</option>
            <option v-for="type in allTypes" :key="type" :value="type"> {{ type }} </option>
          </select>
        </div>
      </div>
    </div>
    <div class="card-container pl-2" style="height: 70vh;">
      <p>Zona de cromos</p>
      <div class="card-grid">
        <div v-for="pokemon in filteredPokemons" :key="pokemon.id">
          <pokemon-card
            :pokemon="pokemon"
            :isFavorite="favorites.includes(pokemon.id)"
            :isInTeam="team.includes(pokemon.id)"
            @update-favorite="updateFavorite"
            @add-to-team="addToTeam"
            @remove-from-team="removeFromTeam"
          />
        </div>
      </div>
    </div>
    <div v-if="showAlert" class="alert alert-danger" role="alert">
      {{ alertMessage }}
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
      pokemons: [],
      favorites: [],
      team: [],
      filter: '',
      typeFilter: '',
      showAlert: false,
      alertMessage: '',
    };
  },
  computed: {
    filteredPokemons() {
      if (this.filter === 'favorites' && this.favorites.length === 0) {
        return [];
      } else if (this.filter === 'favorites') {
        return this.pokemons.filter(pokemon => this.favorites.includes(pokemon.id));
      } else if (this.filter === 'team' && this.team.length !== 6) {
        return [];
      } else if (this.filter === 'team') {
        return this.pokemons.filter(pokemon => this.team.includes(pokemon.id));
      } else if (this.filter === 'type' && this.typeFilter !== '') {
        return this.pokemons.filter(pokemon => pokemon.types.includes(this.typeFilter));
      }
      return this.pokemons;
    },
    allTypes() {
      // Obtener todos los tipos de los pokemons para el desplegable
      return this.pokemons.reduce((types, pokemon) => {
        pokemon.types.forEach(type => {
          if (!types.includes(type)) {
            types.push(type);
          }
        });
        return types;
      }, []);
    }
  },
  mounted() {
    this.fetchPokemons();
  },
  methods: {
    async fetchPokemons() {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
        const data = await response.json();
        const pokemonPromises = data.results.map(async pokemon => {
          const pokeResponse = await fetch(pokemon.url);
          const pokeData = await pokeResponse.json();
          return {
            id: pokeData.id,
            name: pokeData.name,
            types: pokeData.types.map(typeInfo => typeInfo.type.name),
            image: pokeData.sprites.front_default,
          };
        });
        this.pokemons = await Promise.all(pokemonPromises);
      } catch (err) {
        console.log("Error fetching API: " + err.message);
      }
    },
    updateFavorite(pokemonId, isFavorite) {
      if (isFavorite) {
        this.favorites.push(pokemonId);
      } else {
        this.favorites = this.favorites.filter(id => id !== pokemonId);
      }
    },
    addToTeam(pokemonId) {
      if (this.team.length < 6) {
        this.team.push(pokemonId);
      } else {
        this.showAlert = true;
        this.alertMessage = 'Máximo 6 Pokémon en el equipo.';
        setTimeout(() => {
          this.showAlert = false;
        }, 3000);
      }
    },
    removeFromTeam(pokemonId) {
      this.team = this.team.filter(id => id !== pokemonId);
    },
    applyFilter() {
      if (this.filter === 'team' && this.team.length !== 6) {
        this.showAlert = true;
        this.alertMessage = 'Debes tener exactamente 6 Pokémon en el equipo para aplicar el filtro.';
        setTimeout(() => {
          this.showAlert = false;
        }, 3000);
      } else {
        this.showAlert = false;
      }
      if (this.filter === 'favorites' && this.favorites.length === 0) {
        this.showAlert = true;
        this.alertMessage = 'Debes seleccionar al menos un favorito para aplicar el filtro.';
        setTimeout(() => {
          this.showAlert = false;
        }, 3000);
      }
    },
  },
};
</script>

<style scoped>
.card-container {
  margin-left: 2rem;
  border: 2px solid blue;
  width: 50vw;
  height: 90vh;
  overflow-y: auto;
  overflow-x: hidden;
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}

.card {
  border: 1px solid #ccc;
  padding: 10px;
}

.alert {
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 9999;
}
</style>
