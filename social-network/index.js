let express = require(`express`);
let app = express();
let port = 3005;

app.listen(port, function () {
    console.log(`http://localhost:${port}`);
});

// Настройка CORS
let cors = require('cors');
app.use(cors({ origin: 'http://localhost:5173' }));


// Настройка POST-запроса — JSON
app.use(express.json());

// Настройка БД
let mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/social-network');

// Схемы

// Пользователь
let userSchema = new mongoose.Schema({
    username: {
        unique: true,
        type: String
    },
    avatar: String,
    firstName: String,
    lastName: String,
    info: String,
    phone: String,
    
    friends: [
        {
            type: mongoose.ObjectId,
            ref: 'User'
        }
    ]
})

let User = mongoose.model('User', userSchema);


// Пост
let postSchema = new mongoose.Schema({
    author: {
        type: mongoose.ObjectId,
        ref: 'User'
    },
    content: String
}, {
    timestamps: true
})

let Post = mongoose.model('post', postSchema);

// Роуты
// "Главный" пользователь
let CURRENT_USER = '6480a6b45299bc01bb788b14';
app.get('/profile', async function (req, res) {
    let me = await User.findOne({_id: CURRENT_USER});
    res.redirect(`/user?username=${me.username}`);
});


app.get('/user', async function (req, res) {
    let username = req.query.username;
    let user = await User.findOne({username: username});
    res.send(user);
});

app.get('/user/posts', async function (req, res) {
    let id = req.query.id;
    let posts = await Post.find({'author': id}).sort({createdAt: -1});
    
    res.send(posts);
});

app.get('/users', async function (req, res) {
    let users = await User.find({_id: {$ne: CURRENT_USER}});
    res.send(users);
});

app.get('/feed', async function (req, res) {
    let posts = await Post.find({author: {$ne: CURRENT_USER}})
                            .sort({createdAt: -1})
                            .limit(5)
                            .populate('author')
    res.send(posts);
});

app.post('/post/create', async function (req, res) {
    let content = req.body.content;
    
    let post = new Post({
        author: CURRENT_USER,
        content
    })
    await post.save();

    res.send(post);
});
