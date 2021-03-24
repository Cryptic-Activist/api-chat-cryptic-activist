import { DataTypes, Model } from 'sequelize';

class Language extends Model {
  static init(sequelize: any) {
    return super.init(
      {
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        sequelize,
      },
    );
  }

  static associate(models: any) {
    this.belongsToMany(models.User, {
      foreignKey: 'language_id',
      through: 'user_languages',
      as: 'users',
    });
  }
}

export default Language;
