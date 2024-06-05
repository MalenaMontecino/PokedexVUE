<template>
    <div class="tienda-item">
      <img :src="item.icon" :alt="item.name" class="item-icon">
      <div class="item-details">
        <p class="item-name">{{ item.name }}</p>
        <div class="quantity-control">
          <button @click="decrementQuantity" :disabled="item.quantity === 0">-</button>
          <span>{{ item.quantity }}</span>
          <button @click="incrementQuantity" :disabled="item.quantity === maxQuantity">+</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'TiendaItem',
    props: ['item'],
    methods: {
      incrementQuantity() {
        this.$emit('increment');
      },
      decrementQuantity() {
        this.$emit('decrement');
      }
    },
    computed: {
      maxQuantity() {
        if (this.item.name === 'Poción' || this.item.name === 'Elixir') {
          return 5;
        } else if (this.item.name === 'Pokeball' || this.item.name === 'Great Ball' || this.item.name === 'Ultra Ball') {
          return 15;
        }
        return Infinity;
      }
    }
  };
  </script>
  
  <style scoped>
  .tienda-item {
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
  
  .quantity-control {
    display: flex;
    align-items: center;
  }
  
  button {
    cursor: pointer;
    margin: 0 5px;
    padding: 5px 10px;
    border-radius: 5px;
    border: none;
    background-color: #007bff;
    color: #fff;
  }
  
  button:disabled {
    background-color: #ccc;
  }
  </style>
  