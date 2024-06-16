import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { encrypt } from '../../config/jwt';
import { User, UserDocument } from '../../schemas/user/user.schema';
import { ObjectId } from 'mongodb';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(user: User): Promise<User> {
    const userAlreadyExists = await this.userModel.findOne({
      email: user.email,
    });

    if (userAlreadyExists) {
      throw new ConflictException('User already exists');
    }

    const createdUser = new this.userModel({
      ...user,
      password: encrypt(user.password),
    });

    return createdUser.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(key: string | Types.ObjectId): Promise<User> {
    const query = ObjectId.isValid(key) ? { _id: key } : { email: key };
    return this.userModel.findOne(query);
  }

  async update(id: string, user: Partial<User>): Promise<User> {
    return this.userModel.findByIdAndUpdate(id, user, { new: true });
  }
}
