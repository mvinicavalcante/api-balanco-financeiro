import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { encrypt } from 'src/config/jwt';
import { User, UserDocument } from 'src/schemas/user/user.schema';
import { ObjectId } from "mongodb";

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(user: User): Promise<User> {
    const userPasswordEncrypted = encrypt(user.password);
    const createdUser = new this.userModel({
      ...user,
      password: userPasswordEncrypted,
    });
    return createdUser.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(key: string): Promise<User> {
    const query = ObjectId.isValid(key) ? { _id: key } : { email: key };
    return this.userModel.findOne(query);
  }

  async update(id: string, user: Partial<User>): Promise<User> {
    return this.userModel.findByIdAndUpdate(id, user, { new: true });
  }
}
