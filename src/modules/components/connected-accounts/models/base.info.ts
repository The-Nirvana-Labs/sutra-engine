import { ConnectedAccount } from '../entities/base-entity';
import { ConnectedAccountType } from '../lookups/connected-account.enum';

export abstract class ConnectedAccountInfo {
    private connectedAccount: ConnectedAccount;

    constructor(connectedAccount: ConnectedAccount) {
        this.connectedAccount = connectedAccount;
    }

    abstract getType(): ConnectedAccountType;

    toEntity() {
        return this.connectedAccount;
    }
}
