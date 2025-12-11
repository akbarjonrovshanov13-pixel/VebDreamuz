import { cn, formatDate, generateSlug, truncateText, calculateReadTime } from '@/lib/utils';

describe('Utils', () => {
  describe('cn (classNames)', () => {
    it('should merge class names correctly', () => {
      const result = cn('text-white', 'bg-black');
      expect(result).toBe('text-white bg-black');
    });

    it('should handle conditional classes', () => {
      const isActive = true;
      const result = cn('base-class', isActive && 'active-class');
      expect(result).toContain('active-class');
    });

    it('should handle undefined values', () => {
      const result = cn('base', undefined, 'end');
      expect(result).toBe('base end');
    });
  });

  describe('formatDate', () => {
    it('should format date correctly', () => {
      const date = new Date('2024-01-15');
      const result = formatDate(date);
      expect(result).toBeTruthy();
      expect(typeof result).toBe('string');
    });
  });

  describe('generateSlug', () => {
    it('should convert text to slug format', () => {
      const result = generateSlug('Hello World');
      expect(result).toContain('hello-world');
    });

    it('should remove special characters', () => {
      const result = generateSlug("What's New?");
      expect(result).not.toContain("'");
      expect(result).not.toContain('?');
    });
  });

  describe('truncateText', () => {
    it('should truncate long text', () => {
      const longText = 'This is a very long text that should be truncated';
      const result = truncateText(longText, 20);
      expect(result.length).toBeLessThanOrEqual(23); // 20 + "..."
      expect(result).toContain('...');
    });

    it('should not truncate short text', () => {
      const shortText = 'Short';
      const result = truncateText(shortText, 20);
      expect(result).toBe('Short');
    });
  });

  describe('calculateReadTime', () => {
    it('should calculate read time based on word count', () => {
      const content = 'word '.repeat(200); // 200 words = 1 minute
      const result = calculateReadTime(content);
      expect(result).toBeGreaterThanOrEqual(1);
    });

    it('should return at least 1 minute for short content', () => {
      const content = 'Short content';
      const result = calculateReadTime(content);
      expect(result).toBeGreaterThanOrEqual(1);
    });
  });
});

