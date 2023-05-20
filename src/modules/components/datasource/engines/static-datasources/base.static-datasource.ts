import { DatasourceCategory } from '../../lookups/datasource-type.enum';
import { DatasourceEngine } from '../base';

export abstract class StaticDatasourceEngine extends DatasourceEngine {
    getDatasourceCategory() {
        return DatasourceCategory.StaticDatasource;
    }
}
