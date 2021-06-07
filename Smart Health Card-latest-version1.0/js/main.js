var userName;

var mainApp = {};
(function () {
  var mainContainer = document.getElementById("main_container");

  var logtout = function () {
    firebase
      .auth()
      .signOut()
      .then(
        function () {
          console.log("success");
          window.location.replace("index.html");
        },
        function () {}
      );
  };

  var init = function () {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        // User is signed in.

        console.log(user);
        userName = user;
        var code = window.location.href;

        var n = code.lastIndexOf("/");
        var result = code.substring(n + 1);
        if (result == "healthrecords.html") {
          healthrecords();
        } else if (result == "profile.html") {
          showprofiledata();
          userprofileimage();
        } else if (result == "index1.html") {
          showusername();
        }

        console.log("stay");
      } else {
        // No user is signed in.
        mainContainer.style.display = "none";
        console.log("redirect");
        window.location.replace("login.html");
      }
    });
  };

  init();

  mainApp.logout = logtout;
})();

//===========================================================
function input_filename() {
  var input = document.getElementById("file").files[0];
  var file = document.getElementById("input_filename");
  file.innerText = input.name;
}

function upload() {
  var downloadurl;
  var date = document.getElementById("name").value;
  var hospital = document.getElementById("hospital").value;
  var medicationpurpose = document.getElementById("medicationpurpose").value;

  var name = document.getElementById("name1").value;

  var file = document.getElementById("file").files[0];

  var fileName = file.name;
  var storageRef = firebase.storage().ref("files/" + fileName);

  var uploadTask = storageRef.put(file);
  uploadTask.on(
    "state_changed",
    function (snapshot) {
      var uploadprogress = document.getElementById("progress");
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

      console.log("upload is " + progress + "done");
      if (progress !== 0) {
        uploadprogress.innerText = progress.toFixed(0) + "%";
        document.getElementById("progress").style.width =
          progress.toFixed(0) + "%";
      }

      if (progress === 100) {
        document.getElementById("uploadsuccess").style.visibility = "visible";
      }
    },
    function (error) {
      console.log(error.message);
    },
    function () {
      downloadurl = uploadTask.snapshot.downloadURL;
      var postData = {
        date: date,
        hospital: hospital,
        medicationpurpose: medicationpurpose,
        name: name,

        url: downloadurl,
      };

      // Get a key for a new Post.
      var newPostKey = firebase.database().ref().child("posts").push().key;

      // Write the new post's data simultaneously in the posts list and the user's post list.
      var updates = {};

      updates["/Users/" + userName.uid + "/elements/" + newPostKey] = postData;

      return firebase.database().ref().update(updates);
    }
  );
}

