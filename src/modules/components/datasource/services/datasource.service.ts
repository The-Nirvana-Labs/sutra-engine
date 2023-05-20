import { Injectable } from '@nestjs/common';
import { DatasourceProvider } from '../datasource-provider';
import { LiveDatasourceEngine } from '../engines/live-datasources/base.live-datasource';
import { DatasourceEngine } from '../engines/base';
import { ConnectedAccountType } from '../../connected-accounts/lookups/connected-account.enum';
import { EntityManager } from 'typeorm';
import { InjectEntityManager } from '@nestjs/typeorm';
import { Datasource } from '../entities/datasource.entity';
import { DatasourceCategory } from '../lookups/datasource-type.enum';
import { StaticDatasourceEngine } from '../engines/static-datasources/base.static-datasource';
import { DatasourceEngineLookup } from '../lookups/datasource-engine-registry.enum';
import { DatasourceToConnectedAccountMapping } from '../entities/datasource-mapping.entity';
import { ConnectedAccountDatastoreService } from '../../connected-accounts/services/datastore.service';

export interface DatasourceExecutionOptions {
    datasourceId: string;
}

@Injectable()
export class DatasourceService {
    constructor(
        private readonly datasourceProvider: DatasourceProvider,
        @InjectEntityManager() private readonly entityManager: EntityManager,
        private readonly connectedAccountsDatastoreService: ConnectedAccountDatastoreService,
    ) {}

    async execute(options: DatasourceExecutionOptions): Promise<void> {
        const { datasourceId } = options;
        const datasource = await this.entityManager.findOneBy(Datasource, { id: datasourceId });
        const datasourceEngine = this.getDatasource(datasource.datasourceEngine);
        this.executeEngine(datasourceEngine);
    }

    async isDatasourceCompliant(datasourceId: string): Promise<boolean> {
        const datasource = await this.entityManager.findOneBy(Datasource, { id: datasourceId });
        const datasourceEngine = this.getDatasource(datasource.datasourceEngine);
        return datasourceEngine.checkCompliance(datasource.connectedAccounts);
    }

    private async executeLiveDatasource(liveDatasource: LiveDatasourceEngine, datasource) {}

    private async executeStaticDatasource(staticDatasource: StaticDatasourceEngine) {}

    getRequiredConnectedAccounts(datasourceEngine: DatasourceEngine): ConnectedAccountType[] {
        return datasourceEngine.getRequiredConnectedAccounts();
    }

    async executeEngine(datasourceEngine: DatasourceEngine) {
        switch (datasourceEngine.getDatasourceCategory()) {
            case DatasourceCategory.LiveDatasource:
                this.executeLiveDatasource(datasourceEngine as LiveDatasourceEngine);
                break;
            case DatasourceCategory.StaticDatasource:
                this.executeStaticDatasource(datasourceEngine as StaticDatasourceEngine);
                break;
            default:
                throw new Error(`Datasource category ${datasourceEngine.getDatasourceCategory()} not found`);
        }
    }

    private getDatasource(datasourceEngineLookup: DatasourceEngineLookup): DatasourceEngine {
        return this.datasourceProvider.getDatasource(datasourceEngineLookup);
    }

    private async getConnectedAccounts(datasourceId: string): Promise<ConnectedAccountType[]> {
        const mappings: DatasourceToConnectedAccountMapping[] = await this.entityManager.findBy(DatasourceToConnectedAccountMapping, {
            datasourceId,
        });
        this.connectedAccountsDatastoreService.
        const datasourceEngine = this.getDatasource(datasource.datasourceEngine);
        return datasourceEngine.getRequiredConnectedAccounts();
    }
}
