window.onload = function () {
  render();
};
var coderesult;
function render() {
  window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
    "recaptcha-container",
    {
      size: "invisible",
      callback: function (response) {
        phoneAuth();
      },
    }
  );
}

function phoneAuth() {
  var number = document.getElementById("number").value;
  const appVerifier = window.recaptchaVerifier;
  firebase
    .auth()
    .signInWithPhoneNumber(number, appVerifier)
    .then(function (confirmationResult) {
      window.confirmationResult = confirmationResult;
      coderesult = confirmationResult;
      console.log(coderesult);
    });
}
auth = firebase.auth();
function codeverify() {
  var code = document.getElementById("otpcode").value;
  var credential = firebase.auth.PhoneAuthProvider.credential(
    coderesult.verificationId,
    code
  );

  auth.currentUser
    .linkWithCredential(credential)
    .then((usercred) => {
      var user = usercred.user;
      console.log("Account linking success", user);
    })
    .then(function () {
      window.location = "info.html";
    })
    .catch((error) => {
      console.log("Account linking error", error);
    });
}
