import { ConnectedAccountType } from '../../connected-accounts/lookups/connected-account.enum';
import { ConnectedAccountInfo } from '../../connected-accounts/models/base.info';
import { DatasourceCategory } from '../lookups/datasource-type.enum';

/*
 * This is the base class for all datasource engines.
 * @abstract
 * @param T - The type of the datapoints that this datasource engine returns.
 */

export abstract class DatasourceEngine {
    async getDatapoints(connectedAccounts: ConnectedAccountInfo[]): Promise<any> {
        const complianceOk = await this.checkCompliance(connectedAccounts);

        if (!complianceOk) {
            throw new Error('Datasource engine is not compliant.');
        }

        const accountTypeToAccountMap: Map<ConnectedAccountType, ConnectedAccountInfo> = this.getAccountTypeToAccountMap(connectedAccounts);
        return this.getDatapoints0(accountTypeToAccountMap);
    }

    async checkCompliance(connectedAccounts: ConnectedAccountInfo[]): Promise<boolean> {
        const mandatoryComplianceOK: boolean = this.checkMandatoryCompliance(connectedAccounts);

        const accountTypeToAccountMap: Map<ConnectedAccountType, ConnectedAccountInfo> = this.getAccountTypeToAccountMap(connectedAccounts);
        const customComplianceOK: boolean = await this.checkCustomCompliance(accountTypeToAccountMap);

        return mandatoryComplianceOK && customComplianceOK;
    }

    protected checkMandatoryCompliance(connectedAccounts: ConnectedAccountInfo[]): boolean {
        const hasAccounts: boolean = this.checkHasAccounts(connectedAccounts, this.getRequiredConnectedAccounts());
        const onlyOneAccountOfType: boolean = this.checkOnlyOneAccountOfType(connectedAccounts, this.getRequiredConnectedAccounts());
        return hasAccounts && onlyOneAccountOfType;
    }

    protected async checkCustomCompliance(_: Map<ConnectedAccountType, ConnectedAccountInfo>): Promise<boolean> {
        /**
         * This method is meant to be overridden by subclasses.
         */
        return true;
    }

    protected checkHasAccounts(connectedAccounts: ConnectedAccountInfo[], requiredAccountTypes: ConnectedAccountType[]): boolean {
        for (const requiredAccountType of requiredAccountTypes) {
            let hasAccount = false;
            for (const connectedAccount of connectedAccounts) {
                const connectedAccountType: ConnectedAccountType = connectedAccount.getType();
                if (connectedAccountType === requiredAccountType) {
                    hasAccount = true;
                    break;
                }
            }
            if (!hasAccount) {
                return false;
            }
        }
        return true;
    }

    protected checkOnlyOneAccountOfType(connectedAccounts: ConnectedAccountInfo[], requiredAccountTypes: ConnectedAccountType[]): boolean {
        for (const requiredAccountType of requiredAccountTypes) {
            let hasAccount = false;
            for (const connectedAccount of connectedAccounts) {
                const connectedAccountType: ConnectedAccountType = connectedAccount.getType();
                if (connectedAccountType === requiredAccountType) {
                    if (hasAccount) {
                        return false;
                    } else {
                        hasAccount = true;
                    }
                }
            }
        }
        return true;
    }

    protected getAccountTypeToAccountMap(connectedAccounts: ConnectedAccountInfo[]): Map<ConnectedAccountType, ConnectedAccountInfo> {
        const accountTypeToAccountMap: Map<ConnectedAccountType, ConnectedAccountInfo> = new Map();
        for (const connectedAccount of connectedAccounts) {
            const connectedAccountType: ConnectedAccountType = connectedAccount.getType();
            accountTypeToAccountMap.set(connectedAccountType, connectedAccount);
        }
        return accountTypeToAccountMap;
    }

    protected abstract getDatapoints0(accountTypeToAccountMap: Map<ConnectedAccountType, ConnectedAccountInfo>): Promise<any>;

    abstract getDatasourceCategory(): DatasourceCategory;

    abstract getRequiredConnectedAccounts(): ConnectedAccountType[];
}
