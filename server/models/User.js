import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db.js";
import bcrypt from "bcryptjs";

class User extends Model {
  /** Instance method: compare password */
  async comparePassword(password) {
    return await bcrypt.compare(password, this.password);
  }
}

User.init({
  user_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  full_name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  phone_number: { type: DataTypes.STRING },
  password: { type: DataTypes.STRING, allowNull: false },
  role_id: { type: DataTypes.INTEGER },
  address: { type: DataTypes.TEXT },
}, {
  sequelize,
  modelName: "User",
  tableName: "User",
  timestamps: true,
  hooks: {
    beforeCreate: async (user) => {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
    },
    beforeUpdate: async (user) => {
      if (user.changed("password")) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      }
    }
  }
});

export default User;