import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { ComplaintService } from './complaint.service';

@Controller('complaints')
export class ComplaintController {
  constructor(private complaintService: ComplaintService) {}

  @Post()
  async submitComplaint(@Body() createComplaintDto: any) {
    return this.complaintService.createComplaint(createComplaintDto);
  }

  @Get()
  getComplaintsGroupedByStatus() {
    return this.complaintService.getComplaintsGroupedByStatus();
  }

  @Get(':id')
  async getComplaintDetails(@Param('id') id: string) {
    return this.complaintService.getComplaintById(id);
  }
}