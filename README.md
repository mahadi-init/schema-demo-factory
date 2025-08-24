# Schema Demo Factory

[![npm version](https://badge.fury.io/js/schema-demo-factory.svg)](https://badge.fury.io/js/schema-demo-factory)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg)](http://www.typescriptlang.org/)

Generate realistic mock data from schema definitions with full TypeScript support using Faker.js.

## 🚀 Installation

```bash
npm install schema-demo-factory
```

## 🎯 Quick Start

```typescript
import SchemaDemoFactory, { TypeSchema } from 'schema-demo-factory';

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
 Type: {
   id: string;
   email: string;
   username: string;
   age: number;
   isActive: boolean;
   nickname: string | undefined;
   lastLogin: Date | null;
 }

const mockUsers = SchemaDemoFactory.createMultiple(userSchema, 5);
 Type: Array<{
   id: string;
   email: string;
   username: string;
   age: number;
   isActive: boolean;
   nickname: string | undefined;
   lastLogin: Date | null;
 }>
```

## 🌟 Features

- **🎨 Full TypeScript Support** - Complete type inference and autocomplete
- **🎭 Realistic Data** - Powered by Faker.js for production-quality mock data
- **📦 Type-Safe Schema** - Compile-time type checking and IntelliSense
- **🔄 Nested Objects** - Support for deeply nested structures
- **📋 Arrays** - Configurable array generation with min/max lengths
- **🎲 Optional Fields** - Randomly include/exclude fields
- **🕳️ Nullable Fields** - Support for null values
- **🌐 Locale Support** - Generate data in different languages
- **🔧 Extensible** - Easy to customize and extend

## 📚 Schema Types

### Basic Types

```typescript
// String with patterns
{ type: "string", pattern: "email" }     // user@example.com
{ type: "string", pattern: "uuid" }      // 123e4567-e89b-12d3-a456-426614174000
{ type: "string", pattern: "url" }       // https://example.com
{ type: "string", pattern: "phone" }     // +1-555-123-4567
{ type: "string", pattern: "name" }      // John Doe
{ type: "string", options: ["A", "B"] }  // Random from options

// Numbers with ranges
{ type: "number", min: 18, max: 80 }     // Random number between 18-80

// Booleans
{ type: "boolean" }                      // true or false

// Dates
{ type: "date" }                         // Recent date
```

### Advanced String Patterns

```typescript
{ type: "string", pattern: "paragraph" }    // Lorem ipsum...
{ type: "string", pattern: "image" }        // Avatar URL
{ type: "string", pattern: "ipv4" }         // 192.168.1.1
{ type: "string", pattern: "mac" }          // 00:11:22:33:44:55
{ type: "string", pattern: "hexColor" }     // #ff5733
{ type: "string", pattern: "currency" }     // USD
{ type: "string", pattern: "creditCard" }   // 4532-1234-5678-9012
{ type: "string", pattern: "jobTitle" }     // Software Engineer
{ type: "string", pattern: "company" }      // Acme Corporation
{ type: "string", pattern: "productName" }  // Awesome Widget
{ type: "string", pattern: "price" }        // $99.99
```

### Complex Types

```typescript
// Objects
{
  type: "object",
  properties: {
    name: { type: "string", pattern: "name" },
    age: { type: "number", min: 18, max: 80 }
  }
}

// Arrays
{
  type: "array",
  min: 2,
  max: 5,
  items: { type: "string", pattern: "email" }
}

// Nested structures
{
  type: "object",
  properties: {
    users: {
      type: "array",
      items: {
        type: "object",
        properties: {
          id: { type: "uuid" },
          email: { type: "email" }
        }
      }
    }
  }
}
```

## ⚙️ Schema Options

### Optional Fields

```typescript
{
  type: "string",
  pattern: "name",
  optional: true  // Field may be undefined (30% chance)
}
```

### Nullable Fields

```typescript
{
  type: "date",
  nullable: true  // Field may be null (10% chance)
}
```

### Locale Support

```typescript
{
  type: "string",
  pattern: "name",
  locale: "de"  // Generate German names
}
```

## 🛠️ API Reference

### `SchemaDemoFactory.create(schema)`

Generate a single instance from schema.

```typescript
const user = SchemaDemoFactory.create(userSchema);
```

### `SchemaDemoFactory.createMultiple(schema, count)`

Generate multiple instances from schema.

```typescript
const users = SchemaDemoFactory.createMultiple(userSchema, 10);
```

## 🎯 TypeScript Benefits

### Full Type Inference

```typescript
const userSchema = {
  type: "object",
  properties: {
    id: { type: "uuid" },
    email: { type: "email" },
    profile: {
      type: "object",
      properties: {
        firstName: { type: "string", pattern: "name" },
        lastName: { type: "string", pattern: "name" }
      }
    }
  }
} as const satisfies TypeSchema;

const user = SchemaDemoFactory.create(userSchema);
// TypeScript knows:
// user.id is string
// user.email is string  
// user.profile.firstName is string
// user.profile.lastName is string
```

### Autocomplete Support

When defining schemas, you get full autocomplete for:
- `type` field values
- `pattern` field values
- All available options

## 📦 Dependencies

- [@faker-js/faker](https://www.npmjs.com/package/@faker-js/faker) - For generating realistic mock data

## 🤝 Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details

## 🙏 Acknowledgments

- Thanks to [Faker.js](https://fakerjs.dev/) for providing excellent mock data generation
- Inspired by JSON Schema and OpenAPI specifications

---

**Made with ❤️ for developers who need realistic mock data!**