function healthrecords() {
  var token = userName.uid;
  QueryDatabase(token);
}
function QueryDatabase(token) {
  firebase
    .database()
    .ref("/Users/" + userName.uid + "/elements")
    .once("value")
    .then(function (snapshot) {
      var elementArray = snapshot.val();
      if (elementArray == null) {
        document.getElementById("norecord").style.visibility = "visible";
      } else {
        console.log(elementArray);
        var keys = Object.keys(elementArray);
        console.log(keys);

        for (var i = keys.length - 1; i >= 0; i--) {
          var currentelement = elementArray[keys[i]];
          var col = document.createElement("div");
          $(col).addClass("col-lg-5");
          $(col).addClass("card");
          $(col).addClass("healthrecords-col");
          $(col).addClass("col-md-9");
          $(col).addClass("col-sm-11");
          $("#carddeck").append(col);
          var imgDiv = document.createElement("a");
          imgDiv.href = currentelement.url;
          imgDiv.target = "_blank";
          $(imgDiv).addClass("img-div");
          var image = document.createElement("img");
          image.src = currentelement.url;
          image.alt = "";
          // image.onerror="this.style.display='none";
          $(image).addClass("contentImage");
          $(image).addClass("card-img-top");
          var colBody = document.createElement("div");
          $(colBody).addClass("card-body");
          $(colBody).addClass("card-color");
          var k = document.createElement("span");
          $(k).html("RecordID ");
          $(k).addClass("card-title");
          $(k).addClass("par");
          $(k).addClass("d-none");
          var id = document.createElement("span");
          $(id).html(keys[i]);
          $(id).addClass("card-text");
          $(id).addClass("par");
          $(id).addClass("d-none");
          var b1 = document.createElement("br");
          var d = document.createElement("span");
          $(d).html("Date: ");
          $(d).addClass("card-title");
          $(d).addClass("par");
          var p = document.createElement("span");
          $(p).html(currentelement.date);
          $(p).addClass("card-text");
          $(p).addClass("par");
          var b1 = document.createElement("br");
          var z = document.createElement("span");
          $(z).html("Hospital: ");
          $(z).addClass("card-title");
          $(z).addClass("par");
          var q = document.createElement("span");
          $(q).html(currentelement.hospital);
          $(q).addClass("card-text");
          $(q).addClass("par");
          var b2 = document.createElement("br");
          var n = document.createElement("span");
          $(n).html("Name of the File: ");
          $(n).addClass("card-title");
          $(n).addClass("par");
          var r = document.createElement("span");
          $(r).html(currentelement.name);
          $(r).addClass("card-text");
          $(r).addClass("par");
          var y = document.createElement("span");
          $(y).html("Medication: ");
          $(y).addClass("card-title");
          $(y).addClass("par");
          var m = document.createElement("span");
          $(m).html(currentelement.medicationpurpose);
          $(m).addClass("card-text");
          $(m).addClass("par");
          var del = document.createElement("a");
          $(del).html("Delete");
          $(del).addClass("btn");
          $(del).addClass("btn-danger");
          del.href = "delete.html" + "?" + keys[i];
          var update = document.createElement("a");
          $(update).html("Update");
          update.href = "update.html" + "?" + keys[i];
          $(update).addClass("update-div");
          $(update).addClass("btn");
          $(update).addClass("btn-primary");

          var b3 = document.createElement("br");
          var b4 = document.createElement("br");
          var b5 = document.createElement("br");
          $(col).append(imgDiv);
          $(col).append(colBody);
          $(imgDiv).append(image);
          $(colBody).append(k);
          $(colBody).append(id);
          $(colBody).append(b1);

          $(colBody).append(d);
          $(colBody).append(p);
          $(colBody).append(b1);
          $(colBody).append(z);
          $(colBody).append(q);
          $(colBody).append(b2);
          $(colBody).append(n);
          $(colBody).append(r);
          $(colBody).append(b4);
          $(colBody).append(y);
          $(colBody).append(b5);
          $(colBody).append(m);
          $(colBody).append(b5);
          $(colBody).append(b3);
          $(colBody).append(del);
          $(colBody).append(update);
        }
      }
    });
}

function UploadData() {
  var firstName = document.getElementById("FirstName").value;
  var lastName = document.getElementById("LastName").value;
  var phoneNumber = document.getElementById("PhoneNumber").value;
  var getSelectedValue = document.querySelector('input[name="Gender"]:checked');
  var y = document.getElementById("bloodgroup").selectedIndex;
  var group = document.getElementsByTagName("option")[y].value;

  var HealthCondition = document.getElementById("healthcondition").value;
  user = firebase.auth().currentUser;
  console.log("submiting");
  UserData(firstName, phoneNumber);

  firebase
    .database()
    .ref("/Users/" + user.uid)
    .set({
      FirstName: firstName,
      LastName: lastName,
      PhoneNumber: phoneNumber,
      Gender: getSelectedValue.value,
      BloodGroup: group,
      HealthCondition: HealthCondition,
    })
    .then(function () {
      window.location = "index1.html";
    });
}

function ResetPassword() {
  var auth = firebase.auth();
  var emailAddress = document.getElementById("email").value;
  if (emailAddress != "") {
    auth
      .sendPasswordResetEmail(emailAddress)
      .then(function () {
        // Email sent.
        window.alert(
          "Password reset link has been sent to your registered email"
        );
      })
      .then(function () {
        window.location = "login.html";
      })
      .catch(function (error) {
        // An error happened.
        var errorMessage = error.message;
        alert(errorMessage);
      });
  } else {
    window.alert("Please Enter your email first");
  }
}

function DeleteData() {
  console.log(userName);
}

function Updatehealthcondition() {
  var HealthCondition = document.getElementById("healthcondition").value;
  user = firebase.auth().currentUser;
  console.log("submiting");
  firebase
    .database()
    .ref("/Users/" + user.uid)
    .update({
      HealthCondition: HealthCondition,
    })
    .then(function () {
      window.alert(
        "Successfully updated, you will be redirected to dashboard."
      );
    })
    .then(function () {
      window.location = "profile.html";
    });
}

