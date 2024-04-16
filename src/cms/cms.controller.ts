import { Controller, Post, Body, Patch, Param, Get, Query, UseGuards } from '@nestjs/common';
import { CmsService } from './cms.service';
import { CreateCmsUserDto } from './dto/create-cms-user.dto';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';

@Controller('cms-users')
@UseGuards(RolesGuard)
export class CmsController {
  constructor(private cmsService: CmsService) {}

  @Post()
  @Roles('admin') 
  async addCmsUser(@Body() createUserData: any) {
    return this.cmsService.createCmsUser(createUserData);
  }

  @Patch(':id/activate')
  @Roles('admin', 'manager') 
  async activateUser(@Param('id') userId: string, @Body('isActive') isActive: boolean) {
    return this.cmsService.changeUserActivation(userId, isActive);
  }

  @Get()
  @Roles('admin', 'employee') 
  async getCmsUsers(@Query('page') page: number = 1, @Query('limit') limit: number = 10) {
    return this.cmsService.listUsers(page, limit);
  }
}
