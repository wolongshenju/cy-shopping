new Vue({
  el: '.container',
  data: {
    limitNum: 3,
    addressList: [],
    currentIndex: 0,
    shippingMethod: 1,
    DelFlag:false,
    EditFlag:false,
    currentAddress:''
  },
  mounted: function() {
    this.$nextTick(function() {
      this.getAddressList();
    });
  },
  computed:{
    filterAddress:function(){
    return this.addressList.slice(0,this.limitNum);
    }
  },
  methods: {
    getAddressList: function() {
      var _this = this;
      this.$http.get("data/address.json").then(function(response) {
        var res = response.data;
        if (res.status =="0") {
          _this.addressList = res.result;
        }
      });
    },
   addmore:function(){
      this.limitNum=this.addressList.length;
    },
    setDefault:function(addressId){
      this.addressList.foreach(function(address,index){
         if(address.addressId==addressId){
          address.isDefault=true;
         }
         else{
           address.isDefault=false;
         }
      });  

    },
    confirDelAddress:function(item){
      this.DelFlag=true;
      this.currentAddress=item;
    },
    DelAddress:function(){
      var index=this.addressList.indexOf(this.currentAddress);//获取当前地址序号
      this.addressList.splice(index,1);
      this.DelFlag=false;
    }

    }
 
});
