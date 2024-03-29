import { Table, Column, DataType,Model} from 'sequelize-typescript';

@Table({
   timestamps: true ,
   tableName: "bookings",
   modelName: "Booking"
})

export class Booking extends Model {

  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,   
    primaryKey: true
  })

  declare id: any;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
   title!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  description!: string;
}