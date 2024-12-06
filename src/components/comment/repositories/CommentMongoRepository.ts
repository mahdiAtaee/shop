import CommentStatus from "../model/CommentStatus";
import ICommentRepository from "./ICommentRepository";
import CommentModel from "../model/Comment";
import IComment from "../model/IComment";
import { FilterQuery } from "mongoose";

export default class CommentMongoRepository implements ICommentRepository {
  public async findByStatus(status: CommentStatus): Promise<IComment[]> {
    return CommentModel.find({ status });
  }
  public async findOne(ID: string): Promise<IComment | null> {
    return CommentModel.findById(ID);
  }
  public async findMany(params: any): Promise<IComment[]> {
    return CommentModel.find(params);
  }
  public async create(params: any): Promise<IComment> {
    const newComment = new CommentModel({ ...params });
    return newComment.save();
  }
  public async updateOne(
    where: FilterQuery<IComment>,
    updateData: Partial<IComment>
  ): Promise<boolean> {
    const Comment = await CommentModel.updateOne(where, updateData);
    if (Comment) {
      return true;
    }
    return false;
  }
  public async updateMany(where: any, params: any): Promise<any> {
    throw new Error("Method not implemented.");
  }
  public async deleteOne(ID: string): Promise<any> {
    throw new Error("Method not implemented.");
  }
  public async deleteMany(where: any): Promise<any> {
    throw new Error("Method not implemented.");
  }
}
