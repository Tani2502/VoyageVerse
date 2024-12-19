
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
  import { getDatabase, ref , set , get , child } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-database.js";
  

  const firebaseConfig = {
    apiKey: "AIzaSyDIJRpM5QyamZVrMokeMDtp03lSlhveSAc",
    authDomain: "voyageverse2-3d69a.firebaseapp.com",
    projectId: "voyageverse2-3d69a",
    storageBucket: "voyageverse2-3d69a.firebasestorage.app",
    messagingSenderId: "176824786662",
    appId: "1:176824786662:web:56462e5a12b89cf592a527"
  };


  const app = initializeApp(firebaseConfig);

  const db = getDatabase(app);

  document.getElementById("submit").addEventListener('click',function(e){
    set(ref(db, '/user' + document.getElementById("username").value),
    {

        username: document.getElementById("username").value,
        email:document.getElementById("email").value,
        password:document.getElementById("password").value
    });

    alert("Login Successful !");

  })