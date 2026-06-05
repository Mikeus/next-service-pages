# Configuration Reference

The entire site is driven by a single typed `ServiceConfig` object in `lib/config/site.config.ts`. All fields are validated at startup via Zod (`ServiceConfigSchema` in `lib/schemas/service-config.ts`).

## Quick swap

Replace the default config or merge overrides:

```typescript
import { createServiceConfig } from '@/lib/config';
import plumbingConfig from '../../examples/plumbing/service.config';

export const siteConfig = createServiceConfig(plumbingConfig);
```

See ready-made examples in [`examples/`](../examples/).

## ServiceConfig fields

### Identity

| Field          | Type     | Required | Description                                                         |
| -------------- | -------- | -------- | ------------------------------------------------------------------- |
| `businessName` | `string` | Yes      | Legal or brand name shown in headers, metadata, and CTAs            |
| `serviceType`  | `string` | Yes      | Service category noun (e.g. `plumbing`, `tutoring`, `pet grooming`) |
| `serviceVerb`  | `string` | Yes      | Role noun for copy (e.g. `plumber`, `tutor`, `dog groomer`)         |
| `phone`        | `string` | Yes      | Primary contact phone (min 7 characters)                            |
| `email`        | `string` | Yes      | Valid email address                                                 |

### `serviceArea`

| Field         | Type           | Required | Description                          |
| ------------- | -------------- | -------- | ------------------------------------ |
| `primaryCity` | `string`       | Yes      | Display name of main service city    |
| `state`       | `string`       | Yes      | Two-letter US state code (e.g. `TX`) |
| `cities`      | `CityConfig[]` | Yes      | Array of city landing pages (min 1)  |

#### `CityConfig`

| Field    | Type     | Required | Description                                          |
| -------- | -------- | -------- | ---------------------------------------------------- |
| `slug`   | `string` | Yes      | URL slug — lowercase, hyphenated (e.g. `round-rock`) |
| `name`   | `string` | Yes      | Display name (e.g. `Round Rock`)                     |
| `county` | `string` | No       | County name for FAQ interpolation                    |
| `lat`    | `number` | No       | Latitude (-90 to 90)                                 |
| `lng`    | `number` | No       | Longitude (-180 to 180)                              |

### `pricing` (optional)

| Field        | Type     | Description                                       |
| ------------ | -------- | ------------------------------------------------- |
| `startingAt` | `number` | Starting price (positive number)                  |
| `currency`   | `string` | ISO 4217 code (3 letters, e.g. `USD`)             |
| `unit`       | `string` | Pricing unit label (e.g. `per visit`, `per hour`) |

### `seo`

| Field                | Type     | Description                                            |
| -------------------- | -------- | ------------------------------------------------------ |
| `titleTemplate`      | `string` | Page title template — `%s` is replaced with page title |
| `defaultDescription` | `string` | Site-wide meta description default                     |
| `ogImage`            | `string` | Open Graph image path (e.g. `/og-default.jpg`)         |

### `features`

| Field           | Type      | Description                             |
| --------------- | --------- | --------------------------------------- |
| `aiBlog`        | `boolean` | Enable `POST /api/blog/generate`        |
| `onlineBooking` | `boolean` | Enable `POST /api/booking`              |
| `cityPages`     | `boolean` | Generate static city pages at `/[city]` |

### Content arrays

| Field      | Type                | Description                                                     |
| ---------- | ------------------- | --------------------------------------------------------------- |
| `services` | `ServiceOffering[]` | Service cards on city pages (`title`, `description`)            |
| `whyUs`    | `WhyUsPoint[]`      | Trust bullets on city pages                                     |
| `faqs`     | `FAQEntry[]`        | FAQ entries with `{{cityName}}`, `{{phone}}`, etc. placeholders |

## FAQ placeholders

Available in `faqs[].question` and `faqs[].answer`:

| Placeholder        | Value              |
| ------------------ | ------------------ |
| `{{cityName}}`     | City display name  |
| `{{citySlug}}`     | URL slug           |
| `{{county}}`       | County or fallback |
| `{{state}}`        | State code         |
| `{{businessName}}` | Business name      |
| `{{serviceType}}`  | Service type       |
| `{{serviceVerb}}`  | Service verb       |
| `{{phone}}`        | Phone number       |

## Environment variables

See [AI Setup](./ai-setup.md) and [Deployment](./deployment.md) for env configuration. Reference template: [`.env.example`](../.env.example).

## Validation

Invalid config throws at build/runtime with a Zod error message. Run `npm run typecheck` after editing config to catch type errors early.
