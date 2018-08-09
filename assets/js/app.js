var config = {
    apiKey: "AIzaSyCGbiQ4HQb_wwy7oAlHerMCPlSaJjzVUwE",
    authDomain: "unc-project1-space.firebaseapp.com",
    databaseURL: "https://unc-project1-space.firebaseio.com",
    projectId: "unc-project1-space",
    storageBucket: "unc-project1-space.appspot.com",
    messagingSenderId: "427721715624"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  function userLogin(event){
      event.preventDefault();
      var userUser = $(".username").val().toLowerCase();
      var userPass = $(".password").val();
    //   console.log(userPass);
      try {
          database.ref("dbo_users_table/users/" + userUser).once("value",function(snapshot){
          var ref = snapshot;
        //   console.log(ref);
        //   console.log(ref.child("password"));
          if (ref.child("password").exists()){
                if (ref.child("password").val() === userPass) {
                    alert("Succussfull Login!");
                } else {
                    alert("Incorrect password!");
                }
          } else {
              alert("user does not exist!");
          }
        });
          
      } catch (error) {
          console.error(error);
      }

  }

  function load(){
        var form = $("<form>");
        var label1 = $("<label>");
        label1.text("Please enter Username");
        var label2 = $("<label>");
        label2.text("Please enter your password");
        var userName = $("<input>");
        userName.addClass("username");
        userName.attr("type","text");
        var password = $("<input>");
        password.addClass("password");
        password.attr("type","password");
        var submit = $("<button>");
        submit.attr("type","button");
        submit.addClass("loginButton");
        submit.text("SUBMIT");
        submit.on("click",userLogin);
        form.append(label1,$("<br>"),userName,$("<br>"),label2,$("<br>"),password,$("<br>"),submit);
        $(".container").append(form);
        
  }

  // creating initial database

//   var users = {
//       "tecgreene93": {
//         username: "tecgreene93",
//         name: "Thomas Greene",
//         emai: "tecgreene93@gmail.com",
//         password : "welcome1",
//         favs: {

//         }
//       },
//       "rajones704": {
//         username: "rajones704",
//         name: "Rich Jones",
//         emai: "rajones704@gmail.com",
//         password : "welcome1",
//         favs: {
            
//         }
//       },
//       "treybrewer21": {
//         name: "Trey Brewer",
//         emai: "trey.brewer21@yahoo.com",
//         password : "welcome1",
//         favs: {
            
//         }
//       }
//   };


//   var apis = {
//       nasa: {
//           apiUrl: "https://api.nasa.gov/planetary/apod?api_key=",
//           apiKey : "dFJonK0i9i110qJccM4dRWZ3bXEgu2U2moofcFHT",
//       }
//   };
//   database.ref("dbo_users_table").update({users});
//   database.ref("dbo_api_table").update({apis});