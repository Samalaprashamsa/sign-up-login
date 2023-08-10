const express = require("express");
const path = require("path");
const app = express();
const LogInCollection = require("./mongo");
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const tempelatePath = path.join(__dirname, '../tempelates'); // Corrected the typo
const publicPath = path.join(__dirname, '../public');
console.log(publicPath);

app.set('view engine', 'hbs');
app.set('views', tempelatePath);
app.use(express.static(publicPath));

app.get('/signup', (req, res) => {
    res.render('signup');
});

app.get('/', (req, res) => {
    res.render('login');
});

app.post('/signup', async (req, res) => {
    try {
        const checking = await LogInCollection.findOne({ name: req.body.name });

        if (checking) {
            res.send("User details already exist");
        } else {
            const data = {
                name: req.body.name,
                password: req.body.password,
            };
            await LogInCollection.create(data);
            res.status(201).render("home", { naming: req.body.name });
        }
    } catch (error) {
        console.error("Error during signup:", error);
        res.send("Error during signup");
    }
});

app.post('/login', async (req, res) => {
    try {
        const check = await LogInCollection.findOne({ name: req.body.name });

        if (check && check.password === req.body.password) {
            res.status(201).render("home", { naming: req.body.name });
        } else {
            res.send("Incorrect password");
        }
    } catch (error) {
        console.error("Error during login:", error);
        res.send("Error during login");
    }
});

app.listen(port, () => {
    console.log('Server is running on port', port);
});
