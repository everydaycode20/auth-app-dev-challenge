const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const User = require("../../models/client").User;

const comparePassword = require("../compare_password").comparePassword;

passport.use(new LocalStrategy((username, password, done) => {
    User.findOne({email: username}).then(user => {
        if (!user) {
            done(null, false);
        }
        else{
            comparePassword(password, user.password).then(isValid => {
                if (isValid) {
                    done(null, user);
                }
                else{
                    done(null, false);
                }
            });
        }
    });
}));

passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {
        done(null, user)
    }).catch(err => done(err));
});