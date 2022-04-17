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
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import SelectComponent from "@/components/SelectComponent.vue"

export default {
  name: 'HomeView',
  created() {
      this.currMonth = this.getCurrMonth();

      const instance = this.$axios.create({
        headers: {'X-Requested-With': 'XMLHttpRequest'},
      })

      instance.get("http://localhost:3000/").then((response) => {
        let data =  response.data.data.bill;
        let tempData = {};
        
        data.forEach((bill) => {
            let time = new Date(bill.time),
                billMonth = time.getMonth() + 1;
            bill.time = time.toLocaleDateString();
            if(tempData[billMonth]) {
              tempData[billMonth].push(bill)
            } else {
              tempData[billMonth] = []
            }
        });

        console.log("tempData: ", tempData);
        console.log("currentMonth: ", this.currMonth);
        this.billData = tempData;
        this.currMonthBillData = tempData[this.currMonth];

        this.keys = Object.keys(data[0]);
      });
  },
  data() {
    return {
      keys: [],
      billData: [],
      currMonth: undefined,
      currMonthBillData: [],
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
      minusAmount: 0,
      plusAmount: 0
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

      this.currMonthBillData = this.billData[this.currMonth];
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
