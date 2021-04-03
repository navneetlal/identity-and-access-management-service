import {
  Model,
  DataTypes,
  HasManyGetAssociationsMixin,
  HasManyAddAssociationMixin,
  HasManyHasAssociationMixin,
  Association,
  HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin,
  Optional,
} from 'sequelize';

import sequelize from '../dbContext/postgres';
import Clan from './clans';
import Nobleman from './nobleman';
import Practice from './practices';

interface ResponsibilityAttributes {
  id: number;
  name: string;
}

interface ResponsibilityCreationAttributes
  extends Optional<ResponsibilityAttributes, 'id'> {}

class Responsibility
  extends Model<ResponsibilityAttributes, ResponsibilityCreationAttributes>
  implements ResponsibilityAttributes {
  public id!: number;

  public name!: string;

  public readonly createdAt!: Date;

  public readonly updatedAt!: Date;

  public getPractices!: HasManyGetAssociationsMixin<Practice>;

  public addPractice!: HasManyAddAssociationMixin<Practice, number>;

  public hasPractice!: HasManyHasAssociationMixin<Practice, number>;

  public countPractices!: HasManyCountAssociationsMixin;

  public createPractice!: HasManyCreateAssociationMixin<Practice>;

  public getNoblemans!: HasManyGetAssociationsMixin<Nobleman>;

  public addNobleman!: HasManyAddAssociationMixin<Nobleman, number>;

  public hasNobleman!: HasManyHasAssociationMixin<Nobleman, number>;

  public countNoblemans!: HasManyCountAssociationsMixin;

  public createNobleman!: HasManyCreateAssociationMixin<Nobleman>;

  public getClans!: HasManyGetAssociationsMixin<Clan>;

  public addClan!: HasManyAddAssociationMixin<Clan, number>;

  public hasClan!: HasManyHasAssociationMixin<Clan, number>;

  public countClans!: HasManyCountAssociationsMixin;

  public createClan!: HasManyCreateAssociationMixin<Clan>;

  public readonly practices?: Practice[];

  public readonly clans?: Clan[];

  public readonly noblemans?: Nobleman[];

  public static associations: {
    practices: Association<Responsibility, Practice>;
    clans: Association<Responsibility, Clan>;
    noblemans: Association<Responsibility, Nobleman>;
  };
}

Responsibility.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
  },
  {
    tableName: 'responsibilities',
    underscored: true,
    sequelize,
  }
);

Responsibility.belongsToMany(Practice, {
  through: 'responsibility_practices',
  as: 'practices',
  foreignKey: 'responsibility_id',
});

Responsibility.belongsToMany(Clan, {
  through: 'clans_responsibilities',
  as: 'clans',
  foreignKey: 'responsibility_id',
});

Responsibility.belongsToMany(Nobleman, {
  through: 'nobleman_responsibilities',
  as: 'noblemans',
  foreignKey: 'responsibility_id',
});

export default Responsibility;
