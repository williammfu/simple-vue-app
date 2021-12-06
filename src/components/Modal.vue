<template>
  <div class="modalOverlay">
    <div class="modalContent">
      <div class="question">
        <span>{{ question }}</span>
        <button @click="onReject">No</button>
        <button @click="onConfirm" style="margin-left: 1rem">Yes, confirm</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Modal",
  props: {
    question: String,
  },
  methods: {
    onReject() {
      this.$emit("on-reject");
    },
    onConfirm() {
      this.$emit("on-confirm");
    },
  },
};
</script>

<style scoped>
.modalOverlay {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
}
.modalContent {
  background: #fafafa;
  width: 40%;
  height: 40%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  border-radius: 5px;
}
.question {
  width: 50%;
}
</style>