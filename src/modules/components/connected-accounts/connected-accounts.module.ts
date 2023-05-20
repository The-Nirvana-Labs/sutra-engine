import { Module } from '@nestjs/common';
import { ConnectedAccountDatastoreService } from './services/datastore.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OpenAIAccount } from './entities/openai-account.entity';
import { GoogleAccount } from './entities/google-account.entity';

@Module({
    imports: [TypeOrmModule.forFeature([OpenAIAccount, GoogleAccount])],
    exports: [ConnectedAccountDatastoreService],
})
export class ConnectedAccountsModule {}
