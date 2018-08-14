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

  var appObj = {
      currentUser: {
          userName: "",
      },
      apis: {
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
            var userUser = $(".Username").val();
            appObj.currentUser.userName = userUser;
            var userPass = $(".Password").val();
            try {
                appObj.nyApiCall();
                database.ref("dbo_users_table/users/" + userUser).once("value",function(snapshot){
                var ref = snapshot;
                if (ref.child("password").exists()){
                      if (ref.child("password").val() === userPass) {
                          localStorage.setItem("username",userUser);
                          $(".loginDiv").remove();
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
            var userUser = $(".newUserName").val();
            try {
                database.ref("dbo_users_table/users").once("value",function(snapshot){
                    console.log(snapshot);
                    if($(".newUserName").val() == "" || $(".newRealName").val() == "" || $(".newEmail").val() == "" || $(".newPassword").val() == "") {
                        alert("Please make sure all fields are filled!");
                        return;
                    } else {
                        if (snapshot.child(userUser).exists()){
                            alert("Username already taken!");
                        } else {
                            //get user details from page
                                // var userName = $(".newUserName").val();
                                var name = $(".realname").val();
                                var email = $(".userEmail").val();
                                var password = $(".newPassword").val();
                                database.ref("dbo_users_table/users").update(userUser);
                                database.ref("dbo_users_table/users" + userUser).update({
                                    "name": name,
                                    "email": email,
                                    "password": password
                            })
                                var h1 = $("<h4>");
                                h1.text("User created successfully!");
                                $(".newUserDiv").append(h1);
                                setTimeout(function(){
                                    $(".newUserDiv").remove();
                                },1500);
                        }
                    }
                });
                
            } catch (error) {
                console.error(error)
                var h1 = $("<h1>");
                h1.text("Error creating user! Please refresh the page and try again!");
                $(".newUserDiv").append(h1);
            }
        },
        load: function(){
            appObj.getFromServer();
            //appObj.checkLocalData(); //local storage added but turned off for debugging
            database.ref("dbo_users_table/users/" + appObj.currentUser.userName).once("value",function(snapshot){
                if (snapshot.child("password").exists()){
                    //user logged in from memory, prevents form from loading.
                    return;
                } else {
                    var form = $("<form>").addClass("newUserForm");
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
                    form.append(label1,$("<br>"),userName,$("<br>"),label2,$("<br>"),password,$("<br>"),submit,addUser);
                    var loginDiv = $("<div>");
                    loginDiv.addClass("loginDiv");
            
                    $(loginDiv).append(form);
                    $("#container").append(loginDiv);
                }
             });
        },
        createAccount: function(event) {
            try {
                $(".loginDiv").remove();
                var adduserform = $("<form>");
                var label2 = $("<label>");
                label2.text("Enter New Username");
                var label3 = $("<label>");
                label3.text("Enter New Password");
                var label4 = $("<label>").text("Please enter your name");
                var label5 = $("<label>").text("Please enter an email");
                var userRealName = $("<input>").addClass("realname").attr("type","text");
                var userEmail = $("<input>").addClass("userEmail").attr("type","text");
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
                adduserform.append(label2,$("<br>"),newUserName,$("<br>"),label4,$("<br>"),userRealName,$("<br>"),label5,$("<br>"),userEmail,$("<br>"),label3,$("<br>"),newPassword,$("<br>"),submit2,);
                var newUserDiv = $("<div>").addClass("newUserDiv");
                $(newUserDiv).append(adduserform);
                $("#container").append(newUserDiv);
            } catch (error) {
                    console.error(error);
            }
           
        },
        checkLocalData: function(){
            try {
                appObj.currentUser.userName = localStorage.getItem("username");
            } catch (error) {
                console.error(error);
            }
        },
        nyApiCall: function(){
            try {
                var queryUrl = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
                queryUrl += '?' + "q=Mars&api-key=936b6f0cf05a4e3ca7afc7ba77b3115e";
                $.ajax({
                    url: queryUrl,
                    method: "GET"
                }).done(function(result) {
                    console.log(result);
                }).fail(function(err) {
                    console.error(err);
                });
            } catch (error) {
             console.error(error);
            }
        },
        getFromServer: function(){
            try {
                database.ref("dbo_api_table").once("value",function(data){
                    appObj.apis = (data.child("apis").val());
                }); 
            } catch (error) {
                console.error(error);
            }
        }
  };


  

  // creating initial database
  // user structure

//   var users = {
//       "tecgreene93": {
//         name: "Thomas Greene",
//         emai: "tecgreene93@gmail.com",
//         password : "welcome1",
//         favs: {

//         }
//       },
//       "rajones704": {
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
//       },
//         nytimes: {
//             apiUrl : "https://api.nytimes.com/svc/search/v2/articlesearch.json",
//             apiKey : "936b6f0cf05a4e3ca7afc7ba77b3115e"
//         }
//   };
// var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
// url += '?' + $.param({
//   'api-key': "936b6f0cf05a4e3ca7afc7ba77b3115e",
//   'q': "Mars"
// });

  //database.ref("dbo_users_table").update({users});
    //database.ref("dbo_api_table").update({apis});