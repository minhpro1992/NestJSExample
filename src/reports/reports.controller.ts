import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { AuthGuard } from 'src/guards/auth.guard';
import { UsersEntity } from 'src/users/users.entity';
import { ApprovedReportDto } from './dtos/approved-report.dto';
import { CreateReportDto } from './dtos/create-report.dto';
import { GetEstimateDto } from './dtos/get-estimate.dto';
import { ReportsService } from './reports.service';

@Controller('reports')
export class ReportsController {
  constructor(private reportsService: ReportsService) {}
  @Post('/create')
  @UseGuards(AuthGuard)
  async create(
    @Body() body: CreateReportDto,
    @CurrentUser() user: UsersEntity,
  ) {
    const report = await this.reportsService.create(body, user);
    return report;
  }
  @Get()
  async getList() {
    const reports = await this.reportsService.getList();
    return reports;
  }

  @Patch('/:id')
  @UseGuards(AuthGuard)
  async update(@Param('id') id: string, @Body() body: ApprovedReportDto) {
    const report = await this.reportsService.update(
      parseInt(id),
      body.approved,
    );
    return report;
  }

  @Get('/estimate')
  async getEstimate(@Query() query: GetEstimateDto) {
    return this.reportsService.getEstimate(query);
  }
}
