/**
 * Simulated network delay so screens exercise real loading states even
 * though the data underneath is static. Bump to 0 during development if
 * the artificial latency gets in the way.
 */
const DEFAULT_DELAY_MS = 250;

export function wait(ms: number = DEFAULT_DELAY_MS): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
