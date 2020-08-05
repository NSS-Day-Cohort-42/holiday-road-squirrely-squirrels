import { getParks, useParks } from './parks/ParkProvider.js';

getParks()
.then(() => {
  const parks = useParks()
  debugger;
})
