import SchemaDemoFactory, { TypeSchema } from ".";

const userSchema: TypeSchema = {
  type: "object",
  properties: {
    id: { type: "uuid" },
    email: { type: "email" },
    username: { type: "string", pattern: "name" },
    age: { type: "number", min: 18, max: 80 },
    isActive: { type: "boolean" },
  },
} as const;

const mockUser = SchemaDemoFactory.create(userSchema);
console.log(mockUser);

// Generate multiple instances
const mockUsers = SchemaDemoFactory.createMultiple(userSchema, 5);
console.log(mockUsers);
