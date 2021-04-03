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
import Nobleman from './nobleman';
import Responsibility from './responsibilities';

interface ClanAttributes {
  id: number;
  name: string;
  kingdomId: string;
}

interface ClanCreationAttributes extends Optional<ClanAttributes, 'id'> {}

class Clan
  extends Model<ClanAttributes, ClanCreationAttributes>
  implements ClanAttributes {
  public id!: number;

  public name!: string;

  public kingdomId!: string;

  public readonly createdAt!: Date;

  public readonly updatedAt!: Date;

  public getResponsibilities!: HasManyGetAssociationsMixin<Responsibility>;

  public addResponsibility!: HasManyAddAssociationMixin<Responsibility, number>;

  public hasResponsibility!: HasManyHasAssociationMixin<Responsibility, number>;

  public countResponsibilities!: HasManyCountAssociationsMixin;

  public createResponsibility!: HasManyCreateAssociationMixin<Responsibility>;

  public getNoblemans!: HasManyGetAssociationsMixin<Nobleman>;

  public addNobleman!: HasManyAddAssociationMixin<Nobleman, number>;

  public hasNobleman!: HasManyHasAssociationMixin<Nobleman, number>;

  public countNoblemans!: HasManyCountAssociationsMixin;

  public createNobleman!: HasManyCreateAssociationMixin<Nobleman>;

  public readonly responsibilities?: Responsibility[];

  public readonly noblemans?: Nobleman[];

  public static associations: {
    responsibilities: Association<Clan, Responsibility>;
    noblemans: Association<Clan, Nobleman>;
  };
}

Clan.init(
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
    kingdomId: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
  },
  {
    tableName: 'clans',
    underscored: true,
    sequelize,
    indexes: [
      {
        name: 'clan_by_kingdom',
        fields: ['kingdom_id'],
      },
    ],
  }
);

Clan.belongsToMany(Responsibility, {
  through: 'clans_responsibilities',
  as: 'responsibilities',
  foreignKey: 'clan_id',
});

Clan.belongsToMany(Nobleman, {
  through: 'nobleman_clans',
  as: 'noblemans',
  foreignKey: 'clan_id',
});

export default Clan;
