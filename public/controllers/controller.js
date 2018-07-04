 var myApp = angular.module('myApp',[]);

 myApp.controller('AppCtrl',['$scope','$http',function($scope,$http) {
 	console.log("hello world from controller");
 	// body...

 	$scope.register = function()
	{
		console.log($scope.user); 
		$scope.message="";
		$http.post("/register_user",$scope.user).then(function(res){
		$scope.message=res.data.msg;
		console.log(res.data);
				
		});
	};
	
 	$scope.login_func = function(name)
	{
		console.log("here");
		console.log(name+"$");
		$http.get('/check_user/' + name).then(function(res)
		{
			console.log(res);
		}
	);
		
	};

 	}]);