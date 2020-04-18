'use strict';

/**
 * This is a Node.JS application to recharge a users account
 */

const helper = require('./contractHelper1');

async function main(buyerCRN, drugName, listOfAssets,transporterCRN) {

	try {
		const channel = await helper.getChannelInstance('./identity/manufacturerMSP','manufacturerMSP_ADMIN');

		console.log('.....Connecting to pharnet Smart Contract');
		const pharnetContract =  await channel.getContract('pharnet', 'org.pharma-network.com.pharnet.manufacturer');


		console.log('.....Requesting to create shipment');
		const shipmentBuffer = await pharnetContract.submitTransaction('createShipment', buyerCRN, drugName, listOfAssets,transporterCRN);

		// process response
		console.log('.....Processing create shipment Transaction Response \n\n');
		let shipment = JSON.parse(shipmentBuffer.toString());
		console.log(shipment);
		console.log('\n\n..... Create shipment Transaction Complete!');
		return shipment;
		//console.log('\n\n..... create shipment Transaction Complete!');

	} catch (error) {

		console.log(`\n\n ${error} \n\n`);
		throw new Error(error);

	} finally {

		// Disconnect from the fabric gateway
		helper.disconnect();

	}
}

/*main('DIST001', 'Paracetamol', '001,002,003','TRA001').then(() => {
	console.log('Create Shipment Submitted on the Network');
});*/

module.exports.execute = main;
