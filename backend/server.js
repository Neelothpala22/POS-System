const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
require("colors");
const connectDb = require("./config/config");

// dotenv config
dotenv.config();

// db config
connectDb();

// rest object
const app = express();

app.use(cors({ origin: "*" }));

// middlewares
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan("dev"));

// Import routes using require
const eventsRoute = require('./routers/eventsRoute.js');
const eventPlannerRoute = require('./routers/eventPlannerRoute.js');
const istockRouter = require('./routers/InventorySockRoute.js');
const iorderRouter = require('./routers/InventoryOrderRoute.js');
const fincome = require('./routers/FinanceIncomeState.js');
const fpettycash = require('./routers/FinancePettyCash.js');
const SupRouter = require('./routers/supply.js');
const SupManRouter = require('./routers/manager.js');
const customerRouter = require('./routers/customers.js');
const roomRouter = require('./routers/rooms.js');
const EmployeeRouter = require('./routers/Employees.js');
const LeaveRouter = require('./routers/Leaves.js');
const itemRoutes = require('./routers/itemRoutes.js');
const userRoutes = require('./routers/userRoutes.js');
const billsRoutes = require('./routers/billsRoutes.js');
const ResitemRoutes = require('./routers/ResitemRoutes.js');
const ResbillsRoutes = require('./routers/ResbillsRoutes.js');
const tableRoutes = require('./routers/tableRoutes.js');
const orderRouters = require('./routers/orderRoutes.js');
const menuRouters = require('./routers/menuRoutes.js');

/// API Routes


// Event Management
app.use('/events', eventsRoute);
app.use('/eventplanners', eventPlannerRoute);

// Inventory Management
app.use('/api/inventory/stocks', istockRouter);
app.use('/api/inventory/orders', iorderRouter);

// Finance Management
app.use("/finance/income", fincome);
app.use("/finance/pettycash", fpettycash);

// Supply Management
app.use("/api/supply", SupRouter);
app.use("/api/managers", SupManRouter);

// Customer Management
app.use("/customer", customerRouter);
app.use("/room", roomRouter);

// Employee Management
app.use('/employee', EmployeeRouter);

// Leave Management
app.use('/leave', LeaveRouter);

// Bar Management
app.use("/api/items", itemRoutes);
app.use("/api/users", userRoutes);
app.use("/api/bills", billsRoutes);

// Restaurant Management
app.use("/api/Res/res-items", ResitemRoutes);
app.use("/api/Res/res-bills", ResbillsRoutes);
app.use("/api/Res/tables", tableRoutes);
app.use("/api/Res/res-orders", orderRouters);
app.use("/api/Res/menu", menuRouters);

// port
const PORT = process.env.PORT || 8080;

// listen
app.listen(PORT, () => {
  console.log(`Server Running On Port ${PORT}`.bgCyan.white);
});