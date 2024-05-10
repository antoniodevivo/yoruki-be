import { DataSource } from "typeorm";
import dbConfigs from "./ormconfig"

//Fixtures Objects
import SystemRolesFixtures from "./src/fixtures/system-roles"
import UsersFixtures from "./src/fixtures/users"

// Set array in order of releationship
const fixtures = [SystemRolesFixtures, UsersFixtures]

const AppDataSource = new DataSource(dbConfigs)

AppDataSource.initialize()
  .then(async () => {
    let savedDbObjects = {}

    for (const fixture of fixtures) {
      savedDbObjects[fixture.Entity.name] = {}
    }

    // Start Transaction
    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.startTransaction();

    try {
      var dbObject;
      var fixtureObj;

      for (const fixture of fixtures) {
        // Init repo
        const repository = AppDataSource.getRepository(fixture.Entity);

        for (const row of Object.keys(fixture.items)) {

          // Init Object
          dbObject = new fixture.Entity()

          for (const column of Object.keys(fixture.items[row])) {
            fixtureObj = fixture.items[row][column]

            // Releationship objects
            if (typeof fixtureObj === 'object') {
              // Only ManyToOne for now
              if (!Object.keys(savedDbObjects[fixtureObj.entityName]).includes(fixtureObj.itemName)) {
                throw new Error(`Unable to find saved object for entity ${fixtureObj.entityName} with name ${fixtureObj.itemName}`)
              }
              dbObject[column] = savedDbObjects[fixtureObj.entityName][fixtureObj.itemName]
            } else {
              dbObject[column] = fixtureObj
            }

          }

          // Save dbObject
          await queryRunner.manager.save(dbObject);

          savedDbObjects[fixture.Entity.name][row] = dbObject;

        }


      }

      // Finally Commit
      await queryRunner.commitTransaction();

    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  })
  .catch((error) => console.log(error));
