const knex = require('knex');

//Make Knex work with SQlite
const knexConfig = {
  client: 'sqlite3', //this will be different depending on the DBMS
  useNullAsDefault: true, // always needed when workin with SQlite
  connection: {
    filename: './data/lambda.db3'
  }
};

const db = knex(knexConfig);

module.exports = {
  find,
  findById,
  add,
  update,
  remove
};


function find() {
  return db('zoos');  // will return a promise
}

function findById(id) {
  return db('zoos')
    .where({ id })
    .first(); 
}

function add(zoo) {
  return db('zoos')
        .insert(zoo)
        .then(ids => {
            const [id] = ids;
            return db('zoos')
                   .where({ id })
                   .first();
    });
}

function update(id, changes) {
  return db('zoos')
        .where({ id })
        .update(changes)
        .then(() => {
        return db('zoos')
               .where({ id })
               .first();
    });
}

function remove(id) {
  return db('zoos')
        .where({ id })
        .del();
}