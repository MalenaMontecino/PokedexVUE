<template>
  <div>
    <p>Tienda</p>
    <div class="inventario-container">
      <div v-for="(item, index) in items" :key="index" class="item">
        <img :src="item.icon" :alt="item.name" class="item-icon">
        <div class="item-details">
          <p class="item-name">{{ item.name }}</p>
         
          <div class="item-buttons">
            <button @click="addToInventory(index)" class="btn-add">+</button>
            <button @click="removeFromInventory(index)" class="btn-remove">-</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TiendaComponente',
  data() {
    return {
      items: [
        { name: 'Pokeball', icon: require('@/assets/poke.png'), quantity: 0 },
        { name: 'Great Ball', icon: require('@/assets/poke2.webp'), quantity: 0 },
        { name: 'Ultra Ball', icon: require('@/assets/poke3.png'), quantity: 0 },
        { name: 'Poción', icon: require('@/assets/pocion.png'), quantity: 0 },
        { name: 'Elixir', icon: require('@/assets/elixir.png'), quantity: 0 }
      ]
    };
  },
  methods: {
    addToInventory(index) {
      this.$emit('add-to-inventory', { index, quantity: 1 });
    },
    removeFromInventory(index) {
      this.$emit('remove-from-inventory', { index, quantity: 1 });
    }
  }
};
</script>


<style scoped>
.inventario-container {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.item {
  display: flex;
  align-items: center;
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 8px;
}

.item-icon {
  width: 40px;
  height: 40px;
  margin-right: 10px;
}

.item-details {
  display: flex;
  flex-direction: column;
}

.item-name {
  font-weight: bold;
}

.item-quantity {
  color: gray;
}

.item-buttons {
  margin-top: 5px;
}

.btn-add,
.btn-remove {
  padding: 0.5rem;
  margin-right: 5px;
  border: none;
  cursor: pointer;
  background-color: #007bff;
  color: white;
  border-radius: 5px;
}

.btn-add:hover,
.btn-remove:hover {
  background-color: #0056b3;
}
</style>
