const { Router } = require('express');

const path = require('path');
const { unlink } = require('fs-extra');
const router = Router();
const cloudinary = require('cloudinary');
const fs = require('fs-extra');
// Models
const Image = require('../models/Image');

cloudinary.config({
    cloud_name:'dl0yedveg',
    api_key:'462216319814558',
    api_secret:'60dDQCfsJXvcic3kWnTyx9lsqDo'
})

router.get('/', async (req, res) => {
    const images = await Image.find();
    res.render('index', { images });
});

router.get('/upload', (req, res) => {
    res.render('upload');
});

router.post('/upload', async (req, res) => {
    const result = await cloudinary.v2.uploader.upload(req.file.path);
    const image = new Image();
    image.title = req.body.title;
    image.description = req.body.description;
    image.filename = req.file.filename;
    image.path = '/img/uploads/' + req.file.filename;
    image.originalname = req.file.originalname;
    image.mimetype = req.file.mimetype;
    image.size = req.file.size;
    image.imageURL= result.url;
    image.public_id = result.public_id;
    
    console.log(result);
    console.log(image);
    await image.save();
    await fs.unlink(req.file.path);
    res.redirect('/');
});

router.get('/image/:id', async (req, res) => {
    const { id } = req.params;
    const image = await Image.findById(id);
    res.render('profile', { image });
});

router.get('/image/:id/delete', async (req, res) => {
    const { id } = req.params;
    const imageDeleted = await Image.findByIdAndDelete(id);
    const result = await cloudinary.v2.uploader.destroy(imageDeleted.public_id);
    console.log(result);
   // await unlink(path.resolve('./src/public' + imageDeleted.path));
    res.redirect('/');
});

module.exports = router;

