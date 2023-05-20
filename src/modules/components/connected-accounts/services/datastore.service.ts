import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { OpenAIAccount } from '../entities/openai-account.entity';
import { OpenAIAccountInfo } from '../models/open-ai.info';
import { GoogleAccountInfo } from '../models/google-account.info';
import { GoogleAccount } from '../entities/google-account.entity';
import { ConnectedAccount } from '../entities/base-entity';
import { ConnectedAccountInfo } from '../models/base.info';
import { ConnectedAccountType } from '../lookups/connected-account.enum';

@Injectable()
export class ConnectedAccountDatastoreService {
    constructor(@InjectEntityManager() private entityManager: EntityManager) {}

    async getOpenAIAccount(id: string): Promise<OpenAIAccountInfo> {
        const openAIEntity = await this.entityManager.findOneBy(OpenAIAccount, { id });
        return new OpenAIAccountInfo(openAIEntity);
    }

    async saveOpenAIAccount(openAIAccount: OpenAIAccountInfo): Promise<OpenAIAccountInfo> {
        const openAIEntity = openAIAccount.toEntity() as OpenAIAccount;
        const savedOpenAIEntity = await this.entityManager.save(openAIEntity);
        return new OpenAIAccountInfo(savedOpenAIEntity);
    }

    async getGoogleAccount(id: string): Promise<GoogleAccountInfo> {
        const googleEntity = await this.entityManager.findOneBy(GoogleAccount, { id });
        return new GoogleAccountInfo(googleEntity);
    }

    async saveGoogleAccount(googleAccount: GoogleAccountInfo): Promise<GoogleAccountInfo> {
        const googleEntity = googleAccount.toEntity() as GoogleAccount;
        const savedGoogleEntity = await this.entityManager.save(googleEntity);
        return new GoogleAccountInfo(savedGoogleEntity);
    }

    async getConnectedAccount(id: string): Promise<ConnectedAccountInfo> {
        const connectedAccount = await this.entityManager.findOneBy(ConnectedAccount, { id });
        return this.loadConnectedAccountInfo(connectedAccount);
    }

    private loadConnectedAccountInfo(connectedAccount: ConnectedAccount): ConnectedAccountInfo {
        switch (connectedAccount.type) {
            case ConnectedAccountType.Google:
                return new GoogleAccountInfo(connectedAccount as GoogleAccount);
            case ConnectedAccountType.OpenAI:
                return new OpenAIAccountInfo(connectedAccount as OpenAIAccount);
            default:
                throw new Error('Unknown connected account type');
        }
    }
}
