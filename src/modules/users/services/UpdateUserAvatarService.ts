import path from 'path';
import fs from 'fs';
import { getRepository } from 'typeorm';

import uploadConfig from '@config/upload';

import AppError from '@shared/errors/AppError';

import User from '@modules/users/infra/typeorm/entities/User';

interface Request {
  user_id: string;
  avatarFilename: string;
}

class UpdateUserAvatarService {
  public async execute({
    user_id,
    avatarFilename,
  }: Request): Promise<Optional<User, 'password'>> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne(user_id);

    if (!user) {
      throw new AppError('User not found.');
    }

    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = avatarFilename;

    await usersRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
