const User = require("../models/user");

module.exports.profile = function (req, res) {
  return res.render('user_profile', {
    title: 'User Profile',
    profile_user: req.user,
  });
};

// update user Details
module.exports.updateUser = async function(req, res){
  if(req.user.id == req.params.id){
    try{
    // by passing the req.body, we can update the fields which we want to update
    let user = await User.findByIdAndUpdate(req.params.id, req.body);
    return res.redirect('back');
  }
  catch(err){
      return res.redirect('back');
  }
  }else{
    return res.status(401).send('Unauthorized'); 
  }
  }


// render the Sign In page
module.exports.signIn = (req, res) => {
  if (req.isAuthenticated()) {
    return res.redirect('/employee/profile');
  }
  return res.render("signin.ejs");
};

// render the Sign Up page
module.exports.signUp = (req, res) => {
  if (req.isAuthenticated()) {
    return res.redirect('/employee/profile');
  }
  return res.render("signup.ejs");
};

// creating up a new user
module.exports.create = async (req, res) => {
  try {
    const { username, email, password, confirm_password } = req.body;

    // if password doesn't match
    if (password != confirm_password) {
      return res.redirect("back");
    }

    // check if user already exist
    let user = await User.findOne({ email });
   

    if (!user) {
      await User.create({email, password, username});
      return res.redirect("/");

    } else {
      console.log("error", "Email already registed!");
      return res.redirect("back");
    }
    } catch (err) {
      console.log(err);
      return;
    }
};

// sign in and create a session for the user
module.exports.createSession = (req, res) => {
  return res.redirect('/employee/dashboard');
};


module.exports.destroySession = function(req, res){
  //this functionality provides by passport.js (req.logout)
  req.logout(function(err){
    if(err){
      console.log('Error in logging out', err);
      return;
    }
    console.log('User logged out successfully!');
    return res.redirect('/');
  });
}