<template>
  <div class="modalOverlay">
    <div class="modalContent">
      <div v-if="!loading" class="question">
        <span>{{ question }}</span>
        <div style="margin-top: 1.25rem">
          <button @click="onClose">No</button>
          <button @click="onConfirm" style="margin-left: 1rem">
            Yes, confirm
          </button>
        </div>
      </div>
      <div v-else class="question">
        <img
          v-if="!finished"
          src="@/assets/spinner.gif"
          width="48"
          height="48"
          alt="Fetching result..."
        />
        <div v-else>
          <h3>Success</h3>
          <button @click="onClose">Close Popup</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Users from "../api/users.js";

export default {
  name: "Modal",
  props: {
    question: String,
    id: Number,
    mode: Number, // 0 for delete, 1 for update
  },
  data: function () {
    return {
      finished: false,
      loading: false,
      updatedAt: "",
    };
  },
  methods: {
    onClose() {
      if (this.finished && this.mode === 1) {
        this.$emit("on-close", this.id, this.updatedAt);
      } else {
        this.$emit("on-close");
      }
    },
    async onConfirm() {
      if (this.mode === 0) {
        // Delete
        try {
          this.loading = true;
          await Users.deleteUser(this.id);
          this.finished = true;
        } catch (e) {
          this.loading = false;
          console.error(e);
        }
      } else if (this.mode === 1) {
        // Update
        try {
          this.loading = true;
          const { updatedAt } = await Users.updateUser(this.id);
          if (updatedAt) {
            this.finished = true;
          }
        } catch (e) {
          this.loading = false;
          console.error(e);
        }
      }
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