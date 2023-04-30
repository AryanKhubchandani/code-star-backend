const Sequelize = require("sequelize-cockroachdb");
const sequelize = require("../config/connection");

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./User")(sequelize, Sequelize);
db.audio = require("./Audio")(sequelize, Sequelize);
db.details = require("./Details")(sequelize, Sequelize);

db.user.hasMany(db.user, {
  as: "details",
});

db.details.belongsTo(db.user, {
  foreignKey: "user_id",
  as: "user",
});

db.user.hasMany(db.audio, {
  as: "audio",
});

db.audio.belongsTo(db.details, {
  foreignKey: "fk_user_id",
  as: "user",
});

module.exports = db;
