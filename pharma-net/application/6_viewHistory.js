'use strict';

/**
 * This is a Node.JS application to view a property registered on the network
 */

const helper = require('./contractHelper1');

/*var args = process.argv.slice(2);

let propertyID = args[0].toString();*/


async function main(drugName, serialNo) {

	try {
		const channel = await helper.getChannelInstance('./identity/manufacturerMSP','manufacturerMSP_ADMIN');

		console.log('.....Connecting to pharnet Smart Contract');
		const pharnetContract =  await channel.getContract('pharnet', 'org.pharma-network.com.pharnet.manufacturer');


		console.log('.....Requesting to view a history of drug on the Network');
		const historyBuffer = await pharnetContract.submitTransaction('viewHistory', drugName, serialNo);

		// process response
		console.log('.....Processing View History Transaction Response \n\n');
		let history = JSON.parse(historyBuffer.toString());
		console.log(history);
		console.log('\n\n.....View History Transaction Complete!');
		return history;

	} catch (error) {

		console.log(`\n\n ${error} \n\n`);
		throw new Error(error);

	} finally {

		// Disconnect from the fabric gateway
		helper.disconnect();

	}
}

/*main(propertyID).then(() => {
	console.log('View Property Submitted on the Network');
});*/

module.exports.execute = main;
