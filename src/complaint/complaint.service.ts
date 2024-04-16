import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Complaint, ComplaintDocument } from './schemas/complaint.schema';

@Injectable()
export class ComplaintService {
  constructor(@InjectModel(Complaint.name) private complaintModel: Model<ComplaintDocument>) {}

  async createComplaint(complaintData: any): Promise<Complaint> {
    const count = await this.complaintModel.countDocuments();
    complaintData.title = `${complaintData.title}#${count + 1}`;

    const newComplaint = new this.complaintModel(complaintData);
    return newComplaint.save();
  }

  async getComplaintsByStatus(status: string): Promise<Complaint[]> {
    return this.complaintModel.find({ status }).exec();
  }

  async getComplaintById(id: string): Promise<Complaint | null> {
    return this.complaintModel.findById(id).exec();
  }

  async getComplaintsGroupedByStatus(): Promise<{ status: string, complaints: Complaint[] }[]> {
    const complaints = await this.complaintModel.find().exec();
    return complaints.reduce((acc, complaint) => {
      const group = acc.find(g => g.status === complaint.status);
      if (group) {
        group.complaints.push(complaint);
      } else {
        acc.push({ status: complaint.status, complaints: [complaint] });
      }
      return acc;
    }, []);
  }
}
