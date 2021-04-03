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
import Responsibility from './responsibilities';

interface NoblemanAttributes {
  id: number;
  username: string;
  password: string;
  fullName: string;
  emailAddress: string | null;
  phoneNumber: number | null;
  dateOfBirth: Date | null;
  gender: string | null;
  organizationName: string | null;
  department: string | null;
  jobTitle: string | null;
  employeeId: string | null;
  reportsTo: string | null;
  address: string | null;
  city: string | null;
  state: string | null;
  country: string | null;
  postalCode: number | null;
  kingdomId: number;
}

interface NoblemanCreationAttributes
  extends Optional<NoblemanAttributes, 'id'> {}

class Nobleman
  extends Model<NoblemanAttributes, NoblemanCreationAttributes>
  implements NoblemanAttributes {
  public id!: number;

  public username!: string;

  public password!: string;

  public fullName!: string;

  public emailAddress!: string | null;

  public phoneNumber!: number | null;

  public dateOfBirth!: Date | null;

  public gender!: string | null;

  public organizationName!: string | null;

  public department!: string | null;

  public jobTitle!: string | null;

  public employeeId!: string | null;

  public reportsTo!: string | null;

  public address!: string | null;

  public city!: string | null;

  public state!: string | null;

  public country!: string | null;

  public postalCode!: number | null;

  public kingdomId!: number;

  public readonly createdAt!: Date;

  public readonly updatedAt!: Date;

  public getClans!: HasManyGetAssociationsMixin<Clan>;

  public addClan!: HasManyAddAssociationMixin<Clan, number>;

  public hasClan!: HasManyHasAssociationMixin<Clan, number>;

  public countClans!: HasManyCountAssociationsMixin;

  public createClan!: HasManyCreateAssociationMixin<Clan>;

  public getResponsibilities!: HasManyGetAssociationsMixin<Responsibility>;

  public addResponsibility!: HasManyAddAssociationMixin<Responsibility, number>;

  public hasResponsibility!: HasManyHasAssociationMixin<Responsibility, number>;

  public countResponsibilities!: HasManyCountAssociationsMixin;

  public createResponsibility!: HasManyCreateAssociationMixin<Responsibility>;

  public readonly clans?: Clan[];

  public readonly responsibilities?: Responsibility[];

  public static associations: {
    clans: Association<Nobleman, Clan>;
    responsibilities: Association<Clan, Responsibility>;
  };
}

Nobleman.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: new DataTypes.STRING(128),
      allowNull: false,
      unique: true,
      validate: {
        len: [5, 12],
      },
    },
    password: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    fullName: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    emailAddress: {
      type: new DataTypes.STRING(128),
      allowNull: true,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    dateOfBirth: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    gender: {
      type: new DataTypes.STRING(128),
      allowNull: true,
    },
    address: {
      type: new DataTypes.STRING(128),
      allowNull: true,
    },
    city: {
      type: new DataTypes.STRING(128),
      allowNull: true,
    },
    state: {
      type: new DataTypes.STRING(128),
      allowNull: true,
    },
    country: {
      type: new DataTypes.STRING(128),
      allowNull: true,
    },
    postalCode: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    organizationName: {
      type: new DataTypes.STRING(128),
      allowNull: true,
    },
    department: {
      type: new DataTypes.STRING(128),
      allowNull: true,
    },
    jobTitle: {
      type: new DataTypes.STRING(128),
      allowNull: true,
    },
    employeeId: {
      type: new DataTypes.STRING(128),
      allowNull: true,
    },
    reportsTo: {
      type: new DataTypes.STRING(128),
      allowNull: true,
    },
    kingdomId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: 'noblemans',
    underscored: true,
    sequelize,
    indexes: [
      {
        unique: true,
        fields: ['username'],
      },
      {
        name: 'user_by_kingdom',
        fields: ['kingdom_id'],
      },
    ],
  }
);

Nobleman.belongsToMany(Clan, {
  through: 'nobleman_clans',
  as: 'clans',
  foreignKey: 'nobleman_id',
});

Nobleman.belongsToMany(Responsibility, {
  through: 'nobleman_responsibility',
  as: 'responsibilities',
  foreignKey: 'nobleman_id',
});

export default Nobleman;
