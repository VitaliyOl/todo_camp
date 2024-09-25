import { Request, Response } from 'express';
import UserService from '@/services/user.service';
import HttpError from '@/helpers/HttpError';

export class UserController {
  constructor(private userService: UserService) {}

  async register(req: Request, res: Response): Promise<void> {
    const { name, email, password } = req.body;
    const newUser = await this.userService.register(name, email, password);
    res.status(201).json(newUser);
  }

  async login(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;
    const { token, user } = await this.userService.login(email, password);
    res.status(200).json({ token, user });
  }

  async logout(req: Request, res: Response): Promise<void> {    
    if (!req.user) {
      throw new HttpError(401, 'Not authorized');
    }

    await this.userService.logout(req.user.id);

    res.json({
      message: 'Logout success',
    });
  }

  async verifyEmail(req: Request, res: Response): Promise<void> {
    const { verificationToken } = req.params;
    await this.userService.verifyEmail(verificationToken);
    res.json({ message: 'Email successfully verified!' });
  }

  async resendVerificationEmail(req: Request, res: Response): Promise<void> {
    const { email } = req.body;
    await this.userService.resendVerificationEmail(email);
    res.json({ message: 'Verification email sent successfully' });
  }

  async changePassword(req: Request, res: Response): Promise<void> {
    if (!req.user) {
      throw new HttpError(401, 'Not authorized');
    }

    const { oldPassword, newPassword } = req.body;
    await this.userService.changePassword(req.user.id, oldPassword, newPassword);
    res.json({ message: 'Password changed successfully' });
  }

  async forgotPassword(req: Request, res: Response): Promise<void> {
    const { email } = req.body;
    await this.userService.forgotPassword(email);
    res.status(200).json({ message: 'Password reset link sent to your email' });
  }

  async resetPassword(req: Request, res: Response): Promise<void> {
    const { token, newPassword } = req.body;
    await this.userService.resetPassword(token, newPassword);
    res.status(200).json({ message: 'Password reset successfully' });
  }

  async updateUser(req: Request, res: Response): Promise<void> {
    if (!req.user) {
      throw new HttpError(401, 'Not authorized');
    }

    const { name } = req.body;
    await this.userService.updateUser(req.user.id, { name });
    res.json({ message: 'User information updated successfully' });
  }
}

const userController = new UserController(new UserService());
export default userController;
