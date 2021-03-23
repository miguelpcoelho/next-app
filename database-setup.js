const sqlite = require('sqlite');
const sqlite3 = require('sqlite3');

(async () => {
    // open the database
    const db = await sqlite.open({
      filename: './mydb.sqlite',
      driver: sqlite3.Database
    });

    await db.migrate({force: true});

    const people = await db.all('SELECT * FROM person');
    console.log('ALL PEOPLE', JSON.stringify(people, null, 2));

    const vehicles = await db.all('SELECT * FROM vehicle');
    console.log('ALL VEHICLES', JSON.stringify(vehicles, null, 2));
})()