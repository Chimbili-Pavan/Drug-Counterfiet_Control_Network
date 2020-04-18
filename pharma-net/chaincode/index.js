'use strict';

const pharnetManufacturercontract = require('./manufacturer.js');
const pharnetDistributorcontract = require('./distributor.js');
const pharnetRetailercontract = require('./retailer.js');
const pharnetTransportercontract = require('./transporter.js');
module.exports.contracts = [pharnetManufacturercontract,pharnetDistributorcontract,pharnetRetailercontract,pharnetTransportercontract];
