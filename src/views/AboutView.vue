<template>
  <div class="container">
    <div class="row">
      <div class="col-6">
        <div type="button" class="btn btn-primary">支出/收入</div>
        <span>{{plusAmount}}/{{minusAmount}}</span>
      </div>
      <div class="col-6">
        <SelectComponent :options="months" :defaultSelect="currMonth" @change="changeHandler(arguments)"></SelectComponent>
      </div>
    </div>

    <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col" v-for="(key, idx) in keys" :key="idx">{{key}}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(bill, idx) in currMonthBillData" :key="idx">
          <th scope="row">
            {{idx + 1}}
          </th>
          <td v-for="(bValue, bIdx) in bill" :key="bIdx">
            <div class="input-group">
             {{bValue}}
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import SelectComponent from "@/components/SelectComponent.vue"

export default {
  name: "AboutView",
  components: {
    SelectComponent
  }
}
</script>
