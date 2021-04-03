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

interface KingdomAttributes {
  id: number;
  name: string;
  jwtPublicKey: string;
  jwtPrivateKey: string;
  jwtAlgorithm: string;
  jwtExpiresIn: number;
  jwtIssuer: string;
}

interface KingdomCreationAttributes extends Optional<KingdomAttributes, 'id'> {}

class Kingdom
  extends Model<KingdomAttributes, KingdomCreationAttributes>
  implements KingdomAttributes {
  public id!: number;

  public name!: string;

  public jwtPublicKey!: string;

  public jwtPrivateKey!: string;

  public jwtAlgorithm: string = 'RS256';

  public jwtExpiresIn: number = 1800000;

  public jwtIssuer: string = this.name;

  public readonly createdAt!: Date;

  public readonly updatedAt!: Date;

  public getClans!: HasManyGetAssociationsMixin<Clan>;

  public addClan!: HasManyAddAssociationMixin<Clan, number>;

  public hasClan!: HasManyHasAssociationMixin<Clan, number>;

  public countClans!: HasManyCountAssociationsMixin;

  public createClan!: HasManyCreateAssociationMixin<Clan>;

  public getNobleman!: HasManyGetAssociationsMixin<Nobleman>;

  public addNobleman!: HasManyAddAssociationMixin<Nobleman, number>;

  public hasNobleman!: HasManyHasAssociationMixin<Nobleman, number>;

  public countNoblemans!: HasManyCountAssociationsMixin;

  public createNobleman!: HasManyCreateAssociationMixin<Nobleman>;

  public readonly clans?: Clan[];

  public readonly noblemans?: Nobleman[];

  public static associations: {
    clans: Association<Kingdom, Clan>;
    noblemans: Association<Kingdom, Nobleman>;
  };
}

Kingdom.init(
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
    jwtPublicKey: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    jwtPrivateKey: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    jwtAlgorithm: {
      type: new DataTypes.STRING(128),
      allowNull: false,
      defaultValue: 'RS256',
    },
    jwtExpiresIn: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: 1800000,
    },
    jwtIssuer: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
  },
  {
    tableName: 'kingdoms',
    underscored: true,
    sequelize,
  }
);

Kingdom.hasMany(Clan, {
  as: 'clans',
  foreignKey: 'kingdom_id',
  sourceKey: 'id',
});

Kingdom.hasMany(Nobleman, {
  as: 'noblemans',
  foreignKey: 'kingdom_id',
  sourceKey: 'id',
});

export default Clan;
