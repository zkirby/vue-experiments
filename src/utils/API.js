export function getStockDataForTimeFrameMarker() {
  //export function getStockDataForTimeFrameMarker(marker, timeframe) {
  //return fetch(
  //   `https://financialmodelingprep.com/api/v3/historical-chart/${timeframe}/${marker}`
  //);
  return new Promise(res =>
    res([
      /* {
        date: "2020-03-02 15:59:00",
        open: 297.23,
        low: 297.23,
        high: 298.28,
        close: 298.2523,
        volume: 78679246
      },
      {
        date: "2020-03-02 15:55:00",
        open: 295.1446,
        low: 295.11,
        high: 297.1,
        close: 297.1,
        volume: 76202093
      }*/
    ])
  );
}
