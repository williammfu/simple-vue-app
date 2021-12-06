<template>
  <div>
    <input type="number" v-model="inp1" />
    <input type="number" v-model="inp2" />
    <select v-model="op">
      <option>+</option>
      <option>-</option>
      <option>x</option>
      <option>:</option>
    </select>
    <button @click="count">See result</button>
    <span>{{ res }}</span>
  </div>
</template>

<script>
export default {
  name: "Calculator",
  data: function () {
    return {
      inp1: 0,
      inp2: 0,
      op: "+",
      res: 0,
    };
  },
  methods: {
    count() {
      switch (this.op) {
        case "+":
          this.res = parseInt(this.inp1) + parseInt(this.inp2);
          break;
        case "-":
          this.res = parseInt(this.inp1) - parseInt(this.inp2);
          break;
        case "x":
          this.res = parseInt(this.inp1) * parseInt(this.inp2);
          break;
        case ":":
          this.res = parseInt(this.inp1) / parseInt(this.inp2);
          break;
      }
    },
  },
};
</script>