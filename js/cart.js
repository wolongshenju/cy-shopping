new Vue({
  el: '#app',
  data: {
    totalMoney: 0,
    productList: [],
    checkAllFlag: false,
    delFlag: false,
    curProduct: ''
  },
  filters: {
    formatMoney: function(value) {
      return "¥" + value.toFixed(2);
    }

  },
  mounted: function() {
      this.cartView();
    
  },
  methods: {
      cartView: function() {
        var _this = this;
        this.$http.get("data/cartData.json", {"id": 123}).then(function(res) {
          _this.productList = res.body.result.list;
          
        });
      },
      changeMoney: function(product, way) {
        if (way > 0) {
          product.productQuantity++;
        }
        else {
          product.productQuantity--;
          if (product.productQuantity < 1) {
            product.productQuantity = 1;
          }
        }
        this.calcTotalMoney();

      },
      selectedProduct: function(item){
        if(typeof item.checked=="undefined"){
          //如果对象不存在，那么就注册一个对象
          /***全局注册*********/
          Vue.set(item,"checked",true);
          /**********局部注册*******/
          /*this.$set(item,"checked",true);*/
        }
        else{
          item.checked=!item.checked;
            }  

          this.calcTotalMoney();    
      },
      checkAll: function(flag){
          this.checkAllFlag=flag;
          var  _this=this;
          this.productList.forEach(function(item,index){
             if(typeof item.checked=="undefined"){
          //如果对象不存在，那么就注册一个对象
             _this.$set(item,"checked",_this.checkAllFlag);   
              }
            else{
            item.checked=_this.checkAllFlag;
                }
           }); 
           this.calcTotalMoney(); 
      },

      calcTotalMoney:function(){
        var _this=this;
        this.totalMoney=0;//清零
        this.productList.forEach(function(item,index){
          //若商品被选中，计算商品价格
          if(item.checked){
          _this.totalMoney+=item.productPrice*item.productQuantity;
          }
        });
      },
      confirmDel:function(item){
        this.delFlag=true;
        this.curProduct=item;
      },
      delProduct:function(){
        var index=this.productList.indexOf(this.curProduct);//获取当前商品的序号
        this.productList.splice(index,1);
        this.delFlag=false;
      }

         }       
});
// 全局过滤器
Vue.filter('money', function(value, type) {
  return "¥" + value.toFixed(2) + type;
})
