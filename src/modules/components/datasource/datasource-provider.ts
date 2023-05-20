import { Injectable } from '@nestjs/common';
import { GoogleDriveLiveDatasourceEngine } from './engines/live-datasources/google-drive.live-datasource';
import { DatasourceEngineLookup } from './lookups/datasource-engine-registry.enum';
import { DatasourceEngine } from './engines/base';

@Injectable()
export class DatasourceProvider {
    constructor(private readonly googleDriveDatasourceEngine: GoogleDriveLiveDatasourceEngine) {}

    getGoogleDriveDatasourceEngine(): GoogleDriveLiveDatasourceEngine {
        return this.googleDriveDatasourceEngine;
    }

    getDatasource(datasourceEngineLookup: DatasourceEngineLookup): DatasourceEngine {
        switch (datasourceEngineLookup) {
            case DatasourceEngineLookup.LIVE_GOOGLE_DRIVE:
                return this.getGoogleDriveDatasourceEngine();
            default:
                throw new Error(`Datasource engine lookup ${datasourceEngineLookup} not found`);
        }
    }
}