function DeleteUser() {
  var user = firebase.auth().currentUser;

  user
    .delete()
    .then(function () {
      // User deleted.
      window.location = "index.html";
    })
    .catch(function (error) {
      // An error happened.
      var errorMessage = error.message;
      alert(errorMessage);
    });
}

function UserData(firstName) {
  var user = firebase.auth().currentUser;

  user
    .updateProfile({
      displayName: firstName,
    })
    .catch(function (error) {
      var errorMessage = error.message;
      alert(errorMessage);
    });
}

function updateprofile() {
  var user = firebase.auth().currentUser;
  var file = document.getElementById("file").files[0];
  var downloadurl;

  var fileName = file.name;
  var storageRef = firebase.storage().ref("profiles/" + fileName);

  var uploadTask = storageRef.put(file);
  uploadTask.on(
    "state_changed",
    function (snapshot) {
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log("upload is " + progress + "done");
    },
    function (error) {
      console.log(error.message);
    },
    function () {
      downloadurl = uploadTask.snapshot.downloadURL;
      user
        .updateProfile({
          photoURL: downloadurl,
        })
        .then(function () {
          // Update successful.
          userprofileimage();
        })
        .catch(function (error) {
          // An error happened.
        });
    }
  );
}
function userprofileimage() {
  var user = firebase.auth().currentUser;

  var image = document.getElementById("profileimage");
  if (user.photoURL !== null) {
    image.src = user.photoURL;
  } else {
    image.src = "img/avatar.jpg";
  }
}

function deleteprofilephoto() {
  var user = firebase.auth().currentUser;

  user
    .updateProfile({
      photoURL: "img/avatar.jpg",
    })
    .then(function () {
      // Update successful.
    })
    .catch(function (error) {
      // An error happened.
    });
}

function updateemail() {
  var user = firebase.auth().currentUser;
  var changeddemail = document.getElementById("updateemail").value;

  user
    .updateEmail(changeddemail)
    .then(function () {
      // Update successful.
    })
    .catch(function (error) {
      // An error happened.
    });
}

function generatehealthcard() {
  var name = document.getElementById("name").value;
  var file = document.getElementById("file").files[0];
  var downloadurl;
  var image = document.getElementById("cardimage");
  var cardname = document.getElementById("cardname");
  var cardsex = document.getElementById("card_sex");
  var cardbg = document.getElementById("card_bg");

  cardname.innerText = name;
  var carddob = document.getElementById("card_dob");
  var user;

  firebase
    .database()
    .ref("/Users/" + userName.uid)
    .once("value")
    .then(function (snapshot) {
      user = snapshot.val();
      console.log(user);
    });

  var fileName = file.name;
  var storageRef = firebase.storage().ref("cardphoto/" + fileName);

  var uploadTask = storageRef.put(file);
  uploadTask.on(
    "state_changed",
    function (snapshot) {
      var uploadprogress = document.getElementById("progress");
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      downloadurl = uploadTask.snapshot.downloadURL;

      console.log("upload is " + progress + "done");
      if (progress !== 0) {
        uploadprogress.innerText = progress.toFixed(0) + "%";
        document.getElementById("progress").style.width =
          progress.toFixed(0) + "%";
        console.log(user);
      }

      if (progress === 100) {
        document.getElementById("uploadsuccess").style.visibility = "visible";
      }
    },
    function (error) {
      console.log(error.message);
    },
    function () {
      downloadurl = uploadTask.snapshot.downloadURL;
      image.src = downloadurl;
      console.log(user);
      if (user) {
        carddob.innerText = user.PhoneNumber;
        cardbg.innerText = user.BloodGroup;
        cardsex.innerText = user.Gender;
      }

      console.log(carddob);

      var qrcode = new QRCode("qrcode");
      qrlink = userName.phoneNumber;
      console.log(userName);
      function makeCode() {
        // document.getElementById("text").value = qrlink;
        var elText = qrlink;

        qrcode.makeCode(elText);
      }

      makeCode();

      $("#text")
        .on("blur", function () {
          makeCode();
        })
        .on("keydown", function (e) {
          if (e.keyCode == 13) {
            makeCode();
          }
        });
      document.getElementById("check").style.visibility = "visible";
      document.getElementById("downloadcard").style.visibility = "visible";
    }
  );
}

function downloadcard() {
  var card = document.getElementById("card");
  var opt = {
    margin: 1,
    filename: "Smart Health Card.pdf",
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
  };

  html2pdf().from(card).set(opt).save();
}

