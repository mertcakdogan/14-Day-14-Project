const express = require('express');
const cors = require('cors');
const { default: axios } = require('axios');

const app = express();
app.use(express.json());
app.use(cors({ origin: true }));

app.post('/authenticate', async (req, res) => {
    const { username } = req.body;

    try {
        const r = await axios.put(
            "https://api.chatengine.io/users/",
            {username:username,secret: username, first_name: username},
            {headers:{ "PRIVATE-KEY": "1f0c85bf-2835-4389-b490-d5100fc304fe"}}
            )
        return res.status(r.status).json(r.data);
    } catch (error) {
        return res.status(e.response.status).json(e.response.data);
        
    }

    
});

app.listen(3000, () => console.log('Server started on port 3000'));

//  1f0c85bf-2835-4389-b490-d5100fc304fe