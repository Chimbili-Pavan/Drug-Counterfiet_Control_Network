'use strict';

/**
 * This is a Node.JS application to update the status of a property on the network
 */

const helper = require('./contractHelper1');

/*var args = process.argv.slice(2);

let propertyID = args[0].toString();
let name = args[1].toString();
let aadharNo = args[2].toString();
let status = args[3].toString();*/

async function main(buyerCRN, sellerCRN, drugName, quantity) {

	try {
		const channel = await helper.getChannelInstance('./identity/distributorMSP','distributorMSP_ADMIN');

		console.log('.....Connecting to pharnet Smart Contract');
		const pharnetContract =  await channel.getContract('pharnet', 'org.pharma-network.com.pharnet.distributor');
		console.log("............... got the smart contract");

		console.log('............. creating Purchase Order on the Network');
		const newPoBuf = await pharnetContract.submitTransaction('createPO', buyerCRN, sellerCRN, drugName, quantity);
		console.log("........ submitted the transactoin ");
		// process response
		console.log('.....Processing create PO Response \n\n');
		console.log(" ......... newPoBuf is ",newPoBuf.toString());
		let newPo = JSON.parse(newPoBuf.toString());
		console.log(newPo);
		console.log('\n\n.....create PO Transaction Complete!');

		return newPo;

	} catch (error) {

		console.log(`\n\n ${error} \n\n`);
		throw new Error(error);

	} finally {

		// Disconnect from the fabric gateway
		helper.disconnect();

	}
}

/*main('DIST001', 'MAN001', 'Paracetamol', '03').then(() => {
	console.log('Create PO Request Submitted on the Network');
});*/

module.exports.execute = main;
