<template>
  <div class="container">
    <div class="input-group">
      <span class="input-group-text btn btn-primary" @click="clickHandler">Submit</span>
      <textarea class="form-control" aria-label="With textarea" v-model="billArr"></textarea>
    </div>
  </div>
</template>

<script>
// import SelectComponent from "@/components/SelectComponent.vue"

export default {
  name: "AboutView",
  data() {
    return {
      currMonth: undefined,
      billArr: '{type:0, time:1650286816934, category:"3tqndrjqgrg", amount:3900}'
    }
  },
  methods: {
    clickHandler() {
      const instance = this.$axios.create();

      instance.post("http://localhost:3000/create", {
        billArr: this.billArr
      }).then( response => {
        console.log(response);
      }).catch( err => {
        console.log(err);
      }) 
    }
  },
  components: {
    // SelectComponent
  }
}
</script>
