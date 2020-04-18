# SSH into the CLI container
#docker exec -it cli /bin/bash

echo $'                                             \n  '
echo $'                                             \n  '

echo $'  --------  Creating the channel  ---------- \n'
# create the channel from the peer0 of manufactuere Organization
peer channel create -o orderer.pharma-network.com:7050 -c pharmachannel -f ./channel-artifacts/channel.tx   // create the channel from peer0 of manufacturer, since by default cli points to peer0 of manufacturer

echo $' ******   *****\n  '
echo $'  ------ created channel from peer0 of manufacturer org  -------\n'

######## Join the channel ##########
# peer1 of manufacturer org joined the channel
peer channel join -b pharmachannel.block
echo $'                                             \n  '
echo $'                                             \n  '
echo $'  ------ peer0.manufacturer has joined the channel  -------\n'

 # peer1 of manufacturer org joined the channel
CORE_PEER_ADDRESS=peer1.manufacturer.pharma-network.com:8051
peer channel join -b pharmachannel.block

echo $'                                             \n  '
echo $'                                             \n  '
echo $'  ------ peer1.manufacturer has joined the channel  -------\n'


# CLI pointed to peer0  of distributor org and then it joined the channel
CORE_PEER_LOCALMSPID="distributorMSP"
CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/distributor.pharma-network.com/users/Admin@distributor.pharma-network.com/msp
CORE_PEER_ADDRESS=peer0.distributor.pharma-network.com:9051
peer channel join -b pharmachannel.block

echo $'                                             \n  '
echo $'                                             \n  '
echo $'  ------ peer0.distributor has joined the channel  -------\n'


# CLI pointed to peer1  of distributor org and then it joined the channel
CORE_PEER_ADDRESS=peer1.distributor.pharma-network.com:10051
peer channel join -b pharmachannel.block

echo $'                                             \n  '
echo $'                                             \n  '
echo $'  ------ peer1.distributor has joined the channel  -------\n'


# CLI pointed to peer0  of retailer org and then it joined the channel
CORE_PEER_LOCALMSPID="retailerMSP"
CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/retailer.pharma-network.com/users/Admin@retailer.pharma-network.com/msp
CORE_PEER_ADDRESS=peer0.retailer.pharma-network.com:11051
peer channel join -b pharmachannel.block

echo $'                                             \n  '
echo $'                                             \n  '
echo $'  ------ peer0.retailer has joined the channel  -------\n'


# CLI pointed to peer1  of retailer org and then it joined the channel
CORE_PEER_ADDRESS=peer1.retailer.pharma-network.com:12051
peer channel join -b pharmachannel.block

echo $'                                             \n  '
echo $'                                             \n  '
echo $'  ------ peer1.retailer has joined the channel  -------\n'


# CLI pointed to peer0  of consumer org and then it joined the channel
CORE_PEER_LOCALMSPID="consumerMSP"
CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/consumer.pharma-network.com/users/Admin@consumer.pharma-network.com/msp
CORE_PEER_ADDRESS=peer0.consumer.pharma-network.com:13051
peer channel join -b pharmachannel.block

echo $'                                             \n  '
echo $'                                             \n  '
echo $'  ------ peer0.consumer has joined the channel  -------\n'


# CLI pointed to peer1  of consumer org and then it joined the channel
CORE_PEER_ADDRESS=peer1.consumer.pharma-network.com:14051
peer channel join -b pharmachannel.block

echo $'                                             \n  '
echo $'                                             \n  '
echo $'  ------ peer1.consumer has joined the channel  -------\n'


# CLI pointed to peer0  of transporter org and then it joined the channel
CORE_PEER_LOCALMSPID="transporterMSP"
CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/transporter.pharma-network.com/users/Admin@transporter.pharma-network.com/msp
CORE_PEER_ADDRESS=peer0.transporter.pharma-network.com:15051
peer channel join -b pharmachannel.block

echo $'                                             \n  '
echo $'                                             \n  '
echo $'  ------ peer0.transporter has joined the channel  -------\n'


# CLI pointed to peer1  of transporter org and then it joined the channel
CORE_PEER_ADDRESS=peer1.transporter.pharma-network.com:16051
peer channel join -b pharmachannel.block

echo $'                                             \n  '
echo $'                                             \n  '
echo $'  ------ peer1.transporter has joined the channel  -------\n'


######## Anchor peer supdate #####

echo $'                                             \n  '
echo $'                                             \n  '
echo $' ******   *****\n  '
echo $'  ------ Updating the Anchor peers  -------\n'


# update peer0 of manufacturer org as anchor peer for manufacturer org
CORE_PEER_LOCALMSPID="manufacturerMSP"
CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/manufacturer.pharma-network.com/users/Admin@manufacturer.pharma-network.com/msp
CORE_PEER_ADDRESS=peer0.distributor.pharma-network.com:7051
peer channel update -o orderer.pharma-network.com:7050 -c pharmachannel -f ./channel-artifacts/manufacturerMSPanchors.tx

echo $'                                             \n  '
echo $'                                             \n  '
echo $'  ------ manufacturer.peer0 Anchor peer has updated  -------\n'


# Update peer0 of distributor org as anchor peer for distributor org
CORE_PEER_LOCALMSPID="distributorMSP"
CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/distributor.pharma-network.com/users/Admin@distributor.pharma-network.com/msp
CORE_PEER_ADDRESS=peer0.distributor.pharma-network.com:9051
peer channel update -o orderer.pharma-network.com:7050 -c pharmachannel -f ./channel-artifacts/distributorMSPanchors.tx

echo $'                                             \n  '
echo $'                                             \n  '
echo $'  ------ distributor.peer0 Anchor peer has updated  -------\n'


# update peer0 of retailer org as anchor peer for retailer org
CORE_PEER_LOCALMSPID="retailerMSP"
CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/retailer.pharma-network.com/users/Admin@retailer.pharma-network.com/msp
CORE_PEER_ADDRESS=peer0.retailer.pharma-network.com:11051
peer channel update -o orderer.pharma-network.com:7050 -c pharmachannel -f ./channel-artifacts/retailerMSPanchors.tx

echo $'                                             \n  '
echo $'                                             \n  '
echo $'  ------ retailer.peer0 Anchor peer has updated  -------\n'


# update peer0 of consumer org as anchor peer for consumer org
CORE_PEER_LOCALMSPID="consumerMSP"
CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/consumer.pharma-network.com/users/Admin@consumer.pharma-network.com/msp
CORE_PEER_ADDRESS=peer0.consumer.pharma-network.com:13051
peer channel update -o orderer.pharma-network.com:7050 -c pharmachannel -f ./channel-artifacts/consumerMSPanchors.tx

echo $'                                             \n  '
echo $'                                             \n  '
echo $'  ------ consumer.peer0 Anchor peer has updated  -------\n'


# update peer0 of transporter org as anchor peer for transporter org
CORE_PEER_LOCALMSPID="transporterMSP"
CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/transporter.pharma-network.com/users/Admin@transporter.pharma-network.com/msp
CORE_PEER_ADDRESS=peer0.transporter.pharma-network.com:15051
peer channel update -o orderer.pharma-network.com:7050 -c pharmachannel -f ./channel-artifacts/transporterMSPanchors.tx

echo $'                                             \n  '
echo $'                                             \n  '
echo $'  ------ transporter.peer0 Anchor peer has updated  -------\n'
