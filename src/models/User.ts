import { Table, Column, DataType,Model} from 'sequelize-typescript';

@Table({
   timestamps: true ,
   tableName: "users",
   modelName: "User"
})

export class User extends Model {

  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,   
    primaryKey: true
  })

  declare user_id: any;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
   name!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  email!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password!: string;
}