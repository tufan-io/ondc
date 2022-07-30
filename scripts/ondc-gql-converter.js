const yaml = require("yaml");
const { createGraphQLSchema } = require("openapi-to-graphql");
const fs = require("fs");
const { printSchema } = require("graphql");

async function convert(yamlFile) {
  const openapi = yaml.parse(fs.readFileSync(yamlFile, "utf8"));
  const { schema } = await createGraphQLSchema(openapi);
  return schema;
}

if (require.main === module) {
  const yamlFile = process.argv[2];
  convert(yamlFile).then((schema) => {
    console.log(printSchema(schema));
  });
}
