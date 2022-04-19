<template>
  <div class="container">
    <div class="input-group">
      <span class="input-group-text btn btn-primary" @click="clickHandler">Submit</span>
      <textarea 
        class="form-control" 
        aria-label="With textarea" 
        v-model="billArr" 
        placeholder='输入格式例如：{type:0, time:1650286816934, category:"3tqndrjqgrg", amount:3900},{type:0, time:1650286816934, category:"3tqndrjqgrg", amount:3900}'
      ></textarea>
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

      let validateRes = this.validate(this.billArr);

      if(!validateRes) {
        return
      }

      instance.post("http://localhost:3000/create", {
        billArr: this.billArr
      }).then( response => {
        console.log(response);
      }).catch( err => {
        console.log(err);
      }) 
    },
    validate(str) {
      let delimiterReg = /\},\{/g,
          contentReg = /^\{.+\}$/g;

      if(!str) {
        alert("输入内容不能为空！");
        return false
      }

      if(!contentReg.test(str)) {
          alert("输入内容不为字符串对象");
          return false
      }

      if (!delimiterReg.test(str)) {
        // 单个对象直接跳过
        contentReg.lastIndex = 0;
        if(contentReg.test(str)) {
          return true
        }
  
        alert("必须以英文, 作为分隔符，且中间不能包含空格")
        return false
      }
      return true
    }
  },
  components: {
    // SelectComponent
  }
}
</script>
