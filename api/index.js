const express = require('express');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const path = require('path');
const cors = require('cors'); 

const swaggerDocument = YAML.load(path.join(__dirname, 'swagger.yaml'));

const app = express();


app.use(cors());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const port = process.env.PORT || 8800;
app.listen(port, () => {
  console.log(`O servidor está em execução na porta ${port}`);
});
