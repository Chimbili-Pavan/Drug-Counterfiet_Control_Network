const express = require('express');
const app = express();
const cors = require('cors');
const port = 3000;

// Import all function modules

const addToWallet = require('./1_addToWallet');
const registerCompany = require('./2_registerCompany');
const addDrug = require('./3_addDrug');
const createShipment = require('./4_createShipment');
const viewDrugCurrentState = require('./5_viewDrugCurrentState');
const viewHistory = require('./6_viewHistory');
const createPO = require('./7_createPO');
const updateShipment = require('./8_updateShipment');
const retailDrug = require('./9_retailDrug');

// Define Express app settings
app.use(cors());
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.set('title', 'Pharma Network App');

app.get('/', (req, res) => res.send('Hello User'));

app.post('/addToWallet', (req, res) => {
    addToWallet.execute(req.body.certificatePath.toString(), req.body.privateKeyPath.toString(), req.body.org).then(() => {
        console.log('User Credentials added to wallet');
        const result = {
            status: 'success',
            message: 'User credentials added to wallet'
        };
        res.json(result);
    })
    .catch((e) => {
        const result = {
            status: 'error',
            message: 'Failed',
            error: e
        };
        res.status(500).send(result);
    });
});

app.post('/registerCompany', (req, res) => {
    registerCompany.execute(req.body.companyCRN, req.body.companyName, req.body.location, req.body.organisationRole, req.body.org).then(() => {
        console.log('Register Company Request submitted on the Network');
        const result = {
            status: 'success',
            message: 'Register Company Request submitted on the Network'
        };
        res.json(result);
    })
    .catch((e) => {
        const result = {
            status: 'error',
            message: 'Failed',
            error: e
        };
        res.status(500).send(result);
    });
});

app.post('/addDrug', (req,res) => {
    addDrug.execute(req.body.drugName, req.body.serialNo, req.body.mfgDate, req.body.expDate, req.body.companyCRN).then(() => {
        console.log('Add Drug Request submitted on the Network');
        const result = {
            status: 'success',
            message: 'Add Drug Request submitted on the Network'
        };
        res.json(result);
    })
    .catch((e) => {
        const result = {
            status: 'error',
            message: 'Failed',
            error: e
        };
        res.status(500).send(result);
    });
});

app.post('/createShipment', (req,res) => {
    createShipment.execute(req.body.buyerCRN, req.body.drugName, req.body.listOfAssets, req.body.transporterCRN).then(() => {
        console.log('Create Shipment Request submitted on the Network');
        const result = {
            status: 'success',
            message: 'Create Shipment Request submitted on the Network'
        };
        res.json(result);
    })
    .catch((e) => {
        const result = {
            status: 'error',
            message: 'Failed',
            error: e
        };
        res.status(500).send(result);
    });
});

app.post('/viewDrugCurrentState', (req,res) => {
    viewDrugCurrentState.execute(req.body.drugName, req.body.serialNo).then(() => {
        console.log('view Drug CurrentState Request submitted on the Network');
        const result = {
            status: 'success',
            message: 'view Drug CurrentState Request submitted on the Network'
        };
        res.json(result);
    })
    .catch((e) => {
        const result = {
            status: 'error',
            message: 'Failed',
            error: e
        };
        res.status(500).send(result);
    });
});

app.post('/viewHistory', (req,res) => {
    viewHistory.execute(req.body.drugName, req.body.serialNo).then(() => {
        console.log('View History Request submitted on the Network');
        const result = {
            status: 'success',
            message: 'View History Request submitted on the Network'
        };
        res.json(result);
    })
    .catch((e) => {
        const result = {
            status: 'error',
            message: 'Failed',
            error: e
        };
        res.status(500).send(result);
    });
});

app.post('/createPO', (req,res) => {
    createPO.execute(req.body.buyerCRN, req.body.sellerCRN, req.body.drugName,req.body.quantity).then(() => {
        console.log('CreatePO Request submitted on the Network');
        const result = {
            status: 'success',
            message: 'createPO Request submitted on the Network'
        };
        res.json(result);
    })
    .catch((e) => {
        const result = {
            status: 'error',
            message: 'Failed',
            error: e
        };
        res.status(500).send(result);
    });
});

app.post('/updateShipment', (req,res) => {
    updateShipment.execute(req.body.buyerCRN, req.body.drugName, req.body.transporterCRN).then(() => {
        console.log('Update Shipment Request submitted on the Network');
        const result = {
            status: 'success',
            message: 'Update Shipment Request submitted on the Network'
        };
        res.json(result);
    })
    .catch((e) => {
        const result = {
            status: 'error',
            message: 'Failed',
            error: e
        };
        res.status(500).send(result);
    });
});

app.post('/retailDrug', (req,res) => {
    retailDrug.execute(req.body.drugName, req.body.serialNo, req.body.retailerCRN, req.body.customerAadhar).then(() => {
        console.log('retailDrug Request submitted on the Network');
        const result = {
            status: 'success',
            message: 'retailDrug Request submitted on the Network'
        };
        res.json(result);
    })
    .catch((e) => {
        const result = {
            status: 'error',
            message: 'Failed',
            error: e
        };
        res.status(500).send(result);
    });
});


app.listen(port, () => console.log(`Distributed User App listening on port ${port}!`));
