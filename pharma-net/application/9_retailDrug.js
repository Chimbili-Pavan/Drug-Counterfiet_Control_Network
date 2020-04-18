'use strict';

/**
 * This is a Node.JS application to update the status of a property on the network
 */

const helper = require('./contractHelper1');

/*var args = process.argv.slice(2);

let propertyID = args[0].toString();
let name = args[1].toString();
let aadharNo = args[2].toString();*/

async function main(drugName, serialNo, retailerCRN, customerAadhar) {

	try {
		const channel = await helper.getChannelInstance('./identity/retailerMSP','retailerMSP_ADMIN');

		console.log('.....Connecting to pharnet Smart Contract');
		const pharnetContract =  await channel.getContract('pharnet', 'org.pharma-network.com.pharnet.retailer');


		console.log('.....Retailing a Drug on the Network');
		const drugBUf = await pharnetContract.submitTransaction('retailDrug', drugName, serialNo, retailerCRN, customerAadhar);

		// process response
		console.log('.....Processing retal drug Transaction Response \n\n');
		let drug = JSON.parse(drugBuf.toString());
		console.log(drug);
		console.log('\n\n.....retail drug Transaction Complete!');

	} catch (error) {

		console.log(`\n\n ${error} \n\n`);
		throw new Error(error);

	} finally {

		// Disconnect from the fabric gateway
		helper.disconnect();

	}
}

/*main(propertyID, name, aadharNo).then(() => {
	console.log('Purchase Property Request Submitted on the Network');
});*/

module.exports.execute = main;
