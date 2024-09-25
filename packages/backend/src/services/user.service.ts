import bcrypt from 'bcryptjs';
import { PrismaClient, User } from '@prisma/client';
import HttpError from '@/helpers/HttpError';
import gravatar from 'gravatar';
import { generateToken } from '@/middleware/auth.middleware';
import sendEmail from '@/helpers/sendEmail';
import { v4 as uuidv4 } from 'uuid';
import { SafeUser } from '@/types/user.types';

const prisma = new PrismaClient();

export default class UserService { 

  async register(name: string, email: string, password: string): Promise<User> {
      const existingUser = await prisma.user.findUnique({ where: { email } });
      if (existingUser) {
        throw new HttpError(409, 'User already exists');
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const avatarURL = gravatar.url(email);
      
      const verificationToken = uuidv4();

      const newUser = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          avatarURL,
          verificationToken,
        },
      });
      
      const emailSent = await sendEmail({
        to: email,
        subject: 'Verify your email',
        html: `<a href="${process.env.BASE_URL}/api/user/verify/${verificationToken}">Click here to verify your email</a>`,
      });

      if (!emailSent) {
        throw new HttpError(500, 'Failed to send verification email');
      }

      return newUser;
  }
 
  async login(email: string, password: string): Promise<{ token: string; user: SafeUser }> {
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) {
        throw new HttpError(401, 'Invalid credentials');
      }

      if (!user.verified) {
        throw new HttpError(401, 'Please verify your email before logging in.');
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new HttpError(401, 'Invalid credentials');
      }

      const token = generateToken(user.id);

      await prisma.user.update({
        where: { id: user.id },
        data: { token },
      });
      
      const safeUser: SafeUser = { ...user, password: undefined, token: undefined };  
      
      delete safeUser.password;
      delete safeUser.token;   

      return { token, user: safeUser };
  }
  
  async logout(userId: number): Promise<User | null> {
      return prisma.user.update({
        where: { id: userId },
        data: { token: null },
      });
  }

   async verifyEmail(verificationToken: string): Promise<void> {
      const user = await prisma.user.findFirst({
        where: { verificationToken },
      });

      if (!user) {
        throw new HttpError(404, 'Invalid or expired verification token');
      }

      await prisma.user.update({
        where: { id: user.id },
        data: { verified: true, verificationToken: null },
      });
  }

  async resendVerificationEmail(email: string): Promise<void> {
      const user = await prisma.user.findUnique({ where: { email } });

      if (!user) {
        throw new HttpError(404, 'User not found');
      }

      if (user.verified) {
        throw new HttpError(400, 'Email is already verified');
      }
      
      const verificationToken = user.verificationToken;

    if (!verificationToken) {
      throw new HttpError(500, 'Unable to resend verification email. Please try again later or contact support.');
    }

      const emailSent = await sendEmail({
        to: email,
        subject: 'Verify your email',
        html: `<a href="${process.env.BASE_URL}/api/user/verify/${verificationToken}">Click here to verify your email</a>`,
      });

      if (!emailSent) {
        throw new HttpError(500, 'Failed to send verification email');
      }
}

   async changePassword(userId: number, oldPassword: string, newPassword: string): Promise<void> {
      const user = await prisma.user.findUnique({ where: { id: userId } });
      if (!user) {
        throw new HttpError(404, 'User not found');
      }

      const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
      if (!isPasswordValid) {
        throw new HttpError(401, 'Current password is incorrect');
      }
      
      const isSamePassword = await bcrypt.compare(newPassword, user.password);
      if (isSamePassword) {
        throw new HttpError(400, 'New password cannot be the same as the old password');
      }

      const hashedNewPassword = await bcrypt.hash(newPassword, 10);

      await prisma.user.update({
        where: { id: user.id },
        data: { password: hashedNewPassword },
      });
  }

  async forgotPassword(email: string): Promise<void> {
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) {
        throw new HttpError(404, 'User not found');
      }

      const resetToken = uuidv4();
      const tokenExpiration = new Date();
      tokenExpiration.setHours(tokenExpiration.getHours() + 1);

      await prisma.user.update({
        where: { id: user.id },
        data: { token: resetToken, tokenExpiration },
      });

      await sendEmail({
        to: email,
        subject: 'Reset your password',
        html: `<a href="${process.env.BASE_URL_FRONT}/reset-password?token=${resetToken}">Click here to reset your password</a>`,
      });
      
  }

  async resetPassword(token: string, newPassword: string): Promise<void> {
      const user = await prisma.user.findFirst({ where: { token, tokenExpiration: { gte: new Date() } } });
      if (!user) {
        throw new HttpError(400, 'Invalid or expired reset token');
      }

      const isSamePassword = await bcrypt.compare(newPassword, user.password);
      if (isSamePassword) {
        throw new HttpError(400, 'New password cannot be the same as the old password');
      }

      const hashedNewPassword = await bcrypt.hash(newPassword, 10);

      await prisma.user.update({
        where: { id: user.id },
        data: { password: hashedNewPassword, token: null, tokenExpiration: null },
      });
    
  }

  async updateUser(userId: number, data: { name?: string }): Promise<void> {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new HttpError(404, 'User not found');
    }

    if (data.name && data.name === user.name) {
      throw new HttpError(400, 'New username cannot be the same as the old username');
    }

    await prisma.user.update({
      where: { id: user.id },
      data,
    });
  }

}