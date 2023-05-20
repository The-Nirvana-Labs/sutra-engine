import { ConnectedAccountType, GoogleAccountPermission } from 'src/modules/components/connected-accounts/lookups/connected-account.enum';
import { LiveDatasourceEngine } from './base.live-datasource';
import { Injectable } from '@nestjs/common';
import { ConnectedAccountInfo } from 'src/modules/components/connected-accounts/models/base.info';
import { GoogleAccountInfo } from 'src/modules/components/connected-accounts/models/google-account.info';

@Injectable()
export class GoogleDriveLiveDatasourceEngine extends LiveDatasourceEngine {
    getRequiredConnectedAccounts(): ConnectedAccountType[] {
        return [ConnectedAccountType.Google];
    }

    protected getDatapoints0(accountTypeToAccountMap: Map<ConnectedAccountType, ConnectedAccountInfo>): Promise<any> {
        const googleAccountInfo = accountTypeToAccountMap.get(ConnectedAccountType.Google) as GoogleAccountInfo;
        const accessToken = googleAccountInfo.getAccessToken();

        // Fetch data from Google Drive using the accessToken.

        throw new Error('Method not implemented.');
    }

    async checkCustomCompliance(connectedAccounts: Map<ConnectedAccountType, ConnectedAccountInfo>): Promise<boolean> {
        const googleAccount: GoogleAccountInfo = connectedAccounts.get(ConnectedAccountType.Google) as GoogleAccountInfo;
        const permissions = googleAccount.getPermissions();

        const hasReadPermissions = permissions.has(GoogleAccountPermission.DRIVE_READONLY);

        return hasReadPermissions;
    }
}
