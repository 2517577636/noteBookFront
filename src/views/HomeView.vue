<template>
  <div class="container">
    <div class="row">
      <div class="col-6">
        <div type="button" class="btn btn-primary">支出/收入</div>
        <span>{{plusAmount}} / {{minusAmount}}</span>
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
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import { BILLMODEL } from "@/model/index.js";
import SelectComponent from "@/components/SelectComponent.vue";

export default {
  name: 'HomeView',
  created() {
      this.keys = Object.keys(BILLMODEL);
      this.currMonth = this.getCurrMonth();

      this.$axiosInstance.get("/").then((response) => {
        let data =  response.data.data.bill;
        this.totalBill = data;

        if(!data || (Array.isArray(data) && data.length === 0)) {
          console.error("the totalBill is an empty!");
          return
        }

        this.currMonthBillData = data[this.currMonth];
      }).catch(e => {
        console.log(e);
      });
  },
  data() {
    return {
      keys: [], // 表头
      totalBill: [], // 总账
      currMonth: undefined, // 当前月份
      currMonthBillData: [], // 当前月份账单
      months: [
        {
          value: 1,
          name: "Jan"
        },
        {
          value: 2,
          name: "Feb"
        },
        {
          value: 3,
          name: "Mar"
        },
        {
          value: 4,
          name: "Apr"
        },
        {
          value: 5,
          name: "May"
        },
        {
          value: 6,
          name: "Jun"
        },
        {
          value: 7,
          name: "Jul"
        },
        {
          value: 8,
          name: "Aug"
        },
        {
          value: 9,
          name: "Sep"
        },
        {
          value: 10,
          name: "Oct"
        },
        {
          value: 11,
          name: "Nov"
        },
        {
          value: 12,
          name: "Dec"
        }
      ],
      minusAmount: 0, // 支出
      plusAmount: 0 // 收入
    }
  },
  components: {
    // HelloWorld
    SelectComponent
  },
  methods: {
    getCurrMonth() {
      let nowTime = new Date();
      return nowTime.getMonth() + 1;
    },

    changeHandler(params) {
      let selectVal = params[1];
      this.currMonth = selectVal;

      this.currMonthBillData = this.totalBill[this.currMonth];
      this.getCurrMonthAmount();
    },

    getCurrMonthAmount() {
      if(this.currMonthBillData && this.currMonthBillData.length > 0) {
        let currMonthBill = this.currMonthBillData;
        
        let [minusAmount, plusAmount] = [0, 0];
        currMonthBill.forEach((bill) => {
          let currType = bill.type,
              currVal = bill.amount;

          if (currType === 0) {
            minusAmount += currVal;
          } else if(currType === 1) {
            plusAmount += currVal
          }
        })
        this.minusAmount = minusAmount;
        this.plusAmount = plusAmount;
      }
    }
  }
}
</script>
