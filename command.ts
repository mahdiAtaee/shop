import { config } from "dotenv";
config();
import "./infrastructure/connection/mongoose";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { create as UserFactory } from "./src/Factories/Mongo/UserFactory";
import { create as CategoryFactory } from "./src/Factories/Mongo/CategoryFactory";
import { create as ProductFactory } from "./src/Factories/Mongo/ProductFactory";
import { create as OrderFactory} from "./src/Factories/Mongo/OrderFactory";

yargs(hideBin(process.argv))
  .command(
    "factory [model]",
    "Run model factory",
    (yargs) => {
      return yargs.positional("model", {
        describe: "model to bind on",
      });
    },
    (argv) => {
      if (argv.model) {
        console.log(`create model ${argv.model} ${argv.count}`);
        switch (argv.model) {
          case "user":
            UserFactory(argv.count as unknown as number)
              .then((data) => {
                console.log("create users successfully");
                process.exit();
              })
              .catch((error) => console.log(error.message));
            break;
          case "category":
            CategoryFactory(argv.count as unknown as number)
              .then((data) => {
                console.log("create categories successfully");
                process.exit();
              })
              .catch((error) => console.log(error.message));
            break;
          case "product":
            ProductFactory(argv.count as unknown as number)
              .then((data) => {
                console.log("create product successfully");
                process.exit();
              })
              .catch((error) => console.log(error.message));
            break;
          case "order":
            OrderFactory(argv.count as unknown as number)
              .then((data) => {
                console.log("create orders successfully");
                process.exit();
              })
              .catch((error) => console.log(error.message));
            break;

          default:
            break;
        }
      }
    }
  )
  .option("count", {
    alias: "-c",
    type: "number",
    description: "count of records must be created",
  })
  .parse();
