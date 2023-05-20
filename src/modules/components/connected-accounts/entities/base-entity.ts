import { BaseEntity } from 'src/common/entities/base-entity';
import { ChildEntity, Column, Entity, TableInheritance } from 'typeorm';
import { ConnectedAccountType } from '../lookups/connected-account.enum';

@Entity('connected_accounts')
@TableInheritance({
    column: { name: 'type', type: 'enum', enum: ConnectedAccountType, nullable: false },
})
export class ConnectedAccount extends BaseEntity {
    @Column()
    name: string;

    @Column({
        name: 'type',
        type: 'enum',
        enum: ConnectedAccountType,
        nullable: false,
    })
    type: ConnectedAccountType;

    @Column()
    lastUsed: Date;
}
