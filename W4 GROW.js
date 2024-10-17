import React,  { useState, useEffect } from  ' react ' ;
import axios from  ' axios'


const  App = () => {
        const [farmers, setFarmers] = useState([]);
        const [name, SetName] = useState('');
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////        const [location, SetLocation] = useState('');
        const [crop, setCorp] = useState('') ;
        const [contact, setContact] = useState('');

        useEffect(() => {
            axios.get( 'http://localhost:5000/register' ,{ name, location, crop, contact})

                .then(response => setFarmers(response.data))
                .catch(error => console.error(' error fetching data:', error));

        }, []);

        const registerFarmer = () => {
            axios.post(' http://localhost:5000/register', { name, location, crop, contact })
                 .then(() => {
                     setFarmers([...farmers, { name, location, crop, contact }]);
                     SetName('') ;
                     SetLocation('') ;
                     setCorp('') ;
                     setContact('') ;
                     })
                 .catch(error => console.error(' error fetching data:', error));



                 return (
                  <div>
                    <h1>"AgriBoost" </h1>

                       <div>
                       <input type="text" placeholder="Name" value={name} onChange={e => SetName(e.target.value) /
                        <input type="text" placeholder="Location" value={location} onChange={e => SetLocation(e.target.value) /
                        <input type="text" placeholder="crop" value={crop} onChange = {e => setCorp(e.target.value) /
                        <input type="text" placeholder="Contact" value={contact} onChange={e => setContact(e.target.value) /
                        <button onClick={registerFarmer}>Register Farmer</button>
                        )
                       </div>


                    '}'
                    <h2> Farmers List</h2>
                    <ul>
                        {farmers.map((farmer, index) => (
                            <li key={index}>
                                {farmer.name} - {farmer.location} - {farmer.crop} - {farmer.contact}
                                </li>

                        ))}
                        </ul>
                        </div>


                            );

                        };

                        const [weather, setWeather] = useState('');

useEffect(() => {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=Freetown&appid=YOUR_API_KEY`)
        .then(response => {
            const temp = response.data.main.temp - 273.15; // Convert Kelvin to Celsius
            setWeather(`Current temperature in Freetown: ${temp.toFixed(2)}°C`);
        })
        .catch(error => console.error('Error fetching weather:', error));
}, []);

return (
    <div>
        <h1>AgriBoost</h1>
        <div>{weather}</div>
        <div>{crop}</div>
    </div>
);

const [marketPrices, setMarketPrices] = useState([
    { crop: 'Rice', price: '300 SLL/kg' },
    { crop: 'Cassava', price: '150 SLL/kg' }
]);

const [tips, setTips] = useState([
    'Ensure proper irrigation during the dry season.',
    'Use compost to improve soil fertility.'

]);


return (
    <div>
        <h1>AgriBoost</h1>
        <div>{weather}</div>
        <div>{crop}</div>
        <h2>Market Prices</h2>
        <ul>
            {marketPrices.map((item, index) => (
                <li key={index}>{item.crop}: {item.price}</li>
            ))}
        </ul>
        <h2>Farming Tips</h2>
        <ul></ul>
            {tips.map((tip, index) => (
                <li key={index}>{tip}</li>
            ))}
        </ul>
        {tips.location((tip, index) => (
            <li key={index}>{tip}</li>
        ))}
    </div>
        )


    const [forumPosts, setForumPosts] = useState([]);
const [author, setAuthor] = useState('');
const [message, setMessage] = useState('');

useEffect(() => {
    axios.get('http://localhost:5000/forum')
        .then(response => setForumPosts(response.data))
        .catch(error => console.error('Error fetching posts:', error));
}, []);

const addPost = () => {
    axios.post('http://localhost:5000/forum', { author, message })
        .then(() => {
            setForumPosts([...forumPosts, { author, message }]);
            setAuthor('');
            setMessage('');
        })
        .catch(error => console.error('Error adding post:', error));
};

return (
    <div>
        <h1>AgriBoost</h1>
        <div>{weather}</div>
        <div>{crop}</div>
        <h2>Market Prices</h2>
        <ul>{marketPrices.map((item, index) => <li key={index}>{item.crop}: {item.price}</li>)}</ul>
        <h2>Farming Tips</h2>
        <ul>{tips.map((tip, index) => <li key={index}>{tip}</li>)}</ul>
        <h2>Community Forum</h2>
        <input type="text" placeholder="Author" value={author} onChange={e => setAuthor(e.target.value)} />
        <textarea placeholder="Message" value={message} onChange={e => setMessage(e.target.value)} />
        <button onClick={addPost}>Add Post</button>
        <ul>
            {forumPosts.map((post, index) => (
                <li key={index}>
                    <strong>{post.author}</strong>: {post.message}
                </li>
            ))}
        </ul>
        <h2>Farmers List</h2>
        <ul>{farmers.map((farmer, index) => <li key={index}>{farmer.name} - {farmer.location} - {farmer.crop} - {farmer.contact}</li>)}</ul>
    </div>
);


        });
     const forumSchema = new mongoose.Schema({
        author: String,
        message: String,
        timestamp: { type: Date, default: Date.now }
    });

    const Forum = mongoose.model('Forum', forumSchema);

    app.post('/forum', async (req, res) => {
        const post = new Forum(req.body);
        await post.save();
        res.status(201).send('Post added');
    });

    app.get('/forum', async (req, res) => {
        const posts = await Forum.find();
        res.send(posts);
    });

    const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/agriboost', { useNewUrlParser: true, useUnifiedTopology: true });

const farmerSchema = new mongoose.Schema({
    name: String,
    location: String,
    crop: String,
    contact: String
});

const Farmer = mongoose.model('Farmer', farmerSchema);

app.post('/register', async (req, res) => {
    const farmer = new Farmer(req.body);
    await farmer.save();
    res.status(201).send('Farmer registered');
});

app.get('/farmers', async (req, res) => {
    const farmers = await Farmer.find();
    res.send(farmers);
});

app.listen(5000, () => {
    console.log('Server running on port 5000');
});

        })


