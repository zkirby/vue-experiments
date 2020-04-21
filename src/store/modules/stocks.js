export const stockModule = {
	state: {
		// marker -> timeframe -> date -> data
		stockData: {},
		currMarker: "",
		currTimeframe: "",
	},
	mutations: {
	 addDataForTimeFrame(marker, timeframe, data) {
	 	stockData[marker] = {
			...(stockData[marker] || []),
			[timeframe]: {
				...((stockData[marker] || [])[timeframe] || []),
				...data,
			},
		};
	},
	actions: {
		async addStockDataForMarker({ state, commit }, { timeframe, marker }) {
			if (!state[marker] || !state[marker][timeframe]) {
					const rawData = await API.getTimeframeDataForMarker(marker, timeframe);
				  const data = rawData.map(({date, close}) => ({date: {date, close}}));
					commit('addDataForTimeFrame', marker, timeframe, data);
			}
		},
	getters: {
		getStockDataForMarker(state) {
		  const m = state.stockData[state.currMarker];
		}
	}
}
