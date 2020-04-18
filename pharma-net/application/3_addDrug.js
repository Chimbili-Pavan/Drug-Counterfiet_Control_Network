'use strict';

/**
 * This is a Node.JS application to View a User on the Network
 */

const helper = require('./contractHelper1');

/*var args = process.argv.slice(2);

let name = args[0].toString();
let aadharNo = args[1].toString();*/

async function main(drugName, serialNo, mgfDate, expDate, companyCRN) {

	try {

		const channel = await helper.getChannelInstance('./identity/manufacturerMSP','manufacturerMSP_ADMIN');

		//const regnetContract = await helper.getContractInstance();
		console.log('.....Connecting to pharnet Smart Contract');
		const pharnetContract =  await channel.getContract('pharnet', 'org.pharma-network.com.pharnet.manufacturer');


		console.log('.....Requesting to create a New Drug on the Network');
		const DrugBuffer = await pharnetContract.submitTransaction('addDrug', drugName, serialNo, mgfDate, expDate, companyCRN);

		// process response
		console.log('.....Processing add Drug Transaction Response \n\n');
		let drug = JSON.parse(DrugBuffer.toString());
		console.log(drug);
		console.log('\n\n.....View User Transaction Complete!');
		return drug;

	} catch (error) {

		console.log(`\n\n ${error} \n\n`);
		throw new Error(error);

	} finally {

		// Disconnect from the fabric gateway
		helper.disconnect();

	}
}

/*main('crocin', '01', '06042020', '07042020', '01').then(() => {
	console.log('View User Request Submitted on the Network');
});*/

module.exports.execute = main;
