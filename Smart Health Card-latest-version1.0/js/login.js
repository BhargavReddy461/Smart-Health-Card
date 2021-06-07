// FirebaseUI config.
var uiConfig = {
  signInSuccessUrl: "index1.html",
  signInOptions: [
    // Leave the lines as is for the providers you want to offer your users.
    // firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    //firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    //firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    //firebase.auth.GithubAuthProvider.PROVIDER_ID,
    //firebase.auth.EmailAuthProvider.PROVIDER_ID,
    firebase.auth.PhoneAuthProvider.PROVIDER_ID,
  ],
  // Terms of service url.
  tosUrl: "index1.html",
};

// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());
// The start method will wait until the DOM is loaded.
ui.start("#firebaseui-auth-container", uiConfig);

function UserLogin() {
  var email = document.getElementById("UserEmail").value;
  var password = document.getElementById("UserPassword").value;

  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(function () {
      window.location = "index1.html";
    })
    .catch(function (error) {
      var errorMessage = error.message;
      alert(errorMessage);
    });
}
