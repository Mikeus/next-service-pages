import type { ZodError, ZodSchema } from 'zod';

export interface ApiErrorBody {
  error: string;
  details?: Array<{ path: string; message: string }>;
}

export function formatZodIssues(error: ZodError): NonNullable<ApiErrorBody['details']> {
  return error.issues.map((issue) => ({
    path: issue.path.join('.'),
    message: issue.message,
  }));
}

export async function parseRequestJson(request: Request): Promise<unknown | null> {
  return request.json().catch(() => null);
}

export type ParseBodyResult<T> =
  | { success: true; data: T }
  | { success: false; error: ApiErrorBody; status: number };

export async function parseRequestBody<T>(
  request: Request,
  schema: ZodSchema<T>,
): Promise<ParseBodyResult<T>> {
  const body = await parseRequestJson(request);

  if (body === null) {
    return {
      success: false,
      error: { error: 'Invalid JSON request body' },
      status: 400,
    };
  }

  const parsed = schema.safeParse(body);

  if (!parsed.success) {
    return {
      success: false,
      error: {
        error: 'Validation failed',
        details: formatZodIssues(parsed.error),
      },
      status: 422,
    };
  }

  return { success: true, data: parsed.data };
}
