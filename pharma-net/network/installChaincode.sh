echo $'                                             \n  '
echo $'                                             \n  '
echo $'  ------ Starting Chaincode INstallation Process  -------\n'

# point to peer0 of manufacturer and install chaincode on it
CORE_PEER_LOCALMSPID="manufacturerMSP"
CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/manufacturer.pharma-network.com/users/Admin@manufacturer.pharma-network.com/msp
CORE_PEER_ADDRESS=peer0.manufacturer.pharma-network.com:7051
peer chaincode install -n pharnet -v 1.1 -l node -p /opt/gopath/src/github.com/hyperledger/fabric/peer/chaincode/
echo $'                                             \n  '
echo $'  ------ Installed on Peer0 of manufacturer  -------\n'
# point to peer1 of manufacturer and install chaincode on it
CORE_PEER_ADDRESS=peer1.manufacturer.pharma-network.com:8051
peer chaincode install -n pharnet -v 1.1 -l node -p /opt/gopath/src/github.com/hyperledger/fabric/peer/chaincode/
echo $'                                             \n  '
echo $'  ------ Installed on Peer1 of manufacturer  -------\n'

# point to peer0 of distributor and install chaincode on it
CORE_PEER_LOCALMSPID="distributorMSP"
CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/distributor.pharma-network.com/users/Admin@distributor.pharma-network.com/msp
CORE_PEER_ADDRESS=peer0.distributor.pharma-network.com:9051
peer chaincode install -n pharnet -v 1.1 -l node -p /opt/gopath/src/github.com/hyperledger/fabric/peer/chaincode/
echo $'                                             \n  '
echo $'  ------ Installed on Peer0 of distributor  -------\n'
# point to peer1 of distributor and install chaincode on it
CORE_PEER_ADDRESS=peer1.distributor.pharma-network.com:10051
peer chaincode install -n pharnet -v 1.1 -l node -p /opt/gopath/src/github.com/hyperledger/fabric/peer/chaincode/
echo $'  ------ Installed on Peer1 of distributor  -------\n'

# point to peer0 of retailer and install chaincode on it
CORE_PEER_LOCALMSPID="retailerMSP"
CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/retailer.pharma-network.com/users/Admin@retailer.pharma-network.com/msp
CORE_PEER_ADDRESS=peer0.retailer.pharma-network.com:11051
peer chaincode install -n pharnet -v 1.1 -l node -p /opt/gopath/src/github.com/hyperledger/fabric/peer/chaincode/
echo $'                                             \n  '
echo $'  ------ Installed on Peer0 of retailer  -------\n'
# point to peer1 of retailer and install chaincode on it
CORE_PEER_ADDRESS=peer1.retailer.pharma-network.com:12051
peer chaincode install -n pharnet -v 1.1 -l node -p /opt/gopath/src/github.com/hyperledger/fabric/peer/chaincode/
echo $'                                             \n  '
echo $'  ------ Installed on Peer1 of retailer  -------\n'

# point to peer0 of consumer and install chaincode on it
CORE_PEER_LOCALMSPID="consumerMSP"
CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/consumer.pharma-network.com/users/Admin@consumer.pharma-network.com/msp
CORE_PEER_ADDRESS=peer0.consumer.pharma-network.com:13051
peer chaincode install -n pharnet -v 1.1 -l node -p /opt/gopath/src/github.com/hyperledger/fabric/peer/chaincode/
echo $'                                             \n  '
echo $'  ------ Installed on Peer0 of consumer  -------\n'
# point to peer1 of consumer and install chaincode on it
CORE_PEER_ADDRESS=peer1.consumer.pharma-network.com:14051
peer chaincode install -n pharnet -v 1.1 -l node -p /opt/gopath/src/github.com/hyperledger/fabric/peer/chaincode/
echo $'                                             \n  '
echo $'  ------ Installed on Peer1 of consumer  -------\n'

# point to peer0 of transporter and install chaincode on it
CORE_PEER_LOCALMSPID="transporterMSP"
CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/transporter.pharma-network.com/users/Admin@transporter.pharma-network.com/msp
CORE_PEER_ADDRESS=peer0.transporter.pharma-network.com:15051
peer chaincode install -n pharnet -v 1.1 -l node -p /opt/gopath/src/github.com/hyperledger/fabric/peer/chaincode/
echo $'                                             \n  '
echo $'  ------ Installed on Peer0 of transporter  -------\n'
# point to peer0 of transporter and install chaincode on it
CORE_PEER_ADDRESS=peer1.transporter.pharma-network.com:16051
peer chaincode install -n pharnet -v 1.1 -l node -p /opt/gopath/src/github.com/hyperledger/fabric/peer/chaincode/
echo $'  ------ Installed on Peer1 of transporter  -------\n'
echo $' ******   *****\n  '
echo $'  ------ Done with chaincode Installation  -------\n'
echo $' ******   *****\n  '
echo $'                                         \n  '
echo $'                                         \n  '

echo $'  ------ Starting Chaincode Instantiation Process  -------\n'
CORE_PEER_LOCALMSPID="manufacturerMSP"
CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/manufacturer.pharma-network.com/users/Admin@manufacturer.pharma-network.com/msp
CORE_PEER_ADDRESS=peer0.manufacturer.pharma-network.com:7051
peer chaincode instantiate -o orderer.pharma-network.com:7050 -C pharmachannel -n pharnet -l node -v 1.1 -c '{"Args":["org.pharma-network.com.pharnet.manufacturer:instantiate"]}' -P "OR ('manufacturerMSP.member','distributorMSP.member','retailerMSP.member','consumerMSP.member','transporterMSP.member')"
echo $'                                                   \n'
echo $'  ------ Done with Chaincode Instantiation  -------\n'
