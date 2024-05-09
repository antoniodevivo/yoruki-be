import { DataSource } from "typeorm";
import dbConfigs from "./ormconfig"

const AppDataSource = new DataSource(dbConfigs)

AppDataSource.initialize()
  .then(async () => {
    const userRepository = AppDataSource.getRepository(User);

    // Inizia una transazione
    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.startTransaction();

    try {
      let user = new User();
      user.name = "John";
      user.email = "john@example.com";

      // Salva l'utente all'interno della transazione
      await queryRunner.manager.save(user);

      // Esegui il commit della transazione
      await queryRunner.commitTransaction();
    } catch (error) {
      // Se c'è un errore, esegui il rollback della transazione
      await queryRunner.rollbackTransaction();
    } finally {
      // Rilascia il query runner
      await queryRunner.release();
    }
  })
  .catch((error) => console.log(error));
