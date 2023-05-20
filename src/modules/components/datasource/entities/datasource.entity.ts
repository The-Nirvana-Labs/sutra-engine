import { BaseEntity } from "src/common/entities/base-entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne } from "typeorm";
import { DatasourceDefinition } from "./datasource-definition.entity";
import { DatasourceEngineLookup } from "../lookups/datasource-engine-registry.enum";
import { ConnectedAccount } from "../../connected-accounts/entities/base-entity";

@Entity('datasources')
export class Datasource extends BaseEntity {
    @Column()
    title: string;

    @Column()
    description: string;

    @ManyToOne(() => DatasourceDefinition)
    @JoinColumn({ name: 'datasource_definition_id' })
    datasourceDefinition: DatasourceDefinition;

    @Column({
        name: 'datasource_engine',
        type: 'enum',
        enum: DatasourceEngineLookup,
    })
    datasourceEngine: DatasourceEngineLookup;

    @ManyToMany(() => ConnectedAccount)
    connectedAccounts: ConnectedAccount[];
}
