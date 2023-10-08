const express = require('express');
const cors = require('cors');


const app = express();

let corsOption = { 
    origin: '*',
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH', 'OPTION'],
    optionsSuccessStatus: 200
};


app.use(cors(corsOption));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);

const db = require('./models');
const Role = db.role;
const User = db.user;

db.sequelize.sync({force: true}).then(() => {
    console.log('Drop and Resync Db');
    initial();
});

app.get('/', (req, res) => {
    res.json('Добро пожаловать в файловый преобразователь)');
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

function initial() {
    Role.create({
      id: 1,
      name: "user"
    }); 
    
   
    Role.create({
      id: 2,
      name: "admin"
    });
  }