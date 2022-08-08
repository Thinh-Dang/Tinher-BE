import { AutoMap } from "@automapper/classes";
import { IsNotEmpty } from "class-validator";
import { Column, Entity, Unique, UpdateDateColumn } from "typeorm";
import { DefaultEntity } from "../../../common/entity";
import { IPhoneOtpEntity } from "../interfaces/phone-otp.interface";
@Entity({ name: "phoneOtp", synchronize: true }) // bat buoc co, false: migration bo qua,
@Unique(["phone"])
export class PhoneOtpEntity extends DefaultEntity implements IPhoneOtpEntity {
  @Column({ type: "varchar", nullable: false })
  @AutoMap()
  phone: string;

  @Column({ type: "int", default: 0 })
  @AutoMap()
  @IsNotEmpty()
  times: number;

  @UpdateDateColumn({ name: "updatedAt", type: "timestamp" })
  updatedAt: Date;
}
