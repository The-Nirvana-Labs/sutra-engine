import { GoogleAccount } from '../entities/google-account.entity';
import { ConnectedAccountType, GoogleAccountPermission } from '../lookups/connected-account.enum';
import { ConnectedAccountInfo } from './base.info';

export class GoogleAccountInfo extends ConnectedAccountInfo {
    constructor(googleAccount: GoogleAccount) {
        super(googleAccount);
    }

    getAccessToken(): string {
        throw new Error('Method not implemented.');
    }

    getPermissions(): Set<GoogleAccountPermission> {
        throw new Error('Method not implemented.');
    }

    getType(): ConnectedAccountType {
        return ConnectedAccountType.Google;
    }
}
