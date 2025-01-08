import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { GoogleAuthGuard } from './guards/google-auth/google-auth.guard';
import { RefreshAuthGuard } from './guards/refresh-auth/refresh-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @UseGuards(GoogleAuthGuard)
  @Get('google/login')
  googleLogin() {}

  @Public()
  @UseGuards(GoogleAuthGuard)
  @Get('google/callback')
  async googleCallback(@Req() req, @Res() res) {
    const response = await this.authService.login(req.user.id);
    res.cookie('refreshToken', response.refreshToken, {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    });
    res.cookie('accessToken', response.accessToken, {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    });
    res.redirect(
      `/loginCallback?token=${response.accessToken}&refreshToken=${response.refreshToken}`,
    );
  }

  @Get('logout')
  logout(@Res() res) {
    res.clearCookie('refreshToken');
    res.clearCookie('accessToken');
    res.redirect('/login');
  }

  @Post('login')
  async login(@Req() req) {
    const token = await this.authService.login(req.user.id);
    return { id: req.user.id, token };
  }

  @UseGuards(RefreshAuthGuard)
  @Post('refresh')
  refreshToken(@Req() req) {
    return this.authService.refreshToken(req.user.id);
  }
}
