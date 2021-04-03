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
} from "sequelize";

import sequelize from '../dbContext/postgres';
import Responsibility from "./responsibilities";

interface PracticeAttributes {
  id: number;
  name: string;
  resource: string;
  action: string;
  level: string;
}

interface PracticeCreationAttributes extends Optional<PracticeAttributes, "id"> {}

class Practice extends Model<PracticeAttributes, PracticeCreationAttributes>
  implements PracticeAttributes {
  public id!: number;
  public name!: string;
  public resource!: string;
  public action!: string;
  public level!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public getResponsibilities!: HasManyGetAssociationsMixin<Responsibility>;
  public addResponsibility!: HasManyAddAssociationMixin<Responsibility, number>;
  public hasResponsibility!: HasManyHasAssociationMixin<Responsibility, number>;
  public countResponsibilities!: HasManyCountAssociationsMixin;
  public createResponsibility!: HasManyCreateAssociationMixin<Responsibility>;

  public readonly responsibilities?: Responsibility[];

  public static associations: {
    responsibilities: Association<Practice, Responsibility>;
  };
}

Practice.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    resource: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    action: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    level: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
  },
  {
    tableName: "practices",
    underscored: true,
    sequelize
  }
);

Practice.belongsToMany(Responsibility, {
  through: 'responsibility_practices',
  as: 'responsibilities',
  foreignKey: 'practice_id'
})

export default Practice;