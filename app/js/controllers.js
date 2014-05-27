'use strict';

/* Controllers */

/**
 * Method returning all keys of a JSON object or an array
 * @param obj - JSON Object//Array
 * @returns keys - array
 */
function getKeys(obj) {
	var keys = [];
	for (var key in obj) {
		keys.push(key);
	}
	return keys;
}

angular.module('myApp.controllers', [])
  .controller('MyCtrl1', ['$scope','$http', function($scope, $http) {
		var myParams = {};

		myParams.login = 'gui@vme.com';
		myParams.password = '234561';
		myParams.apitv_client_id = 'cb57c714a3bd14d4b883126815f78a63801cbefcDE';
		myParams.apitv_unique_device_id = '1234';
		myParams.code_lang = 'de_DE';
		myParams.genre_path = 'MOVIE.ACT';
		myParams.level_info = '2';
		myParams.with_count = 'YES';

		var keys = getKeys(myParams);
		var len = keys.length;
		keys.sort();

		var formatedParams = [];
		var buffer = '';
		for (var i = 0; i < len; i++) {
			var k = keys[i];
			var temp = encodeURIComponent(myParams[k]).replace(/'/g, '%27');
			temp = temp.replace(/\(/g, '%28');
			temp = temp.replace(/\)/g, '%29');
			if (i > 0) {
				buffer += '&';
			}
			buffer += k + '=' + temp;
			if (i + 1 == len) {
				buffer += '07ae9a3a7b6590f3295c792651a0eb7d274c5709';
			}
			formatedParams[k] = myParams[k];
		}

		console.log(buffer);
		formatedParams.apitv_signature = '' + CryptoJS.MD5(buffer);

		console.log(formatedParams);



		$http({
			method: 'POST',
			url: 'http://apitv.watchever.com/ps3/v1.0/getDataByGenre.json',
			params: formatedParams
			}).success(function(data, status, headers, config) {
				// this callback will be called asynchronously
				// when the response is available
				console.log(data);
				$scope.products = data.result;
			}).error(function(data, status, headers, config) {
				// called asynchronously if an error occurs
				// or server returns response with an error status.
			});


  }])
  .controller('MyCtrl2', ['$scope', function($scope) {

  }]);
