const sqlite3 = require('sqlite3').verbose();
const faker = require('faker')
const db = new sqlite3.Database('abcd');
// console.log(faker.name.firstName());
db.on('error', err => console.log(err))
class View {
    static error(err) {
        console.log(err)
    }
}
class Model {
    constructor(data) {
        this.init()
    }
    error(err) {
        View.inform(err)
        return this;
    }

    init() {
        db.serialize(function () {
            db.run(`PRAGMA foregin_key = on`);
            db.run(`DROP TABLE candidates; DROP TABLE votes,DROP TABLE voters;`);

            db.run(`CREATE TABLE IF NOT EXISTS candidates (id INTEGER PRIMARY KEY, name TEXT NOT NULL,  party TEXT NOT NULL)`);
            db.run(`CREATE TABLE IF NOT EXISTS voters (id INTEGER PRIMARY KEY, first_name TEXT NOT NULL, last_name TEXT NOT NULL, gender TEXT, age INTEGER)`);
            db.run(`CREATE TABLE IF NOT EXISTS votes (id INTEGER  PRIMARY KEY, voter_id INTEGER references voters(id) ON DELETE CASCADE, 
                candidate_id INTEGER REFERENCES candidates(id) ON DELETE CASCADE)`);

            // let stmt = db.prepare(`insert into voters (first_name,last_name, gender,age) values (?,?,?,?) `)
            // stmt.run(faker.name.firstName(),faker.name.lastName(),(~~(Math.random())>.50?'male':'female'),~~((Math.random()*56)+18))
            // stmt.finalize();
            // db.each("SELECT * from voters", function (err, row) {
            //     console.log(row);
            // });
        });

        db.close();
    }
}

let model = new Model();