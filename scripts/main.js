import { getParks } from "./parks/ParkProvider.js";
import { ParkSelect } from "./parks/ParkSelect.js";


getParks().then(() => ParkSelect())