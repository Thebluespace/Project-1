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


    userLogin: function (event) {
        var userUser = $(".Username").val();
        appObj.currentUser.userName = userUser;
        var userPass = $(".Password").val();
        try {
            database.ref("dbo_users_table/users/" + userUser).once("value", function (snapshot) {
                var ref = snapshot;
                if (ref.child("password").exists()) {
                    if (ref.child("password").val() === userPass) {
                        localStorage.setItem("username", userUser);
                        $(".loginDiv").remove();
                    } else {
                        alert("Incorrect password!");
                    }
                } else {
                    alert("user does not exist!");
                }
                appObj.loginComplete();
            });

        } catch (error) {
            console.error(error);
        }
    },
    createUser: function (event) {
        var userUser = $(".newUserName").val();
        try {
            database.ref("dbo_users_table/users").once("value", function (snapshot) {
                console.log(snapshot);
                if ($(".newUserName").val() == "" || $(".newRealName").val() == "" || $(".newEmail").val() == "" || $(".newPassword").val() == "") {
                    alert("Please make sure all fields are filled!");
                    return;
                } else {
                    if (snapshot.child(userUser).exists()) {
                        alert("Username already taken!");
                    } else {
                        //get user details from page
                        var name = $(".realname").val();
                        var email = $(".userEmail").val();
                        var password = $(".newPassword").val();
                        database.ref("dbo_users_table/users/" + userUser).update({
                            "name": name,
                            "email": email,
                            "password": password
                        });
                        
                        var h1 = $("<h4>");
                        h1.text("User created successfully!");
                        $(".newUserDiv").append(h1);
                        setTimeout(function () {
                            $(".newUserDiv").remove();
                            appObj.loginComplete();
                        }, 1500);

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
    load: function () {
        appObj.getFromServer();
        appObj.Begin();
        // appObj.checkLocalData(); //local storage added but turned off for debugging
        database.ref("dbo_users_table/users/" + appObj.currentUser.userName).once("value", function (snapshot) {
            if (snapshot.child("password").exists()) {
                appObj.loginComplete();
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
                userName.attr("type", "text");
                var password = $("<input>");
                password.addClass("Password");
                password.attr("type", "password");
                var addUser = $("<button>")
                addUser.attr("type", "button");
                addUser.addClass("adduserbutton");
                addUser.text("Create an Account");
                addUser.on("click", appObj.createAccount);
                var submit = $("<button>");
                submit.attr("type", "button");
                submit.addClass("loginButton");
                submit.text("Submit");
                submit.on("click", appObj.userLogin);
                // >>>>>>>>>I
                form.append(label1, $("<br>"), userName, $("<br>"), label2, $("<br>"), password, $("<br>"), submit, addUser);
                var loginDiv = $("<div>");
                loginDiv.addClass("loginDiv");
                $(loginDiv).append(form);
                $("#container").append(loginDiv);
            }
        });
    },
    logLoad: function () {
        try {
            appObj.nyApiCall();
        } catch (error) {
            console.error(error);
        }
    },
    createAccount: function (event) {
        try {
            $(".loginDiv").remove();
            var adduserform = $("<form>");
            var label2 = $("<label>");
            label2.text("Enter New Username");
            var label3 = $("<label>");
            label3.text("Enter New Password");
            var label4 = $("<label>").text("Please enter your name");
            var label5 = $("<label>").text("Please enter an email");
            var userRealName = $("<input>").addClass("realname").attr("type", "text");
            var userEmail = $("<input>").addClass("userEmail").attr("type", "text");
            var newUserName = $("<input>");
            newUserName.addClass("newUserName");
            newUserName.attr("type", "text");
            var newPassword = $("<input>");
            newPassword.addClass("newPassword");
            newPassword.attr("type", "password");
            var submit2 = $("<button>");
            submit2.text("submit");
            submit2.attr("type", "button");
            submit2.addClass("submit2button");
            submit2.on("click", appObj.createUser);
            adduserform.append(label2, $("<br>"), newUserName, $("<br>"), label4, $("<br>"), userRealName, $("<br>"), label5, $("<br>"), userEmail, $("<br>"), label3, $("<br>"), newPassword, $("<br>"), submit2, );
            var newUserDiv = $("<div>").addClass("newUserDiv");
            $(newUserDiv).append(adduserform);
            $("#container").append(newUserDiv);
        } catch (error) {
            console.error(error);
        }

    },
    checkLocalData: function () {
        try {
            appObj.currentUser.userName = localStorage.getItem("username");
        } catch (error) {
            console.error(error);
        }
    },
    nyApiCall: function () {
        try {
            var queryUrl = "https://newsapi.org/v2/top-headlines?q=mars&category=science&apiKey=56a5a397e2874610a264ec99b80d5d92";
            $.ajax({
                url: queryUrl,
                method: "GET"
            }).done(function (result) {
                console.log(result);
                var articles = result.articles;
                for (i = 0; i < articles.length; i++) {
                    try {
                        if (articles[i].title != "") {
                            var tr = $("<tr>");
                            var td = $("<td>");
                            td.text(articles[i].source.name);
                            var td1 = $("<td>");
                            td1.text(articles[i].title);
                            var anchor = $("<a>");
                            anchor.attr("target", "_blank");
                            anchor.attr("href", articles[i].url);
                            anchor.text("Click here to read");
                            var td2 = $("<td>");
                            td2.append(anchor);
                            tr.append(td, td1, td2);
                            $(".articleTable").append(tr);
                        }
                    } catch (error) {
                        console.error(error);
                    }
                }
            }).fail(function (err) {
                console.error(err);
            });
        } catch (error) {
            console.error(error);
        }
    },
    getFromServer: function () {
        try {
            database.ref("dbo_api_table").once("value", function (data) {
                appObj.apis = (data.child("apis").val());
            });
        } catch (error) {
            console.error(error);
        }
    },
    nasaApi: function () {
        var queryURL = "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=dFJonK0i9i110qJccM4dRWZ3bXEgu2U2moofcFHT";
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            var intervalId;
            function decrement() {
                number--;
                var imageURL = response.photos[number].img_src;
                var imageBuild = $("<img>");
                var image = imageBuild.attr("src", imageURL);
                image.addClass("rover");
                $(".rover").remove();
                $(".container-fluid").append(image);
                if (number === 0) {
                    number = 856;
                };
            }
            number = 856;
            intervalId = setInterval(decrement, 2 * 1000);
        })
    },

    Begin: function () {
        $(".nav-item").hide();
        $(".typewriter").hide();
        $(".articleTable").hide();
        $(".container-fluid").append(".loginDiv");
        return;
    },
    loginComplete: function () {

        $(".typewriter").show();
        $(".articleTable").show();
        $(".nav-item").show();
        $(".loginDiv").hide();
        $(".newUserDiv").hide();
        return;
    },
};

//googe maps functions
function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 0, lng: 0},
      zoom: 1,
      streetViewControl: false,
      mapTypeControlOptions: {
        mapTypeIds: ['mars']
      }
    });

    var marsMapType = new google.maps.ImageMapType({
      getTileUrl: function(coord, zoom) {
          var mars = {
            location: "mw1.google.com/mw-planetary/mars/elevation",
            name: 'elevation',
            zoomlevels: 9,
            copyright: 'NASA / JPL / GSFC / Arizona State University',
            caption: 'A shaded relief map color-coded by altitude'
          }
          var link = makeMarsMapType(mars)
          return link;
      },
      tileSize: new google.maps.Size(256, 256),
      maxZoom: 9,
      minZoom: 0,
      radius: 1738000,
      name: 'Mars'
    });

    map.mapTypes.set('mars', marsMapType);
    map.setMapTypeId('mars');
  }

  // Normalizes the coords that tiles repeat across the x axis (horizontally)
  // like the standard Google map tiles.
  function getNormalizedCoord(coord, zoom) {
    var y = coord.y;
    var x = coord.x;

    // tile range in one direction range is dependent on zoom level
    // 0 = 1 tile, 1 = 2 tiles, 2 = 4 tiles, 3 = 8 tiles, etc
    var tileRange = 1 << zoom;

    // don't repeat across y-axis (vertically)
    if (y < 0 || y >= tileRange) {
      return null;
    }

    // repeat across x-axis
    if (x < 0 || x >= tileRange) {
      x = (x % tileRange + tileRange) % tileRange;
    }

    return {x: x, y: y};
  }

  // google maps function
  function makeMarsMapType(m) {
    var opts = {
      baseUrl: 'https://' + m.location + '/',
      getTileUrl: function(tile, zoom) {
        var bound = Math.pow(2, zoom);
        var x = tile.x;
        var y = tile.y;
  
        // Don't repeat across y-axis (vertically).
        if (y < 0 || y >= bound) {
          return null;
        }
  
        // Repeat across x-axis.
        if (x < 0 || x >= bound) {
          x = (x % bound + bound) % bound;
        }
  
        var qstr = 't';
        for (var z = 0; z < zoom; z++) {
          bound = bound / 2;
          if (y < bound) {
            if (x < bound) {
              qstr += 'q';
            } else {
              qstr += 'r';
              x -= bound;
            }
          } else {
            if (x < bound) {
              qstr += 't';
              y -= bound;
            } else {
              qstr += 's';
              x -= bound;
              y -= bound;
            }
          }
        }
        return 'https://' + m.location + '/' + qstr + '.jpg';
      },
      tileSize: new google.maps.Size(256, 256),
      maxZoom: m.zoomlevels - 1,
      minZoom: 0,
      name: m.name.charAt(0).toUpperCase() + m.name.substr(1)
    };
    return new google.maps.ImageMapType(opts);
}