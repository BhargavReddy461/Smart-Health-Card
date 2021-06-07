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

function codeverify() {
  var code = document.getElementById("otpcode").value;
  coderesult.confirm(code).then(function () {
    window.location = "index1.html";
  });
}
