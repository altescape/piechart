var myApp2 = angular.module('myApp2', []);

myApp2.controller('ChartCtrl', function ($scope) {

    $scope.data = {
      revenue_integrity: {
        name: 'Revenue Integrity', 
        color: '#DEECAA', 
        value: 6080000
      },
      real_time_revenue_integrity: {
        name: 'Real Time Revenue Integrity', 
        color: '#F8C474', 
        value: 0
      },
      airfare_insight_cost: {
        name: 'Airfare Insight - Cost', 
        color: '#EF8464', 
        value: 2128000
      },
      airfare_insight_revenue: {
       name: 'Airfare Insight - Revenue', 
       color: '#85B187', 
       value: 6400000
      },
      arr: {
        name: 'ARR', 
        color: '#83523E', 
        value: 0
      },
      horizon_service_fees_emd: {
        name: 'Horizon Service Fees / EMD', 
        color: '#A7F1DF', 
        value: 4940000
      },
      channel_shift: {
        name: 'Channel Shift', 
        color: '#5C7279', 
        value: 1090909
      },
      w_b_cmap: {
        name: 'W&B CMAP', 
        color: '#E1A698', 
        value: 0
      },
      w_b_central_load_central: {
        name: 'W&B Central Load Central', 
        color: '#6B5852', 
        value: 0
      },
      bundled_network: {
        name: 'Bundled Network', 
        color: '#B9BE6A', 
        value: 0
      }
    };

    var getTotal = function () {
      var total = 0;  
      angular.forEach($scope.data, function(value, key) {
        total = total + value.value;
      });
      return total;
    };

    $scope.updateData = function () {
      $scope.chart_total = getTotal();
    };
});
