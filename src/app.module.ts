import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
// import * as redisStore from 'cache-manager-redis-store';
import { CacheModule } from '@nestjs/cache-manager';
import { ProductModule } from './modules/product/product.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { OrderModule } from './modules/order/order.module';
import { TableModule } from './modules/table/table.module';

@Module({
    imports: [
        ConfigModule.forRoot(),
        MongooseModule.forRoot(`mongodb://${process.env.DATABASE_URL}/DoAnAndroid`),
        CacheModule.register({
            isGlobal: true,
            // store: redisStore,
            // host: process.env.REDIS_HOST,
            // port: process.env.REDIS_PORT
        }),
        ProductModule,
        UserModule,
        AuthModule,
        OrderModule,
        TableModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule { }
