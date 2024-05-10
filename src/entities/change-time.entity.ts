import {
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';

export abstract class ChangeTime {
    
    setColumnValue(columnName, columnValue) {
        this[columnName] = columnValue;
    }

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}
