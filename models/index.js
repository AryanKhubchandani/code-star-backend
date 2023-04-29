const Sequelize = require("sequelize-cockroachdb");
const sequelize = require("../config/connection");

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./User")(sequelize, Sequelize);
db.audio = require("./Audio")(sequelize, Sequelize);
db.history = require("./History")(sequelize, Sequelize);
db.details = require("./Details")(sequelize, Sequelize);

db.history.hasMany(db.details, {
  as: "details",
});

db.details.belongsTo(db.history, {
  foreignKey: "history_id",
  as: "history",
});

db.user.hasMany(db.audio, {
  as: "audio",
});

db.audio.belongsTo(db.details, {
  foreignKey: "user_id",
  as: "user",
});

module.exports = db;
