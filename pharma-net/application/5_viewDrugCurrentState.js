'use strict';

/**
 * This is a Node.JS application to request a new property to be registered on the network
 */

const helper = require('./contractHelper1');

/*var args = process.argv.slice(2);

let name = args[0].toString();
let aadharNo = args[1].toString();
let propertyID = args[2].toString();
let price = args[3].toString();*/

async function main(drugName, serialNo) {

	try {
		const channel = await helper.getChannelInstance('./identity/manufacturerMSP','manufacturerMSP_ADMIN');

		console.log('.....Connecting to pharnet Smart Contract');
		const pharnetContract =  await channel.getContract('pharnet', 'org.pharma-network.com.pharnet.manufacturer');


		console.log('.....Requesting to view current state of the Drug on the Network');
		const drugBuffer = await pharnetContract.submitTransaction('viewDrugCurrentState', drugName, serialNo);

		// process response
		console.log('.....Processing viewDrugCurrentState Transaction Response \n\n');
		let drug = JSON.parse(drugBuffer.toString());
		console.log(drug);
		console.log('\n\n.....view Drug current state Transaction Complete!');
		return drug;

	} catch (error) {

		console.log(`\n\n ${error} \n\n`);
		throw new Error(error);

	} finally {

		// Disconnect from the fabric gateway
		helper.disconnect();

	}
}

/*main(name, aadharNo, propertyID, price).then(() => {
	console.log('Property Registration Request Submitted on the Network');
});*/

module.exports.execute = main;
