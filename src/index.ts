import { faker } from "@faker-js/faker";

// Define specific pattern types for better autocomplete
type StringPattern =
  | "email"
  | "uuid"
  | "url"
  | "phone"
  | "name"
  | "address"
  | "paragraph"
  | "image"
  | "ipv4"
  | "mac"
  | "hexColor"
  | "currency"
  | "creditCard"
  | "jobTitle"
  | "word"
  | "sentence"
  | "avatar"
  | "company"
  | "productName"
  | "price";

type SchemaType =
  | "string"
  | "number"
  | "boolean"
  | "object"
  | "array"
  | "date"
  | "uuid"
  | "email"
  | "url"
  | "phone"
  | "name"
  | "address"
  | "paragraph"
  | "image"
  | "ipv4"
  | "mac"
  | "hexColor"
  | "currency"
  | "creditCard"
  | "jobTitle";

export interface TypeSchema {
  type: SchemaType;
  properties?: { [key: string]: TypeSchema };
  items?: TypeSchema;
  min?: number;
  max?: number;
  options?: any[];
  pattern?: StringPattern; // Now has autocomplete!
  optional?: boolean;
  nullable?: boolean;
  locale?: string;
}

class SchemaDemoFactory {
  static create(schema: TypeSchema): any {
    // Handle optional fields
    if (schema.optional && Math.random() > 0.7) return undefined;
    if (schema.nullable && Math.random() > 0.9) return null;

    switch (schema.type) {
      // String with various patterns
      case "string":
        if (schema.options && schema.options.length > 0) {
          return faker.helpers.arrayElement(schema.options);
        }
        switch (schema.pattern) {
          case "email":
            return faker.internet.email();
          case "uuid":
            return faker.string.uuid();
          case "url":
            return faker.internet.url();
          case "phone":
            return faker.phone.number();
          case "name":
            return faker.person.fullName();
          case "address":
            return faker.location.streetAddress();
          case "paragraph":
            return faker.lorem.paragraph();
          case "image":
          case "avatar":
            return faker.image.avatar();
          case "ipv4":
            return faker.internet.ip();
          case "mac":
            return faker.internet.mac();
          case "hexColor":
            return faker.color.rgb({ prefix: "#" });
          case "currency":
            return faker.finance.currencyCode();
          case "creditCard":
            return faker.finance.creditCardNumber();
          case "jobTitle":
            return faker.person.jobTitle();
          case "word":
            return faker.lorem.word();
          case "sentence":
            return faker.lorem.sentence();
          case "company":
            return faker.company.name();
          case "productName":
            return faker.commerce.productName();
          case "price":
            return faker.commerce.price();
          default:
            return faker.lorem.word();
        }

      // Number with range
      case "number":
        const min = schema.min ?? 0;
        const max = schema.max ?? 100;
        return faker.number.int({ min, max });

      // Boolean
      case "boolean":
        return faker.datatype.boolean();

      // Date
      case "date":
        return faker.date.recent();

      // UUID
      case "uuid":
        return faker.string.uuid();

      // Email
      case "email":
        return faker.internet.email();

      // URL
      case "url":
        return faker.internet.url();

      // Phone
      case "phone":
        return faker.phone.number();

      // Name
      case "name":
        return faker.person.fullName();

      // Address
      case "address":
        return faker.location.streetAddress();

      // Paragraph
      case "paragraph":
        return faker.lorem.paragraph();

      // Image
      case "image":
        return faker.image.avatar();

      // IPv4
      case "ipv4":
        return faker.internet.ip();

      // MAC Address
      case "mac":
        return faker.internet.mac();

      // Hex Color
      case "hexColor":
        return faker.color.rgb({ prefix: "#" });

      // Currency
      case "currency":
        return faker.finance.currencyCode();

      // Credit Card
      case "creditCard":
        return faker.finance.creditCardNumber();

      // Job Title
      case "jobTitle":
        return faker.person.jobTitle();

      // Object with nested properties
      case "object":
        const result: any = {};
        if (schema.properties) {
          for (const key in schema.properties) {
            const value = this.create(schema.properties[key]!!);
            if (value !== undefined) {
              result[key] = value;
            }
          }
        }
        return result;

      // Array with items
      case "array":
        const length =
          schema.min !== undefined || schema.max !== undefined
            ? faker.number.int({
                min: schema.min ?? 0,
                max: schema.max ?? 5,
              })
            : 3;
        return Array.from({ length }, () =>
          schema.items ? this.create(schema.items) : null,
        );

      default:
        return null;
    }
  }

  // Utility method to create multiple instances
  static createMultiple(schema: TypeSchema, count: number = 3): any[] {
    return Array.from({ length: count }, () => this.create(schema));
  }
}

export default SchemaDemoFactory;
