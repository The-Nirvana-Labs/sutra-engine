import { ChildEntity, Column, Entity } from 'typeorm';
import { ConnectedAccount } from './base-entity';
import { ConnectedAccountType } from '../lookups/connected-account.enum';

@ChildEntity(ConnectedAccountType.OpenAI)
export class OpenAIAccount extends ConnectedAccount {
    @Column()
    apiKey: string;

    @Column()
    organizationId: string;
}
