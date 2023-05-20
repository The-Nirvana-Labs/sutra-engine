import { ChildEntity, Column, Entity } from 'typeorm';
import { ConnectedAccount } from './base-entity';
import { ConnectedAccountType } from '../lookups/connected-account.enum';

@ChildEntity(ConnectedAccountType.Google)
export class GoogleAccount extends ConnectedAccount {
    @Column()
    refreshToken: string;

    @Column()
    lastRefreshed: Date;

    @Column({
        name: 'permissions',
        type: 'int',
        default: 0,
    })
    permissions: number;

    @Column()
    gmailId: string;
}
