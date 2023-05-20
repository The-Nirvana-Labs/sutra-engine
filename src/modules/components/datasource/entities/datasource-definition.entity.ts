import { BaseEntity } from 'src/common/entities/base-entity';
import { Column, Entity } from 'typeorm';
import { DatasourceCategory } from '../lookups/datasource-type.enum';

@Entity('datasource_definitions')
export class DatasourceDefinition extends BaseEntity {
    @Column()
    name: string;

    @Column({
        name: 'category',
        type: 'enum',
        enum: DatasourceCategory,
        nullable: false,
    })
    category: DatasourceCategory;
}
