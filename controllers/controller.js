const { User } = require(`../models/index.js`);
const bcrypt = require(`bcryptjs`);

class Controller {
    static async renderHome(req, res) {
        try {
            res.render(`home`);
        } catch (error) {
            res.send(error);
        }
    }

    static async renderPortal(req, res) {
        try {
            res.render(`portal`);
        } catch (error) {
            res.send(error);
        }
    }

    static async renderLogin(req, res) {
        try {
            const { errors } = req.query;
            res.render(`sign-in`, {errors});
        } catch (error) {
            res.send(error);
        }
    }

    static async handlerLogin(req, res) {
        try {
            const { email, password } = req.body;
            const data = await User.findOne({
                where: {
                    email
                }
            });

            if(data) {
                const isValidPassword = bcrypt.compareSync(password, data.password);

                if(isValidPassword) {
                    req.session.UserId = data.id;
                    req.session.role = data.role;
                    res.redirect(`/`)
                } else {
                    const errors = `Invalid email or password`;
                    res.redirect(`/portals/signIn?errors=${errors}`)
                }
            } else {
                const errors = `Invalid email or password`;
                res.redirect(`/portals/signIn?errors=${errors}`);
            }
        } catch (error) {
            res.send(error);
        }
    }

    static async renderSignUp(req, res) {
        try {
            const { errors } = req.query;
            res.render(`sign-up`, {errors});
        } catch (error) {
            res.send(error);
        }
    }

    static async handlerSignUp(req, res) {
        try {
            const {username, email, password, role} = req.body;

            console.log(username, email, password, role);

            await User.create({
                username,
                email,
                password,
                role
            })

            res.redirect(`/portals/signIn`);
        } catch (error) {
            if (error.name === `SequelizeValidationError`) {
                const errors = error.errors.map((el) => {
                    return el.message
                });

                res.redirect(`/portals/signUp?errors=${errors}`);
            } else {
                console.log(error);
                res.send(error);
            }
        }
    }

    static async handlerSignOut(req, res) {
        try {
            req.session.destroy((error) => {
                if(error) {
                    res.send(error)
                } else {
                    res.redirect(`/`);
                }
            })
        } catch (error) {
            res.send(error);
        }
    }

    // static async renderLogin(req, res) {
    //     try {
            
    //     } catch (error) {
            
    //     }
    // }
    // static async renderLogin(req, res) {
    //     try {
            
    //     } catch (error) {
            
    //     }
    // }
}

module.exports = Controller;