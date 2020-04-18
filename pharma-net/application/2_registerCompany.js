'use strict';

/**
 * This is a Node.JS application to request to create a New User on the Network
 */

const helper = require('./contractHelper1');

async function main(companyCRN, companyName, location, organisationRole, org) {

	try {
		let path = './identity/';
		let userName = null;
		let contract = 'org.pharma-network.com.pharnet.';

		if(org == 'Manufacturer'){
			path += 'manufacturerMSP';
			userName = 'manufacturerMSP_ADMIN';
			contract += 'manufacturer';
		}
		else if (org == 'Distributor'){
			path += 'distributorMSP';
			userName = 'distributorMSP_ADMIN';
			contract += 'distributor';
		}
		else if(org  == 'Retailer'){
			path += 'retailerMSP';
			userName = 'retailerMSP_ADMIN';
			contract += 'retailer';
		}
		else {
			path += 'transporterMSP';
			userName = 'transporterMSP_ADMIN';
			contract += 'transporter';
		}

		const channel = await helper.getChannelInstance(path,userName);

		console.log('.....Connecting to pharnet Smart Contract');
		const pharnetContract =  await channel.getContract('pharnet', contract);


		console.log('.....Requesting to regisster New Company on the Network');
		const newCompanyBuffer = await pharnetContract.submitTransaction('registerCompany', companyCRN, companyName, location, organisationRole);

		// process response
		console.log('.....Processing register new company Transaction Response \n\n');
		let company = JSON.parse(newCompanyBuffer.toString());
		console.log(company);
		console.log('\n\n.....Register New Company Transaction Complete!');
		return company;

	} catch (error) {

		console.log(`\n\n ${error} \n\n`);
		throw new Error(error);

	} finally {

		// Disconnect from the fabric gateway
		console.log("   Dis-connecting from fabric network ");
		helper.disconnect();

	}
}

/*main('TRA001', 'FedEx', 'Delhi', '.').then(() => {
	console.log('New User Request Submitted on the Network');
});*/

module.exports.execute = main;
