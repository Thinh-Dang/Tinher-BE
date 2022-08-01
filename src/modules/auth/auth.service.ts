import { Injectable } from "@nestjs/common";
import { ExistedException } from "src/exceptions/existed.exception";
import { Repository } from "typeorm";
import { SignUpDto } from "./dto";
import { v4 as uuidv4 } from "uuid";
import { AuthEntity } from "./entities/auth.entity";
import { InjectMapper } from "@automapper/nestjs";
import { Mapper } from "@automapper/core";
import { InjectRepository } from "@nestjs/typeorm";
import { hashPassword } from "src/common/helper/hash.helper";

@Injectable()
export class AuthService {
  constructor(
    @InjectMapper() private mapper: Mapper,
    @InjectRepository(AuthEntity)
    private repository: Repository<AuthEntity>
  ) {}

  async signupUser(dto: SignUpDto): Promise<AuthEntity> {
    try {
      const userExisted = await this.repository.findOne({
        where: {
          email: dto.email,
          phone: dto.phone,
        },
      });
      if (userExisted) {
        throw new ExistedException(dto.email);
      }

      const uuid = uuidv4();
      const hash = hashPassword(dto.password);

      const entity = this.mapper.map(dto, SignUpDto, AuthEntity);
      await this.mapper.mapAsync(
        await this.repository.save(entity),
        AuthEntity,
        SignUpDto
      );

      await this.repository.save({
        id: uuid,
        ...dto,
        password: hash,
      });
      return uuid;
    } catch (error) {
      throw new Error(`Register error: ${error.message}.`);
    }
  }
}
