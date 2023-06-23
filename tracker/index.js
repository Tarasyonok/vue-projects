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
mongoose.connect('mongodb://127.0.0.1:27017/emotion-tracker');

let categoriesSchema = new mongoose.Schema({
    title: String,
    value: Number
});

let Category = mongoose.model('category', categoriesSchema);

let notesSchema = new mongoose.Schema({
    text: String,
    date: Date,
    stats: Number,
    category: {
        type: mongoose.ObjectId,
        ref: 'category'
    }
});

let Note = mongoose.model('note', notesSchema);


app.get('/categories/all', async function(req, res) {
   let response = await Category.find().sort({value: -1});
   res.send(response);
});

app.get('/notes/all', async function(req, res) {
   let response = await Note.find().sort({date: -1}).populate('category');
   res.send(response);
});

app.post('/notes/create', async function(req, res) {
    let {text, date, category} = req.body;

    if (text && date && category) {

        let note = new Note({
            text: text,
            date: date,
            category: category,
            
        });
        
        await note.save();
    }
    res.send(200);
});


app.get('/stats', async function (req, res) {
    let notes = await Note.find().sort({ date: -1 }).populate('category');
    let categories = await Category.find().sort({ value: -1 }).lean();

    let result = {};
    for (let i = 0; i < notes.length; i++) {
        let note = notes[i];
        let category = note.category._id;

        if (!result[category]) {
            result[category] = 0;
        }
        result[category]++;
    }

    for (let i = 0; i < categories.length; i++) {
        let id = categories[i]._id;
        categories[i].stats = result[id] || 0;
    }

    res.send(categories);
});
