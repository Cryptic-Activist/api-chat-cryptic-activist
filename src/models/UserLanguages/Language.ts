import { DataTypes, Model } from 'sequelize';

class UserLanguages extends Model {
  static init(sequelize: any) {
    return super.init(
      {
        user_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        language_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
      },
      {
        sequelize,
      },
    );
  }

  static associate(models: any) {
    this.hasOne(models.Language, {
      foreignKey: 'language_id',
      as: 'language',
    });
    this.hasOne(models.User, {
      foreignKey: 'user_id',
      as: 'user',
    });
  }
}

export default UserLanguages;
