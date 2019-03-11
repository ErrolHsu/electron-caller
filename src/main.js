// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

const axios = require('axios');
const uuid = require("uuid");

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  // components: { App },
  // template: '<App/>'
  data: {
    message: '',
    response_code: '',
    transaction_data: '',
    error: '',
    recordNo: '',
  },
  methods: {
    registerPosShop () {
      let self = this;

      let params = {
        posShopID: 1
      }
      axios.post('http://localhost:3001/posShop/register', params)
        .then((response) => {
          self.message = response.data.message;
        })
        .catch((error) => {
          console.log(error.response['data']);
          self.error = error.response['data']['message'];
        })
    },

    test () {
      let self = this;
      axios.get('http://localhost:3001/test')
        .then((response) => {
          self.message = response.data;
        })
        .catch((error) => {
          console.log(error.response['data']);
          self.error = error.response['data']['message'];
        })
    },

    testDevices () {
      let self = this;
      axios.get('http://localhost:3001/test/devices')
        .then((response) => {
          self.message = response.data;
        })
        .catch((error) => {
          console.log(error.response['data']);
          self.error = error.response['data']['message'];
        })
    },

    // 測試列印
    testPrint () {
      let self = this;
      axios.get('http://localhost:3001/printer/test_print')
        .then((response) => {
          self.message = response.data;
        })
        .catch((error) => {
          console.log(error.response['data']);
          self.error = error.response['data']['message'];
        })
    },

    openCashDrawer () {
      let self = this;
      axios.get('http://localhost:3001/printer/cash_drawer')
        .then((response) => {
          self.message = response.data;
        })
        .catch((error) => {
          console.log(error.response['data']);
          self.error = error.response['data']['message'];
        })
    },

    sale () {
      let params = {
        type: 'sale',
        amount: '000000000300'
      }
      this.ajax(params);
    },

    installment () {
      let params = {
        type: 'installment',
        amount: '000000000300',
      }
      this.ajax(params);
    },

    refund () {
      let params = {
        type: 'refund',
        amount: '000000007000',
        approvalCode: '123456',
        referenceNo: '123456789012'
      }
      this.ajax(params);
    },

    CUPSale () {
      let params = {
        type: 'CUPSale',
        amount: '000000000300'
      }
      this.ajax(params);
    },

    easyCardSale () {
      let params = {
        type: 'easyCardSale',
        amount: '000000000300'
      }
      this.ajax(params);
    },

    // 開發票
    issue() {
      let self = this;
      let params = {
        qrcodeL: 'SS12316203106082424130000000a0000000a0000000054688786R7D8oTDSsj5pOLeHuPuoQw==:**********:2:2:1',
        saleAmount: '359',
        taxAmount: '10',
        qrcodeR: '**大人 - 大:1:3000',
        title: '順立發票',
        periodString: '106年07-08月',
        number: 'SS-12316203',
        date: '2017-08-24',
        time: '14:37:06',
        totalAmount: '369',
        randomNumber: '3310',
        sellerID: '54688786',
        orderName: '#1234',
        // buyerID: '54688786',
        barcode: '10608SS123162032413',
        detail: [
          {name: '南瓜一個', quantity: '1', price: '159'},
          {name: '可樂', quantity: '2', price: '100'},
        ],
      }
      axios.post('http://localhost:3001/printer', params)
        .then((response) => {
          self.message = response.data.message;
        })
        .catch((error) => {
          console.log(error.response['data']);
          self.error = error.response['data']['message'];
        })
    },

    backupQuery(type) {
      let self = this;
      if (self.recordNo.trim().length === 0) {
        return
      }

      axios.get(`http://localhost:3001/${type}/${self.recordNo}`)
        .then((response) => {
          self.message = response.data;
        })
        .catch((error) => {
          console.log(error.response['data']);
          self.error = error.response['data']['message'];
        })
    },

    backupDelete(type) {
      let self = this;
      if (self.recordNo.trim().length === 0) {
        return
      }

      axios.delete(`http://localhost:3001/${type}/${self.recordNo}`)
        .then((response) => {
          self.message = response.data;
        })
        .catch((error) => {
          console.log(error.response['data']);
          self.error = error.response['data']['message'];
        })
    },

    backup (type) {
      let self = this;
      let typeName;

      if (type === 'einvoices') {
        typeName = '發票'
      } else if (type === 'orders') {
        typeName = '訂單'
      }

      let params = {
        no: uuid.v4(),
        typeName,
      }
      axios.post(`http://localhost:3001/${type}`, params)
        .then((response) => {
          self.message = response.data.message;
        })
        .catch((error) => {
          console.log(error.response['data']);
          self.error = error.response['data']['message'];
        })
    },

    readBackup (type) {
      let self = this;
      axios.get(`http://localhost:3001/${type}`)
        .then((response) => {
          self.message = response.data;
        })
        .catch((error) => {
          console.log(error.response['data']);
          self.error = error.response['data']['message'];
        })
    },


    deleteBackup (type) {
      let self = this;
      axios.delete(`http://localhost:3001/${type}`)
        .then((response) => {
          self.message = response.data.message;
        })
        .catch((error) => {
          console.log(error.response['data']);
          self.error = error.response['data']['message'];
        })
    },

    // AJAX
    ajax (params) {
      let self = this;
      axios.post('http://localhost:3001/edc', params)
        .then((response) => {
          console.log(response);
          self.response_code = response.data.response_code;
          self.transaction_data = response.data.transaction_data;
          self.error = '';
        })
        .catch((error) => {
          console.log(error.response['data']);
          self.error = error.response['data']['message'];
        })
    }
  }
})
