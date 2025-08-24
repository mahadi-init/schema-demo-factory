# Schema Demo Factory

Generate realistic mock data from schema definitions using Faker.js.

## Installation

```bash
npm install schema-demo-factory

```ts
import SchemaDemoFactory, { TypeSchema } from ".";

const userSchema = {
  type: "object",
  properties: {
    id: { type: "uuid" },
    email: { type: "email" },
    username: { type: "string", pattern: "name" },
    age: { type: "number", min: 18, max: 80 },
    isActive: { type: "boolean" },
    nickname: { type: "string", optional: true },
    lastLogin: { type: "date", nullable: true },
  },
} as const satisfies TypeSchema;

const mockUser = SchemaDemoFactory.create(userSchema);
// Type: {
//   id: string;
//   email: string;
//   username: string;
//   age: number;
//   isActive: boolean;
//   nickname: string | undefined;
//   lastLogin: Date | null;
// }

const mockUsers = SchemaDemoFactory.createMultiple(userSchema, 5);
console.warn("DEBUGPRINT[33]: demo.ts:27: mockUsers=", mockUsers);
// Type: Array<{
//   id: string;
//   email: string;
//   username: string;
//   age: number;
//   isActive: boolean;
//   nickname: string | undefined;
//   lastLogin: Date | null;
// }>
```
