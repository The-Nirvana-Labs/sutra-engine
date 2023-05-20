import { DatasourceCategory } from '../../lookups/datasource-type.enum';
import { DatasourceEngine } from '../base';

export abstract class LiveDatasourceEngine extends DatasourceEngine {
    getDatasourceCategory() {
        return DatasourceCategory.LiveDatasource;
    }
}
