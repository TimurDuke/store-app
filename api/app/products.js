const express = require('express');
const multer = require('multer');
const path = require('path');
const {nanoid} = require("nanoid");
const Product = require('../models/Product');
const config = require('../config');
const auth = require('../middleware/auth');

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname));
    },
});

const upload = multer({storage});

router.get('/', async (req, res) => {
    const categoryId = req.query.category;

    try {
        if (categoryId) {
            const products = await Product.find({category: categoryId});
            return res.send(products);
        }

        const products = await Product.find();
        res.send(products);
    } catch {
        res.sendStatus(500);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findOne({_id: req.params.id}).populate("user");

        res.send(product);
    } catch (e) {
        res.sendStatus(500);
    }
});

router.post('/', [auth, upload.single('image')], async (req, res) => {
    const { title, description, price, category} = req.body;

    try {
        if (!title || !description || !price || !category || !req.file) {
            return res.status(400).send({message: "Data not valid."});
        }

        const productData = {
            user: req.user._id,
            title, description, price, category,
            image: 'uploads/' + req.file.filename,
        };

        const product = new Product(productData);

        await product.save();
        res.send(product);
    } catch (e) {
        res.status(400).send(e);
    }
});

router.delete('/:id', auth, async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).send({message: 'Product not found!'});
        }

        if (product['user'].toString() !== req.user._id.toString()) {
            return res.status(403).send({message: "You don't have permission to deactivate this product."});
        }

        await Product.findByIdAndDelete(product['_id']);

        res.send({message: "Product deactivated."});
    } catch (e) {
        res.sendStatus(500);
    }
});

module.exports = router;