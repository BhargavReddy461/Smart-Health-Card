// FirebaseUI config.
var uiConfig = {
  signInSuccessUrl: "info.html",
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
  tosUrl: "info.html",
};

// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());
// The start method will wait until the DOM is loaded.
ui.start("#firebaseui-auth-container", uiConfig);

function UserSignUP() {
  var email = document.getElementById("UserEmail").value;
  var password = document.getElementById("UserPassword").value;
  var confirmPassword = document.getElementById("ConfirmPassword").value;

  if ((password = confirmPassword)) {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(function () {
        window.location = "phone.html";
      })
      .catch(function (error) {
        var errorMessage = error.message;
        alert(errorMessage);
      });
  } else {
    alert("Passwords does not match each other");
  }
}
