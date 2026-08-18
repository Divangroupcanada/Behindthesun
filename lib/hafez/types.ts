export interface Beyt { m1: string; m2: string }

export interface Ghazal {
  /** Number in the Qazvini–Ghani ordering. */
  n: number;
  beyts: Beyt[];
  /** Editorial themes, used for search and for grounding the reading. */
  themes: string[];
  /** Whether the Persian text has been proofread against a print edition. */
  verified: boolean;
}
