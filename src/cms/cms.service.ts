import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../user/schemas/user.schema';

@Injectable()
export class CmsService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async createCmsUser(createUserData: any): Promise<User> {
    const newUser = new this.userModel(createUserData);
    return newUser.save();
  }

  async changeUserActivation(userId: string, isActive: boolean): Promise<User> {
    return this.userModel.findByIdAndUpdate(userId, { isActive }, { new: true }).exec();
  }

  async listUsers(page: number, limit: number): Promise<User[]> {
    return this.userModel.find()
      .limit(limit)
      .skip(limit * (page - 1))
      .exec();
  }
}