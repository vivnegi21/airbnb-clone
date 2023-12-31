const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
require('dotenv').config()
const Salt = bcrypt.genSaltSync(10);
const app = express();
const Places = require('./models/Places.js')
const jwt = require('jsonwebtoken');
const imageDownloader = require('image-downloader');
const cookieParser = require('cookie-parser')
const multer = require('multer');
const fs = require('fs');
const Booking = require('./models/Booking.js');


//to parse data in req.body to json
app.use(express.json());

//to read cookies
app.use(cookieParser());

//static file
app.use('/uploads', express.static(__dirname + '/uploads'));

//for cors 
app.use(cors({
    credentials: true,
    origin: "https://airbnb-clone-vivnegi21.vercel.app",


}));

mongoose.connect(process.env.MONGO_URL);

function getUserDataFromToken(req) {
    return new Promise((resolve, reject) => {
        jwt.verify(req.cookies.token, process.env.SECRET, {}, async (err, user) => {
            if (err) throw err;
            resolve(user);
        })
    })
}

//////////////////////// APIs //////////////////////////////////
app.get('/', (req, res) => res.send('Server Running'))
app.get('/test', (req, res) => {
    res.json('test ok');
});

app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const user = await User.create({
            name,
            email,
            password: bcrypt.hashSync(password, Salt),
        })
        res.json(user);
    } catch (error) {
        res.status(422).json(error);
    }

})

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const userDoc = await User.findOne({email});
    if(userDoc){
        const passOk = bcrypt.compareSync(password,userDoc.password);
        if(passOk){
            jwt.sign({
                email:userDoc.email,
                id:userDoc._id,
            },process.env.SECRET,{},(err,token)=>{
                if(err) throw err;
                res.cookie('token',token).json(userDoc);
            });
        }else{
            res.status(422).json('pass not ok');
        }
    }
});

app.get('/profile', (req, res) => {
    const { token } = req.cookies;
    if (token) {
        jwt.verify(token, process.env.SECRET, {}, async (err, user) => {
            if (err) {
                console.log(err);
                throw err;
            }
            const { name } = await User.findById(user.id);
            res.json({ ...user, name });
        });
    } else {
        res.json(null);
    }
})


app.post('/logout', (req, res) => {
    res.clearCookie('token');
    res.json({ message: "User logged out" });
})


/////////////////Upload//////////////////////
app.post('/uploadByLink', async (req, res) => {
    const { link } = req.body;
    const newName = 'photo' + Date.now() + '.jpg'
    const options = {
        url: link,
        dest: __dirname + '/uploads/' + newName,               // will be saved to /path/to/dest/image.jpg
    };
    const result = await imageDownloader.image(options);
    // console.log(result);
    res.json(newName).status(200);
})

const photosUpload = multer({ dest: 'uploads/' });


app.post('/upload', photosUpload.array('photos', 100), (req, res) => {
    const images = [];
    req.files.forEach((file) => {

        const { path, originalname, filename } = file;
        const parts = originalname.split('.');
        const extension = parts[parts.length - 1];
        const newfile = path + '.' + extension;
        fs.renameSync(path, newfile);
        images.push(filename + '.' + extension);
    });
    res.send(images).status(200);

});


app.post('/places', async (req, res) => {
    const { title, address, description, perks, extraInfo, checkIn, checkOut, addedPhotos, price_per_night, maxGuests } = req.body;
    const user = await getUserDataFromToken(req);
    const placeDoc = await Places.create({
        owner: user.id,
        title: title,       //title of the place.
        address: address,     //the address of the place.
        photos: [...addedPhotos],    //Array of photo URLs.
        description: description, //description of the places.
        perks: [...perks],       //string of additional perks.
        extraInfo: extraInfo,   //any extra info about the place.
        checkIn: checkIn,     //chechin time.
        checkOut: checkOut,    //checkout time.
        maxGuests: maxGuests,
        price_per_night: price_per_night,
    });
    res.json(placeDoc);

})
app.put('/places', (req, res) => {
    let id = req.body.id;
    const { token } = req.cookies;
    const { title, address, description, perks, extraInfo, checkIn, checkOut, addedPhotos, price_per_night, maxGuests } = req.body;
    if (token) {
        jwt.verify(token, process.env.SECRET, {}, async (err, user) => {
            const place = await Places.findById(id);
            if (place.owner.toString() === user.id) {
                place.set({
                    title: title,       //title of the place.
                    address: address,     //the address of the place.
                    photos: [...addedPhotos],    //Array of photo URLs.
                    description: description, //description of the places.
                    perks: [...perks],       //string of additional perks.
                    extraInfo: extraInfo,   //any extra info about the place.
                    checkIn: checkIn,     //chechin time.
                    checkOut: checkOut,    //checkout time.
                    maxGuests: maxGuests,
                    price_per_night: price_per_night,
                });
                await place.save();
                res.json('ok');
            }
        }
        )
    }

})
app.get('/user-places', async (req, res) => {
    const user = await getUserDataFromToken(req);

    if (!user) return res.status(401).send({ error: "Token invalid" });
    const { id } = user;
    const placesList = await Places.find({ owner: id }).lean();
    return res.json(placesList);

});

app.get('/places/:id', async (req, res) => {
    const { id } = req.params;
    const place = await Places.findById(id);
    return res.json(place);
})



///////////////////inndex page///////////////////
app.get('/places', async (req, res) => {
    res.json(await Places.find());
})

////////////////Booking Page///////////////////////
app.post('/bookings', async (req, res) => {
    const { place, name, phone, price, checkIn, checkOut, maxGuests } = req.body;
    const userData = await getUserDataFromToken(req);
    const data = await Booking.create({
        place,
        name,
        user: userData.id,
        phone,
        price,
        checkIn,
        checkOut,
        maxGuests,
    });
    res.json(data);
})
app.get('/bookings', async (req, res) => {
    const userData = await getUserDataFromToken(req);
    const bookings = await Booking.find({ user: userData.id }).
        populate("place");
    res.json(bookings);
})
app.listen(4000);