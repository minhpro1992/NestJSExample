import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from 'src/users/users.entity';
import { Repository } from 'typeorm';
import { CreateReportDto } from './dtos/create-report.dto';
import { GetEstimateDto } from './dtos/get-estimate.dto';
import { ReportsEntity } from './reports.entity';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(ReportsEntity)
    private reportsRepo: Repository<ReportsEntity>,
  ) {}
  async create(reportDto: CreateReportDto, user: UsersEntity) {
    const report = this.reportsRepo.create(reportDto);
    report.user = user;
    return this.reportsRepo.save(report);
  }
  async getList() {
    return this.reportsRepo.find();
  }
  async update(id: number, approved: boolean) {
    const report = await this.reportsRepo.findOne({
      where: {
        id,
      },
    });
    console.log(id, approved, report);
    if (!report) {
      throw new NotFoundException('Report not found');
    }
    report.approved = approved;
    return this.reportsRepo.save(report);
  }
  async getEstimate({ make, model, year }: GetEstimateDto) {
    console.log(make, model, year);
    return this.reportsRepo
      .createQueryBuilder()
      .select('AVG(price)', 'price')
      .where('make = :make', { make })
      .andWhere('model = :model', { model })
      .andWhere('approved IS TRUE')
      .andWhere('year - :year BETWEEN -3 AND 3', { year })
      .limit(3);
  }
}
