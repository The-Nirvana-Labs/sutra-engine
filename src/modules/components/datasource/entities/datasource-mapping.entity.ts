import { BaseEntity } from 'src/common/entities/base-entity';
import { Column, Entity } from 'typeorm';

@Entity('datasource_to_connected_account_mappings')
export class DatasourceToConnectedAccountMapping extends BaseEntity {
    @Column()
    datasourceId: string;

    @Column()
    connectedAccountId: string;
}
