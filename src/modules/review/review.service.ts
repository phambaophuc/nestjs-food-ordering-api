import { Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Review, ReviewDocument } from './entities/review.entity';
import { Model } from 'mongoose';

@Injectable()
export class ReviewService {

    constructor(
        @InjectModel(Review.name) private reviewModel: Model<ReviewDocument>
    ) { }

    async create(createReviewDto: CreateReviewDto) {
        const review = new this.reviewModel(createReviewDto);
        return review.save();
    }

    async findAll(): Promise<ReviewDocument[]> {
        return this.reviewModel.find().exec();
    }
}
