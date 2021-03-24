import { DataTypes, Model } from 'sequelize';

class User extends Model {
  static init(sequelize: any) {
    return super.init(
      {
        first_name: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: false,
        },
        last_name: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: false,
        },
        username: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: false,
        },
        private_keys: {
          type: DataTypes.ARRAY(DataTypes.STRING),
          allowNull: false,
        },
        is_verified: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
        },
        is_deleted: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
        },
        when_deleted: {
          type: DataTypes.DATE,
          allowNull: true,
        },
      },
      {
        sequelize,
      },
    );
  }

  static associate(models: any) {
    this.belongsToMany(models.Language, {
      foreignKey: 'user_id',
      through: 'user_languages',
      as: 'languages',
    });
  }
}

export default User;
