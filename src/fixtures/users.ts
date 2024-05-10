import { Users } from "../entities/users.entity"
import { SystemRoles } from "../entities/system-roles.entity"

export default {
  Entity: Users,
  items: {
    admin: {
      fullName: "admin",
      email: "admin@yoruki.com",
      username: "admin",
      systemRole: {
        type: "ManyToOne",
        entityName: SystemRoles.name,
        itemName: "admin"
      }
    }
  }
}