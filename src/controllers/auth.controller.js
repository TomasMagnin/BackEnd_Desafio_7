import { UserModel } from "../DAO/models/users.model.js";

export const renderSessionView = (req, res) => {
    return res.send(JSON.stringify(req.session));
};

export const renderLoginView = (req, res) => {
    return res.render("login", {});
};

export const handleLogin = (req, res) => {
    if (!req.user) {
        return res.json({ error: 'invalid credentials' });
    }
    req.session.user = { _id: req.user._id, email: req.user.email, firstName: req.user.firstName, lastName: req.user.lastName, age: req.user.age, role: req.user.role };
    return res.redirect('/api/products');
};

export const renderFailLoginView = async (req, res) => {
    return res.json({ error: 'fail to login' });
};

export const renderRegisterView = (req, res) => {
    return res.render("register", {});
};

export const handleRegister = (req, res) => {
    if (!req.user) {
        return res.json({ error: 'something went wrong' });
    }
    req.session.user = { _id: req.user._id, email: req.user.email, firstName: req.user.firstName, lastName: req.user.lastName, age: req.user.age, role: req.user.role };
    return res.redirect('/auth/login');
};

export const renderFailRegisterView = async (req, res) => {
    return res.json({ error: 'fail to register' });
};

export const renderProductsView = async (req, res) => {
    try {
        const user = await UserModel.findOne({ email: req.session.email });
        if (user) {
            const userData = {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                age: user.age,
                cartID: user.cartID,
                role: user.role,
            };
            return res.render('products', { user: userData });
        } else {
            return res.render('products', { user: null });
        }
    } catch (error) {
        console.error(error);
        return res.render('products', { user: null, error: 'Error retrieving user data' });
    }
};

export const renderProfileView = (req, res) => {
    const user = { email: req.session.email, role: req.session.role };
    return res.render('profile', { user: user });
};

export const handleLogout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).render('error', { error: 'session couldnt be closed' });
        }
        return res.redirect('/auth/login');
    });
};

export const renderAdministrationView = (req, res) => {
    return res.send('Data');
};