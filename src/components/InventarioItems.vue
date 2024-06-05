<template>
  <div>
    <p>Inventario</p>
    <div class="inventario-container mb-5">
      <div v-for="item in items" :key="item.name" class="item">
        <img :src="item.icon" alt="item.name" class="item-icon">
        <div class="item-details">
          <p class="item-name">{{ item.name }}</p>
          <p class="item-quantity">Cantidad: {{ item.quantity }}</p>
        </div>
      </div>
    </div>

    <!-- Aquí se incluye el componente TiendaComponente -->
    <div class=" tienda mt-5" >
      <TiendaComponente @add-to-inventory="addToInventory" @remove-from-inventory="removeFromInventory" />
    </div>
  </div>
</template>

<script>
import TiendaComponente from './TiendaComponente.vue';

export default {
  name: 'InventarioItems',
  components: {
    TiendaComponente
  },
  data() {
    return {
      items: [
        { name: 'Pokeball', icon: require('@/assets/poke.png'), quantity: 0, maxQuantity: 15 },
        { name: 'Great Ball', icon: require('@/assets/poke2.webp'), quantity: 0, maxQuantity:  15 },
        { name: 'Ultra Ball', icon: require('@/assets/poke3.png'), quantity: 0, maxQuantity: 15 },
        { name: 'Poción', icon: require('@/assets/pocion.png'), quantity: 0, maxQuantity: 5 },
        { name: 'Elixir', icon: require('@/assets/elixir.png'), quantity: 0, maxQuantity: 5 }
      ]
    };
  },
  methods: {
    addToInventory({ index, quantity }) {
      const item = this.items[index];
      if (item.quantity + quantity <= item.maxQuantity) {
        item.quantity += quantity;
      } else {
        // No permitir exceder la cantidad máxima
        item.quantity = item.maxQuantity;
      }
    },
    removeFromInventory({ index, quantity }) {
      const item = this.items[index];
     
      if (item.quantity >= quantity) {
        item.quantity -= quantity;
      } else {
        // No permitir que la cantidad sea menor que cero
        item.quantity = 0;
      }
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
</style>
