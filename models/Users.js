module.exports = function(sequelize, DataTypes) {

  var Users = sequelize.define('vtiger_users', {

    user_name: { type: DataTypes.STRING },
    user_password: { type: DataTypes.STRING },
    user_hash: { type: DataTypes.STRING },
    cal_color: { type: DataTypes.STRING },
    first_name: { type: DataTypes.STRING },
    last_name: { type: DataTypes.STRING }
    
  });
   
  return Users
}