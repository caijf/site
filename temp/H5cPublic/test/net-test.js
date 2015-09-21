require.config({
  baseUrl: '../',
  // Remember: only use shim config for non-AMD scripts
  shim: {
    zepto: {
      exports: '$'
    }
  },
  paths: {
    // libs
    'zepto': 'libs/zepto',
    'text': 'libs/text',

    // utils
    'ajax': 'js/utils/ajax',
    'class': 'js/utils/class',
    'base': 'js/utils/base',
    'network': 'js/network'
  }
});

require(["network"], function(Network){
  var network = new Network();
  network.loading();
})