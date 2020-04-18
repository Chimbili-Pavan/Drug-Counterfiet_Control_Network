'use strict';

/**
 * This is a Node.JS application to update the status of a property on the network
 */

const helper = require('./contractHelper1');

/*var args = process.argv.slice(2);

let propertyID = args[0].toString();
let name = args[1].toString();
let aadharNo = args[2].toString();*/

async function main(buyerCRN, drugName, transporterCRN) {

	try {
		const channel = await helper.getChannelInstance('./identity/transporterMSP','transporterMSP_ADMIN');

		console.log('.....Connecting to pharnet Smart Contract');
		const pharnetContract =  await channel.getContract('pharnet', 'org.pharma-network.com.pharnet.transporter');

		console.log('.....Updating a shipment on the Network');
		await pharnetContract.submitTransaction('updateShipment', buyerCRN, drugName, transporterCRN);

		// process response
		console.log('.....Processing update Shipment Transaction Response \n\n');
		console.log('\n\n.....Purchase Property Transaction Complete!');

	} catch (error) {

		console.log(`\n\n ${error} \n\n`);
		throw new Error(error);

	} finally {

		// Disconnect from the fabric gateway
		helper.disconnect();

	}
}

/*main('DIST001', 'Paracetamol', 'TRA001').then(() => {
	console.log('Update Shipment Request Submitted on the Network');
});*/

module.exports.execute = main;
