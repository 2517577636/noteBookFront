<template>
    <select class="form-select" v-model="selectVal" :name="name" aria-label="Default select example" @change="changeHandler($event)">
        <option v-for="(opt, idx) in options"  :key="idx" :value="opt.value">{{opt.value}}</option>
    </select>
</template>

<script>
export default {
    name: "SelectComponent",
    created() {
        this.initSelectVal()
    },
    props: {
        options: {
            type: Array,
            required: true
        },
        name: {
            type: String,
            default: ""
        },
        defaultSelect: {
            type: Number
        }
    },
    data() {
        return {
            selectVal: undefined
        }
    },
    methods: {
        changeHandler(e) {
            this.$emit("change",e, this.selectVal);
        },
        initSelectVal() {
            if (this.defaultSelect) {
                let currVal = this.options[this.defaultSelect] && this.options[this.defaultSelect - 1].value;
                this.selectVal = currVal
            }
        }
    }
}
</script>
