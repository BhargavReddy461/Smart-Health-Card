var fireBase = fireBase || firebase;
var hasInit = false;
var firebaseConfig = {
  apiKey: "AIzaSyBAIKqO4dn75o79nllK0s-VAHgyfS_Xd8o",
  authDomain: "find-44825.firebaseapp.com",
  databaseURL: "https://find-44825-default-rtdb.firebaseio.com",
  projectId: "find-44825",
  storageBucket: "find-44825.appspot.com",
  messagingSenderId: "907775142726",
  appId: "1:907775142726:web:465d971a7127bed9e05347",
};

if (!hasInit) {
  firebase.initializeApp(firebaseConfig);
  hasInit = true;
}
