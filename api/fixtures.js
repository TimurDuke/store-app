const mongoose = require('mongoose');
const {nanoid} = require('nanoid');

const config = require('./config');
const User = require('./models/User');
const Category = require('./models/Category');
const Product = require('./models/Product');

const run = async () => {
    await mongoose.connect(config.mongo.db);

    const collections = await mongoose.connection.db.listCollections().toArray();

    for (const coll of collections) {
        await mongoose.connection.db.dropCollection(coll.name);
    }

    const [user1, user2, user3] = await User.create({
        username: "admin",
        password: "admin",
        displayName: "Adminchik",
        phone: 996705553178,
        token: nanoid(),
    }, {
        username: "user",
        password: "user",
        displayName: "Userchik",
        phone: 996553553178,
        token: nanoid(),
    }, {
        username: "timur",
        password: "timur",
        displayName: "Timurka",
        phone: 996551532004,
        token: nanoid(),
    });

    const [categ1, categ2, categ3] = await Category.create({
        title: "Clothes",
    }, {
        title: "Shoes",
    }, {
        title: "Bags",
    });

    await Product.create({
        title: "Lada Men's Sweater",
        description: "Knitted sweater in lambswool blend with classic shawl collar and slightly marbled yarn.",
        category: categ1['_id'],
        price: 450,
        image: 'fixtures/sweater.jpg',
        user: user1['_id'],
    }, {
        title: "Cloudburst Jacket - Men's",
        description: "With the perfect balance of waterproof protection " +
            "and breathability, the Showers Pass Cloudburst jacket keeps you focused" +
            " on doing your best and going farther rather than worrying about the weather.",
        category: categ1['_id'],
        price: 1230,
        image: 'fixtures/jacket.jpg',
        user: user1['_id'],
    }, {
        title: "Nike Air Jordan 1 Retro",
        description: "The Jordans that started it all. The Air Jordan 1 is the most important model in sneaker history.",
        category: categ2['_id'],
        price: 300,
        image: 'fixtures/jordan.jpg',
        user: user2['_id'],
    }, {
        title: "Adidas Forum Low (FY7757)",
        description: "More than just a shoe, it's a statement. The adidas Forum hit the scene in '84 and " +
            "gained major love on both the hardwood and in the music biz.",
        category: categ2['_id'],
        price: 520,
        image: 'fixtures/adidas.jpg',
        user: user2['_id'],
    }, {
        title: "Nike Backpacks: Definitive Guide",
        description: "Make sure you get the best deal on Nike Brasilia Kids' Printed Backpack (18L) - Black by comparing prices at FOOTY.COM. " +
            "You can shop all your favourite brands in one place, so you'll never miss out on a bargain ever again. Nice.",
        category: categ3['_id'],
        price: 600,
        image: 'fixtures/bagnike.jpg',
        user: user3['_id'],
    }, {
        title: "PUMA Unisex Plus Portable Ii Crossbody Bag",
        description: "Men's leather youngsters' bags Puma, Men's leather youngsters' bags Black",
        category: categ3['_id'],
        price: 750,
        image: 'fixtures/bagpuma.jpg',
        user: user3['_id'],
    });

    await mongoose.connection.close();
};

run().catch(console.error);