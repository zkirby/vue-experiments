export function getStockDataForTimeFrameMarker(marker, timeframe) {
  return fetch(
    `https://financialmodelingprep.com/api/v3/historical-chart/${timeframe}/${marker}`
  );
}
