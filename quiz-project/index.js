let express = require(`express`);
let app = express();
let port = 3005;

app.listen(port, function () {
    console.log(`http://localhost:${port}`);
});

// Настройка CORS
let cors = require('cors');
app.use(cors({ origin: 'http://localhost:5173' }));

//Настройка faker
let { faker, pl } = require('@faker-js/faker');

// Настройка POST-запроса — JSON
app.use(express.json());

// Настройка БД
let mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/quiz-project');

let userSchema = new mongoose.Schema({
    name: String,
    avatar: String,
    commonPoints: Number,
    age: Number,
    rank: String,
    solved: [mongoose.ObjectId]
}, {
    timestamps: true
});

let User = mongoose.model('user', userSchema);

let questionSchema = new mongoose.Schema({
    title: String,
    topic: String,
    answers: [String],
    correctAnswer: Number,
    difficulty: Number,
}, {
    timestamps: true
});

let Question = mongoose.model('question', questionSchema);


let ranks = ['Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond', 'Legend'];
let player_id;

async function generateUsers() {
    await User.deleteMany();
    for (let i = 0; i < 20; i++) {
        let name = faker.person.fullName();
        let avatar = faker.image.avatar(1000, 1000);
        let commonPoints = faker.number.int({ max: 300 })
        let rank;
        if (commonPoints < 10) {
            rank = ranks[0];  // Bronze
        } else if (commonPoints < 30) {
            rank = ranks[1];  // Silver
        } else if (commonPoints < 70) {
            rank = ranks[2];  // Gold
        } else if (commonPoints < 100) {
            rank = ranks[1];  // Platinum
        } else if (commonPoints < 200) {
            rank = ranks[1];  // Diamond
        } else {
            rank = ranks[1];  // Legend
        }

        let age = faker.number.int({ min: 14, max: 65 });
        let solved = [];

        let user = new User({
            name: name,
            avatar: avatar,
            commonPoints: commonPoints,
            rank: rank,
            age: age,
            solved: solved,
        });

        await user.save();
    }
}

// Сгенерим юзеров-ботов
generateUsers();

// Роуты
app.get('/users/all', async function (req, res) {
    let users = await User.find().sort({ commonPoints: -1 });
    res.send(users);
});

app.get('/next-question', async function (req, res) {
    if (player_id) {
        let player = await User.findOne({ _id: player_id });
        let allQuestions = await Question.find();
        console.log(player.solved);
        let questions = [];
        let question;
        if (player.solved.length >= allQuestions.length) {
            let index = faker.number.int({ max: allQuestions.length - 1 });
            question = allQuestions[index];
        } else {

            for (let i = 0; i < allQuestions.length; i++) {
                let q = allQuestions[i];
                if (player.solved.includes(q._id) === false) {
                    questions.push(q);
                }
            }
            let index = faker.number.int({ max: questions.length - 1 });
            question = questions[index];
        }
        res.send(question);
    } else {
        res.sendStatus(200)
    }
});

app.get('/player', async function (req, res) {
    if (player_id) {
        let player = await User.findOne({ _id: player_id });
        res.send(player);
    } else {
        res.send(false);
    }
});

app.post('/add-points', async function (req, res) {
    let points = req.body.points;
    let user = await User.findOne({ _id: player_id });
    user.commonPoints += points;
    await user.save();
    res.sendStatus(200);
});

app.post('/add-solved', async function (req, res) {
    let id = req.body.id;
    let user = await User.findOne({ _id: player_id });
    user.solved.push(id);
    await user.save();
    res.sendStatus(200);
});

app.post('/update-player', async function (req, res) {
    let { name, avatar } = req.body;
    if (player_id) {
        let user = await User.findOne({ _id: player_id });
        user.name = name;
        user.avatar = avatar;
        await user.save();
    } else {
        let user = new User({
            name: name,
            avatar: avatar,
            commonPoints: 0,
            rank: 'Bronze',
            age: 1,
            solved: [],
        });

        await user.save();
        player_id = user._id
    }

    res.sendStatus(200);
});