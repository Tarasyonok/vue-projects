let express = require(`express`);
let app = express();
let port = 3005;

let dayjs = require('dayjs');


app.listen(port, function () {
    console.log(`http://localhost:${port}`);
})

// Настройка CORS
let cors = require('cors');
app.use(cors({ origin: 'http://localhost:5173' }));


// Настройка POST-запроса — JSON
app.use(express.json());

// Настройка БД
let mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/farm-app');

// Схемы

// Товары в магазине
let shopSchema = new mongoose.Schema({
    title: String,
    image: String,


    timeToGrow: Number,
    buyPrice: Number,
    harvestPrice: Number
});

let Shop = mongoose.model('shop', shopSchema);

// Сад
let gardenSchema = new mongoose.Schema({
    title: String,
    image: String,

    timeToHarvest: Date,
    isHarvested: Boolean
}, {
    timestamps: true
});

let Garden = mongoose.model('garden', gardenSchema);


// Пользователь
let userSchema = new mongoose.Schema({
    username: String,
    gold: Number
});

let User = mongoose.model('user', userSchema);


// Роуты
app.get('/user', async function (req, res) {
    let user = await User.findOne();
    res.send(user);
});

app.get('/shop', async function (req, res) {
    let items = await Shop.find({});
    res.send(items);
});

app.post('/shop/buy', async function (req, res) {
    let count = req.body.count;
    let title = req.body.title;

    let shopPlant =  await Shop.findOne({title: title});
    let user =  await User.findOne();

    let totalPrice = shopPlant.buyPrice * count;

    if (user.gold < totalPrice) {
        res.send('Денег не хватает');
        return;
    } 

    for (let i = 0; i < count; i++) {
        let day = dayjs();
        day = day.add(shopPlant.timeToGrow, 'minutes');
        
        let gardenPlant = new Garden({
            title: shopPlant.title,
            image: shopPlant.image,
            
            timeToHarvest: day.toISOString(),
            isHarvested: false
        });

        await gardenPlant.save();
    }

    user.gold -= totalPrice;
    await user.save();

    res.send('ok');
});

app.get('/garden', async function (req, res) {
    let items = await Garden.find({
        isHarvested: false
    }).sort({
        timeToHarvest: 1
    });

    res.send(items);
});

app.post('/garden/harvest', async function (req, res) {
    let id = req.body.id;

    let plant = await Garden.findOne({_id: id});
    let shopPlant =  await Shop.findOne({title: plant.title});
    let user = await User.findOne();

    if (plant.timeToHarvest > dayjs()) {
        res.send('Урожай пока нельзя собрать');
        return;
    }

    plant.isHarvested = true;
    await plant.save();

    user.gold += shopPlant.harvestPrice;
    await user.save();

    res.send('ok');
});

/* Знакомая функция рандома */

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

/* Функция изменения цены */
async function changePrices() {
    let items = await Shop.find();

    /* Случайная цена картошки */
    items[0].buyPrice = getRandomInt(35, 45);
    await items[0].save();
    items[1].buyPrice = getRandomInt(15, 25);
    await items[1].save();
    items[2].buyPrice = getRandomInt(3, 7);
    await items[2].save();

}

setInterval(() => {
    changePrices();
}, 5000);