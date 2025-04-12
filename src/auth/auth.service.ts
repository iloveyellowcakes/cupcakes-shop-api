import { Injectable } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from 'src/schemas/User.schema';
import { UsersService } from 'src/users/user.service';
import { AuthDto } from './dto/create-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(auth: AuthDto): Promise<Partial<User> | null> {
    const { email, password } = auth;
    const user = await this.userService.findByEmail(email);
    if (!user) return null;

    const isMatchPassword = await bcrypt.compare(password, user.password);
    console.log(user, isMatchPassword, 'oi3 oi');

    if (!isMatchPassword) return null;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...result } = user;
    return result;
  }

  login(user: Partial<User>) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
