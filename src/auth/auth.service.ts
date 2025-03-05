import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../models/user.model';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { Op } from 'sequelize';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const { email, username, password, phone, address } = registerDto;

    // Check if user exists
    const existingUser = await this.userModel.findOne({
      where: {
        [Op.or]: [{ email }, { username }],
      },
    });

    if (existingUser) {
      throw new ConflictException('User with this email or username already exists');
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await this.userModel.create({
      email,
      username,
      password_hash: hashedPassword,
      phone,
      address,
    });

    // Generate token
    const token = this.jwtService.sign({ 
      id: user.id,
      email: user.email,
      username: user.username,
    });

    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        phone: user.phone,
        address: user.address,
      },
    };
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    // Find user with raw query to ensure we get the password_hash
    const user = await this.userModel.findOne({
      where: { email },
      raw: true,
      attributes: ['id', 'email', 'username', 'password_hash', 'phone', 'address']
    });

    if (!user) {
      throw new UnauthorizedException('No account found with this email address');
    }

    // Debug logging
    console.log('Login attempt:', {
      email,
      passwordProvided: !!password,
      passwordHashExists: !!user.password_hash,
      userData: {
        id: user.id,
        email: user.email,
        username: user.username,
        hasPasswordHash: !!user.password_hash
      }
    });

    // Verify password
    try {
      const isPasswordValid = await bcrypt.compare(password, user.password_hash);
      if (!isPasswordValid) {
        throw new UnauthorizedException('Incorrect password');
      }
    } catch (error) {
      console.error('Password comparison error:', error);
      throw new UnauthorizedException('Incorrect password');
    }

    // Generate token
    const token = this.jwtService.sign({ 
      id: user.id,
      email: user.email,
      username: user.username,
    });

    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        phone: user.phone,
        address: user.address,
      },
    };
  }
} 