const fs = require('fs');
const yaml = require('js-yaml');
const { FileSystemWallet, Gateway } = require('fabric-network');
let gateway;


async function getChannelInstance(path,userName) {

	// A gateway defines which peer is used to access Fabric network
	// It uses a common connection profile (CCP) to connect to a Fabric Peer
	// A CCP is defined manually in file connection-profile-iit.yaml
	gateway = new Gateway();

	// A wallet is where the credentials to be used for this transaction exist
	// Credentials for user USERS_ADMIN was initially added to this wallet.
	const wallet = new FileSystemWallet(path);

	// What is the username of this Client user accessing the network?
	const fabricUserName = userName;

	let connectionPath = './connection-profile';

	if(userName == 'manufacturerMSP_ADMIN'){
		connectionPath = connectionPath+'-manufacturer.yaml';
	}
	else if(userName == 'distributorMSP_ADMIN'){
		connectionPath = connectionPath+'-distributor.yaml';
	}
	else if(userName == 'retailerMSP_ADMIN'){
		connectionPath = connectionPath+'-retailer.yaml';
	}
	else if(userName == 'transporterMSP_ADMIN'){
		connectionPath = connectionPath+'-transporter.yaml';
	}
	else{
		connectionPath = connectionPath+'-consumer.yaml';
	}

	// Load connection profile; will be used to locate a gateway; The CCP is converted from YAML to JSON.
	let connectionProfile = yaml.safeLoad(fs.readFileSync(connectionPath, 'utf8'));

	// Set connection options; identity and wallet
	let connectionOptions = {
		wallet: wallet,
		identity: fabricUserName,
		discovery: { enabled: false, asLocalhost: true }
	};

	// Connect to gateway using specified parameters
	console.log('.....Connecting to Fabric Gateway');
	await gateway.connect(connectionProfile, connectionOptions);

	// Access property registration channel
	console.log('.....Connecting to channel - pharmachannel');
	let channel = await gateway.getNetwork('pharmachannel');

  return channel;

	}

function disconnect() {
	console.log('.....Disconnecting from Fabric Gateway');
	gateway.disconnect();
}

module.exports.getChannelInstance = getChannelInstance;
module.exports.disconnect = disconnect;
