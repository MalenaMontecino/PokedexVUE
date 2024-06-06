<template>
  <!-- si es true se aplica la clase -->
    <div :class="['pokemonCard card', { 'team-card': isPartOfTeam }]" style="width: 14.5rem;">
      <img :src="pokemon.image" class="card-img-top mx-auto" alt="pokemon.name" style="width: 150px; height: 150px;">
      <div class="card-body">
        <h2>{{ pokemon.name }}</h2>
        <p>Id: {{ pokemon.id }}</p>
        <p>Tipo: <span v-for="(type, index) in pokemon.types" :key="index">{{ type }}<span v-if="index < pokemon.types.length - 1">, </span></span></p>
        <div class="botones" style="float: right;">
          <a href="#" :class="['btn', isLiked ? 'btn-danger' : 'btn-success', 'mx-3']" @click.prevent="toggleLike">
            <img src="../assets/like.svg" alt="Icono de Like" style="width: 20px; height: 20px;" class="icono-like">
          </a>
          <a href="#"  class ="btn btn-success" @click.prevent="toggleTeam">
            <img src="../assets/team.svg" alt="Icono de equipo" style="width: 20px; height: 20px;" class="icono-team">
          </a>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    //del padre al hijo
    props: {
      pokemon: {
        type: Object,
        required: true,
      },
      isFavorite: {
        type: Boolean,
        default: false,
      },
      isInTeam: {
        type: Boolean,
        default: false,
      },
    },
    //definir datos locales
    data() {
      return {
        isLiked: this.isFavorite,
        isPartOfTeam: this.isInTeam,
      };
    },
    methods: {
      toggleLike() {
        this.isLiked = !this.isLiked;
        this.$emit('update-favorite', this.pokemon.id, this.isLiked);
      },
      toggleTeam() {
        if (!this.isPartOfTeam) {
          this.$emit('add-to-team', this.pokemon.id);
        } else {
          this.$emit('remove-from-team', this.pokemon.id);
        }
      },
    },
    watch: {
      //si hay cambios en la propiedad se actualizará
      isInTeam(newVal) {
        this.isPartOfTeam = newVal;
      }
    }
  };
  </script>
  

  <style scoped>
  .team-card {
    background-color: #c4ebf4e5;
  }
  </style>
  