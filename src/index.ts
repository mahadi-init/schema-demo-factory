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

// Type inference utility
type InferSchemaTypeInner<T extends TypeSchema> = T extends { type: infer Type }
  ? Type extends "string"
    ? T extends { options: infer O }
      ? O extends any[]
        ? O[number]
        : string
      : T extends { pattern: StringPattern }
        ? string
        : string
    : Type extends "number"
      ? number
      : Type extends "boolean"
        ? boolean
        : Type extends "date"
          ? Date
          : Type extends
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
                | "jobTitle"
            ? string
            : Type extends "object"
              ? T extends { properties: infer Props }
                ? Props extends Record<string, TypeSchema>
                  ? { [K in keyof Props]: InferSchemaType<Props[K]> }
                  : Record<string, any>
                : Record<string, any>
              : Type extends "array"
                ? T extends { items: infer I }
                  ? I extends TypeSchema
                    ? Array<InferSchemaType<I>>
                    : any[]
                  : any[]
                : any
  : any;

type InferSchemaType<T extends TypeSchema> = T extends { optional: true }
  ? InferSchemaTypeInner<T> | undefined
  : T extends { nullable: true }
    ? InferSchemaTypeInner<T> | null
    : InferSchemaTypeInner<T>;

class SchemaDemoFactory {
  static create<T extends TypeSchema>(schema: T): InferSchemaType<T> {
    // Handle optional fields
    if (schema.optional && Math.random() > 0.7) return undefined as any;
    if (schema.nullable && Math.random() > 0.9) return null as any;

    switch (schema.type) {
      // String with various patterns
      case "string":
        if (schema.options && schema.options.length > 0) {
          return faker.helpers.arrayElement(schema.options) as any;
        }
        switch (schema.pattern) {
          case "email":
            return faker.internet.email() as any;
          case "uuid":
            return faker.string.uuid() as any;
          case "url":
            return faker.internet.url() as any;
          case "phone":
            return faker.phone.number() as any;
          case "name":
            return faker.person.fullName() as any;
          case "address":
            return faker.location.streetAddress() as any;
          case "paragraph":
            return faker.lorem.paragraph() as any;
          case "image":
          case "avatar":
            return faker.image.avatar() as any;
          case "ipv4":
            return faker.internet.ip() as any;
          case "mac":
            return faker.internet.mac() as any;
          case "hexColor":
            return faker.color.rgb({ prefix: "#" }) as any;
          case "currency":
            return faker.finance.currencyCode() as any;
          case "creditCard":
            return faker.finance.creditCardNumber() as any;
          case "jobTitle":
            return faker.person.jobTitle() as any;
          case "word":
            return faker.lorem.word() as any;
          case "sentence":
            return faker.lorem.sentence() as any;
          case "company":
            return faker.company.name() as any;
          case "productName":
            return faker.commerce.productName() as any;
          case "price":
            return faker.commerce.price() as any;
          default:
            return faker.lorem.word() as any;
        }

      // Number with range
      case "number":
        const min = schema.min ?? 0;
        const max = schema.max ?? 100;
        return faker.number.int({ min, max }) as any;

      // Boolean
      case "boolean":
        return faker.datatype.boolean() as any;

      // Date
      case "date":
        return faker.date.recent() as any;

      // UUID
      case "uuid":
        return faker.string.uuid() as any;

      // Email
      case "email":
        return faker.internet.email() as any;

      // URL
      case "url":
        return faker.internet.url() as any;

      // Phone
      case "phone":
        return faker.phone.number() as any;

      // Name
      case "name":
        return faker.person.fullName() as any;

      // Address
      case "address":
        return faker.location.streetAddress() as any;

      // Paragraph
      case "paragraph":
        return faker.lorem.paragraph() as any;

      // Image
      case "image":
        return faker.image.avatar() as any;

      // IPv4
      case "ipv4":
        return faker.internet.ip() as any;

      // MAC Address
      case "mac":
        return faker.internet.mac() as any;

      // Hex Color
      case "hexColor":
        return faker.color.rgb({ prefix: "#" }) as any;

      // Currency
      case "currency":
        return faker.finance.currencyCode() as any;

      // Credit Card
      case "creditCard":
        return faker.finance.creditCardNumber() as any;

      // Job Title
      case "jobTitle":
        return faker.person.jobTitle() as any;

      // Object with nested properties
      case "object":
        const result: any = {};
        if (schema.properties) {
          for (const key in schema.properties) {
            const value = this.create(schema.properties[key]!);
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
        ) as any;

      default:
        return null as any;
    }
  }

  // Utility method to create multiple instances
  static createMultiple<T extends TypeSchema>(
    schema: T,
    count: number = 3,
  ): Array<InferSchemaType<T>> {
    return Array.from({ length: count }, () => this.create(schema));
  }
}

export default SchemaDemoFactory;
