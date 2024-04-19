import {
    Entity,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';

export abstract class ChangeTime {
    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}
