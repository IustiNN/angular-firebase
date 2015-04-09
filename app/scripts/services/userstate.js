'use strict';
// app.service('shared', function UserState() {
//   var ref = new Firebase('https://dazzling-heat-502.firebaseio.com/');
//   var auth = $firebaseAuth(ref);
// 	var userState = this;
// 	userState.status = 'logged in';
// } );

app.service('sharedProperties', '$firebaseAuth',
	function($firebaseAuth) {

	var ref = new Firebase('https://dazzling-heat-502.firebaseio.com/');
  	var auth = $firebaseAuth(ref);
    
    var sharedValue = {
        status: function() {
         auth.$onAuth(function(authData) {
    if (authData) {
      console.log('Logged in as:', authData.uid);
      this.isLogged = true;
      return authData;
    } else {
      // this.isLogged = false;
      console.log('Logged out');
    }
	});
   }
  };

    
    return {
        getObject: function() {
            return sharedValue;
        }
    };
});