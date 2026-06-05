import { describe, expect, it } from 'vitest';
import { formatCityName, slugify } from '@/lib/utils';

describe('slugify', () => {
  it('converts text to URL-safe slugs', () => {
    expect(slugify('Austin, TX')).toBe('austin-tx');
    expect(slugify('  Pet Grooming  ')).toBe('pet-grooming');
  });
});

describe('formatCityName', () => {
  it('formats city slugs into display names', () => {
    expect(formatCityName('san-antonio')).toBe('San Antonio');
    expect(formatCityName('austin')).toBe('Austin');
  });
});
