/**
 * Calculates the Expat/Nomad suitability score for a given condominium listing.
 * 
 * @param {Object} condo - The condo listing object.
 * @param {string} priority - The user's priority setting ('balanced', 'connectivity', 'leisure', 'focus').
 * @returns {Object} An object containing the overall score and the individual breakdown scores.
 */
export function calculateNomadScore(condo, priority = 'balanced') {
  if (!condo) {
    return {
      total: 0,
      wifi: 0,
      beach: 0,
      cclex: 0,
      quiet: 0,
    };
  }

  // 1. WiFi & Connectivity Score (100 Mbps -> 1.0, 600 Mbps -> 10.0)
  const wifiSpeed = condo.wifiSpeed || 100;
  const wifiScore = Math.max(1, Math.min(10, ((wifiSpeed - 100) / 500) * 9 + 1));

  // 2. Beach & Leisure Score (2m -> 10.0, 15m -> 6.0, maps values between 2 and 15)
  const beachMin = parseInt(condo.beachDist) || 15;
  const beachScore = Math.max(1, Math.min(10, 10 - ((beachMin - 2) / 13) * 4));

  // 3. City Commute via CCLEX Bridge (4m -> 10.0, 12m -> 6.0, maps values between 4 and 12)
  const cclexMin = parseInt(condo.cclexDist) || 12;
  const cclexScore = Math.max(1, Math.min(10, 10 - ((cclexMin - 4) / 8) * 4));

  // 4. Quiet & Work Environment Focus Score (Derived from architecture/title/type)
  let quietScore = 8.0;
  const title = condo.title.toUpperCase();
  if (title.includes('PENTHOUSE')) {
    quietScore = 9.8; // High elevation, far from street level
  } else if (title.includes('LOFT')) {
    quietScore = 9.2; // Double height, spacious volume
  } else if (title.includes('OBSIDIAN')) {
    quietScore = 9.0; // Premium noise-canceling glazing
  } else if (title.includes('STUDIO')) {
    quietScore = 8.2; // Cozier, slightly more shared wall exposure
  } else if (title.includes('VILLA')) {
    quietScore = 8.8; // Private land boundary but ground level
  }

  // Apply weights depending on selected priority
  let weights = { wifi: 0.3, beach: 0.3, cclex: 0.2, quiet: 0.2 }; // Balanced default
  if (priority === 'connectivity') {
    weights = { wifi: 0.6, beach: 0.1, cclex: 0.15, quiet: 0.15 };
  } else if (priority === 'leisure') {
    weights = { wifi: 0.15, beach: 0.6, cclex: 0.1, quiet: 0.15 };
  } else if (priority === 'focus') {
    weights = { wifi: 0.2, beach: 0.1, cclex: 0.1, quiet: 0.6 };
  }

  const totalScore = 
    (wifiScore * weights.wifi) + 
    (beachScore * weights.beach) + 
    (cclexScore * weights.cclex) + 
    (quietScore * weights.quiet);

  return {
    total: parseFloat(totalScore.toFixed(1)),
    wifi: parseFloat(wifiScore.toFixed(1)),
    beach: parseFloat(beachScore.toFixed(1)),
    cclex: parseFloat(cclexScore.toFixed(1)),
    quiet: parseFloat(quietScore.toFixed(1)),
  };
}
