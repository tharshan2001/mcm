import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db.js";
import bcrypt from "bcryptjs";

class Admin extends Model {
  async comparePassword(password) {
    return await bcrypt.compare(password, this.password);
  }
}

Admin.init({
  admin_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  full_name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  phone_number: { type: DataTypes.STRING },
  password: { type: DataTypes.STRING, allowNull: false },
  permissions: { type: DataTypes.TEXT }
}, {
  sequelize,
  modelName: "Admin",
  tableName: "Admin",
  timestamps: true,
  hooks: {
    beforeCreate: async (admin) => {
      const salt = await bcrypt.genSalt(10);
      admin.password = await bcrypt.hash(admin.password, salt);
    },
    beforeUpdate: async (admin) => {
      if (admin.changed("password")) {
        const salt = await bcrypt.genSalt(10);
        admin.password = await bcrypt.hash(admin.password, salt);
      }
    }
  }
});

export default Admin;