function newPassword() {
  var user = firebase.auth().currentUser;
  console.log(user);
  var newpassword = document.getElementById("newpassword").value;
  var confirmpassword = document.getElementById("confirmnewpassword").value;
  if (newpassword === confirmpassword) {
    user
      .updatePassword(newpassword)
      .then(function () {
        // Update successful.
        window.alert(
          "password successfully updated, login again with your new password"
        );
      })
      .then(function () {
        window.location = "login.html";
      })

      .catch(function (error) {
        // An error happened.
        console.log(error.message);
      });
  } else {
    window.alert("passwords doesnot match");
  }
}

function changeemail() {
  var user = firebase.auth().currentUser;
  var newmail = document.getElementById("newemail").value;

  user
    .updateEmail(newmail)
    .then(function () {
      // Update successful.
    })
    .then(function () {
      window.alert(
        "Successfully Updated your e-mail, login again with your new credentials"
      );
    })
    .then(function () {
      window.location = "login.html";
    })
    .catch(function (error) {
      // An error happened.
    });
}

function reauthenticateuser() {
  var user = firebase.auth().currentUser;
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  var credential = firebase.auth.EmailAuthProvider.credential(email, password);

  user
    .reauthenticateWithCredential(credential)
    .then(function () {
      DeleteUser();
    })
    .catch(function (error) {
      console.log(error.message);
    });
}

function updatedoc() {
  var downloadurl;
  var date = document.getElementById("name").value;
  var hospital = document.getElementById("hospital").value;
  var medicationpurpose = document.getElementById("medicationpurpose").value;

  var name = document.getElementById("name1").value;

  var file = document.getElementById("file").files[0];

  var fileName = file.name;
  var storageRef = firebase.storage().ref("files/" + fileName);

  var uploadTask = storageRef.put(file);
  uploadTask.on(
    "state_changed",
    function (snapshot) {
      var uploadprogress = document.getElementById("progress");
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

      console.log("upload is " + progress + "done");
      if (progress !== 0) {
        uploadprogress.innerText = progress.toFixed(0) + "%";
        document.getElementById("progress").style.width =
          progress.toFixed(0) + "%";
      }

      if (progress === 100) {
        document.getElementById("uploadsuccess").style.visibility = "visible";
      }
    },
    function (error) {
      console.log(error.message);
    },
    function () {
      downloadurl = uploadTask.snapshot.downloadURL;
      var code = window.location.href;

      var n = code.lastIndexOf("?");
      var result = code.substring(n + 1);
      console.log(result);
      firebase
        .database()
        .ref("/Users/" + userName.uid + "/elements/" + result)
        .set({
          date: date,
          hospital: hospital,
          medicationpurpose: medicationpurpose,
          name: name,

          url: downloadurl,
        })
        .then(function () {
          window.location = "healthrecords.html";
        });
    }
  );
}

function deletedoc() {
  var code = window.location.href;
  console.log(userName);

  var n = code.lastIndexOf("?");
  var result = code.substring(n + 1);
  console.log(result);
  firebase
    .database()
    .ref("/Users/" + userName.uid + "/elements/" + result)
    .remove()
    .then(function () {
      window.alert("Deleted successfully");
    })
    .then(function () {
      window.location = "healthrecords.html";
    });
}

function showprofiledata() {
  var cardname = document.getElementById("card_name");
  //var carddob = document.getElementById("card_dob");
  var cardsex = document.getElementById("card_sex");
  var cardbg = document.getElementById("card_bg");
  var cardhealth = document.getElementById("card_health");
  var user;
  firebase
    .database()
    .ref("/Users/" + userName.uid)
    .once("value")
    .then(function (snapshot) {
      user = snapshot.val();
      console.log(user);
    })
    .then(function () {
      console.log(user);
      cardname.innerText = user.LastName + " " + user.FirstName;
      //carddob.innerText = user.PhoneNumber;
      cardbg.innerText = user.BloodGroup;
      cardsex.innerText = user.Gender;
      cardhealth.innerText = user.HealthCondition;
    });
}

function showusername() {
  var cardname = document.getElementById("username");

  var user;
  firebase
    .database()
    .ref("/Users/" + userName.uid)
    .once("value")
    .then(function (snapshot) {
      user = snapshot.val();
      console.log(user);
    })
    .then(function () {
      console.log(user);
      cardname.innerText = user.FirstName;
    });
}
