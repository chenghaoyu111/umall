<template>
  <div>
    <h1>首页管理</h1>
    <div class="box" id="main"></div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import echarts from "echarts";
export default {
  props: [],
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      list: "cate/list",
    }),
  },
  watch: {
    list: {
      handler() {
        if (this.list.length > 0) {
          // 基于准备好的dom，初始化echarts实例
          var myChart = echarts.init(document.getElementById("main"));

          // 指定图表的配置项和数据
          var option = {
            title: {
              text: "近一周订单数量",
            },
            tooltip: {},
            legend: {
              data: ["近一周订单数量"],
            },
            xAxis: {
              // data:this.list.map(item=>item.catename),
              data:['周一','周二','周三','周四','周五','周六','周日']
            },
            yAxis: {
              type:'value'
            },
            series: [
              {
                // name: "下级分类数量",
                type: "line",
                // data: this.list.map(item=>item.children.length),
                data:['300','340','120','420','380','700','810']
              },
            ],
          };

          // 使用刚指定的配置项和数据显示图表。
          myChart.setOption(option);
        }
      },
      deep: true,
    },
  },
  methods: {
    ...mapActions({
      reqList: "cate/reqListAction",
    }),
  },
  mounted() {
    this.reqList();
    
  },
};
</script>
<style scoped>
.box {
  width: 80%;
  height: 500px;
  margin: 20px auto;
  border: 1px solid #cccccc;
}
</style>