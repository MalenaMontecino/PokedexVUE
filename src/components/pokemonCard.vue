<template>
    <!-- <div>
        <div class="pokemonCard col-2 card" style="border: 2px solid greenyellow">
           
        </div>
    </div> -->

    <div class="pokemonCard card" style="width: 15rem;">
        <img src="../assets/logo.png" class="card-img-top mx-auto" alt="" style="width: 150px; height: 150px;">

        <div class="card-body">
            <h2> {{ pokemon.name }}</h2>
            <p>Id: {{ pokemon.id }}</p>
            <p> Tipo: {{ pokemon.type }}</p>
            <div class="botones" style=" float: right;">
                 <a href="#" class="btn btn-secondary mx-3" >
                <img src="../assets/like.svg" alt="Icono de Like" style="color:white" class="icono-like">
            </a>
            <a href="#" class="btn btn-secondary">
                <img src="../assets/team.svg" alt="Icono de equipo" style="color:white" class="icono-team">
            </a>

            </div>
           
        </div>
    </div>
</template>

<script>
export default {
    props: {
        pokemon: Object,
    },
};
</script>

<style scoped>
/* Estilos específicos del componente hijo van aquí */
</style>