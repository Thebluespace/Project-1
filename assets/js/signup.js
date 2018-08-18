
var signUpApp = {
    signUpAppend: function (event) {
        var adduserform = $("<form>")
        var label4 = $("<label>").text("Please Enter Your Full Name");
        var userRealName = $("<input>").addClass("realname").attr("type", "text");
        var label5 = $("<label>").text("Please enter an email");
        var userEmail = $("<input>").addClass("userEmail").attr("type", "text");
        var label6 = $("<label>").text("Explain Why You'd Like To Go To Mars");
        var marsExplanation = $("<textarea>").addClass("marsInput").attr("type", "text");
        var label7 = $("<label>").text("Please Elaborate On Your Skill Set And Experience");
        var skillSet = $("<textarea>").addClass("skillSet").attr("type", "text");
        var submit3 = $("<button>");
        submit3.text("submit");
        submit3.attr("type", "button");
        submit3.addClass("submit3button");
        submit3.on("click", );
        adduserform.append(label4, $("<br>"), userRealName, $("<br>"), label5, $("<br>"), userEmail, $("<br>"), label6, $("<br>"), marsExplanation, $("<br>"), label7, $("<br>"), skillSet, $("<br>"), submit3, );
        var newUserDiv = $("<div>").addClass("newUserDiv");
        $(newUserDiv).append(adduserform);
        $(".formArea").append(newUserDiv);
        console.log("fired");

    },
    // userLogin: function (event) {
    //     var userUser = $(".Username").val();
    //     appObj.currentUser.userName = userUser;
    //     var userPass = $(".Password").val();
    //     try {
    //         database.ref("dbo_users_table/users/" + userUser).once("value", function (snapshot) {
    //             var ref = snapshot;
    //             if (ref.child("password").exists()) {
    //                 if (ref.child("password").val() === userPass) {
    //                     sessionStorage.setItem("username", userUser);
    //                     $(".loginDiv").remove();
    //                 } else {
    //                     alert("Incorrect password!");
    //                 }
    //             } else {
    //                 alert("user does not exist!");
    //             }
    //             appObj.loginComplete();
    //         });

    //     } catch (error) {
    //         console.error(error);
    //     }
    // },



}