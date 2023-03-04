const app = require("./app");
require("dotenv").config();
require("./Config/DbConnection");
const PORT = process.env.PORT || 4001;



app.listen(PORT, () => {
    console.log(`App is runnig at http://localhost:${PORT}`)
});