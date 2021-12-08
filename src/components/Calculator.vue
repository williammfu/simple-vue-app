<template>
  <div class="calculatorWrapper">
    <h3 class="calcTitle">Simple Calculator</h3>
    <span>Result here</span>
    <div class="calcButtons">
      <input type="number" v-model="inp1" class="customNumberInput" />
      <input type="number" v-model="inp2" class="customNumberInput" />
      <select v-model="op" class="operators">
        <option>+</option>
        <option>-</option>
        <option>x</option>
        <option>:</option>
      </select>
      <button @click="count">See result</button>
      <span class="result">{{ res }}</span>
    </div>
  </div>
</template>

<script>
import { maxValue } from "@/constant/number";

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
  watch: {
    // Limit number input
    inp1: function (newIn, oldIn) {
      if (newIn > maxValue) {
        this.inp1 = oldIn;
      }
    },
    inp2: function (newIn, oldIn) {
      if (newIn > maxValue) {
        this.inp2 = oldIn;
      }
    },
  },
};
</script>

<style scoped>
.calculatorWrapper {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: 85%;
  margin: auto;
}
.calcTitle {
  margin: 0;
  margin-bottom: 1rem;
}
.calcButtons {
  display: flex;
  flex-direction: row;
  flex-shrink: 0;
  gap: 1rem;
}
.customNumberInput {
  width: 5rem;
  text-align: right;
}
.result {
  flex-shrink: 0;
  font-weight: 700;
  width: 6.5rem;
  text-align: right;
  overflow-x: auto;
}
.operators {
  width: 2.5rem;
  font-size: 1rem;
}
</style>
