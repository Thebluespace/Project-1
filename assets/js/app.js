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

// var appObj = {
//     createUserDetails: {
//         userName: "",
//         name: "",
//         email: "",
//         password: "",
//         favs: {
//             link1: ""
//         }
//     },
//     userLogin: function (event) {
//         event.preventDefault();
//         var userUser = $(".username").val().toLowerCase();
//         var userPass = $(".password").val();
//         //   console.log(userPass);
//         try {
//             database.ref("dbo_users_table/users/" + userUser).once("value", function (snapshot) {
//                 var ref = snapshot;
//                 //   console.log(ref);
//                 //   console.log(ref.child("password"));
//                 if (ref.child("password").exists()) {
//                     if (ref.child("password").val() === userPass) {
//                         alert("Succussfull Login!");
//                     } else {
//                         alert("Incorrect password!");
//                     }
//                 } else {
//                     alert("user does not exist!");
//                 }
//             });

//         } catch (error) {
//             console.error(error);
//         }
//     },
//     createUser: function (event) {
//         vent.preventDefault();
//         var userUser = $(".username").val().toLowerCase();
//         var userPass = $(".password").val();
//         try {
//             database.ref("dbo_users_table/users").once("value", function (snapshot) {
//                 if (snapshot.chi(userUser)) {
//                     alert("Username already taken!");
//                 } else {
//                     //get user details from page
//                     var newUser = createUserDetails
//                     database.ref("dbo_users_table/users").update({ newUser });
//                 }
//             });

//         } catch (error) {
//             console.error(error)
//         }
//     },

//     load: function () {
//         var form = $("<form>");
//         var label1 = $("<label>");
//         label1.text("Enter Username");
//         var label2 = $("<label>");
//         label2.text("Enter Password");
//         var userName = $("<input>");
//         userName.addClass("Username");
//         userName.attr("type", "text");
//         var password = $("<input>");
//         password.addClass("Password");
//         password.attr("type", "password");
//         var submit = $("<button>");
       
//         submit.attr("type", "button");
//         submit.addClass("loginButton");
//         submit.text("SUBMIT");
//         submit.on("click", appObj.userLogin);
//         form.append(label1, $("<br>"), userName, $("<br>"), label2, $("<br>"), password, $("<br>"), submit, addUser);
//         var loginDiv = $("<div>");
//         loginDiv.addClass("loginDiv");

//         $(loginDiv).append(form);
//         $(".container").append(loginDiv);
//     },
   


// };
  var appObj = {
      currentUser: {
          userName: "",

      },
      createUserDetails: {
          userName: "",
          name: "",
          email: "",
          password: "",
          favs: {
            link1: ""
          }
      },
        userLogin: function(event){
            event.preventDefault();
            var userUser = $(".Username").val();
            appObj.currentUser.userName = userUser;
            var userPass = $(".Password").val();
          //   console.log(userPass);
            try {
                database.ref("dbo_users_table/users/" + userUser).once("value",function(snapshot){
                var ref = snapshot;
              //   console.log(ref);
              //   console.log(ref.child("password"));
                if (ref.child("password").exists()){
                      if (ref.child("password").val() === userPass) {
                          //alert("Succussfull Login!");
                          localStorage.setItem("username",userUser);
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
        },
        createUser: function(event){
            vent.preventDefault();
            var userUser = $(".username").val().toLowerCase();
            var userPass = $(".password").val();
            try {
                database.ref("dbo_users_table/users").once("value",function(snapshot){
                    if (snapshot.child(userUser).exists()){
                        alert("Username already taken!");
                    } else {
                        //get user details from page
                        var newUser = {
                            // userName = $().val();
                            // name = $().val();
                            // email = $().val();
                            // password = $().val();
                        }
                        database.ref("dbo_users_table/users").update({newUser});
                    }
                });
                
            } catch (error) {
                console.error(error)
            }
        },
        load: function(){
            //appObj.checkLocalData(); //local storage added but turned off for debugging
            database.ref("dbo_users_table/users/" + appObj.currentUser.userName).once("value",function(snapshot){
                if (snapshot.child("password").exists()){
                    //user logged in from memory, prevents form from loading.
                    return;
                } else {
                    var form = $("<form>");
                    var label1 = $("<label>");
                    label1.text("Enter Username");
                    var label2 = $("<label>");
                    label2.text("Enter Password");
                    var userName = $("<input>");
                    userName.addClass("Username");
                    userName.attr("type","text");
                    var password = $("<input>");
                    password.addClass("Password");
                    password.attr("type","password");
                    var addUser = $("<button>")
                    addUser.attr("type", "button");
                    addUser.addClass("adduserbutton");
                    addUser.text("Create an Account");
                    addUser.on("click", appObj.createAccount);
                    var submit = $("<button>");
                    submit.attr("type","button");
                    submit.addClass("loginButton");
                    submit.text("SUBMIT");
                    submit.on("click",appObj.userLogin);
                    form.append(label1,$("<br>"),userName,$("<br>"),label2,$("<br>"),password,$("<br>"),submit);
                    var loginDiv = $("<div>");
                    loginDiv.addClass("loginDiv");
            
                    $(loginDiv).append(form);
                    $(".container").append(loginDiv);
                }
             });
        },
        createAccount: function(event) {
       
            $(".loginDiv").hide();
            var adduserform = $("<form>");
            var label2 = $("<label>");
            label2.text("Enter New Username");
            var label3 = $("<label>");
            label3.text("Enter New Password");
            var newUserName = $("<input>");
            newUserName.addClass("newUserName");
            newUserName.attr("type","text");
            var newPassword = $("<input>");
            newPassword.addClass("newPassword");
            newPassword.attr("type","password");
            var submit2 = $("<button>");
            submit2.text("submit");
            submit2.attr("type","button");
            submit2.addClass("submit2button");
            submit2.on("click",appObj.createUser);
           adduserform.append(label2,$("<br>"),newUserName,$("<br>"),label3,$("<br>"),newPassword,$("<br>"),submit2,);
           var newUserDiv = $("<div>");
           $(newUserDiv).append(adduserform);
           $(".container").append(newUserDiv);
           
        },
        checkLocalData: function(){
            try {
                appObj.currentUser.userName = localStorage.getItem("username");
            } catch (error) {
                console.error(error);
            }
        }

  };

  

  

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