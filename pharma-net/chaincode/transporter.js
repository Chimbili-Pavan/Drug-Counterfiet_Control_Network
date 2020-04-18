'use strict'
const {Contract} = require('fabric-contract-api');

class PharnetTransportContract extends Contract {

  constructor() {
    super('org.pharma-network.com.pharnet.transporter');
  }

  /* ****** All custom functions are defined below ***** */

	// This is a basic user defined function used at the time of instantiating the smart contract
	// to print the success message on console
  async instantiate(ctx){
    console.log('************  Pharnet Transporter Smart Contract Instantiated *************');
	}

  /**
	 * Create a new student account on the network
	 * @param ctx - The transaction context object
	 * @param companyCRN - Registration Number of the Company
   * @param companyName - Name of the company
   * @param Location -    Location of the company situated
   * @param organisationRole - Role of the company in thenetwork
	 * @returns
	 */
   async registerCompany(ctx,companyCRN,companyName,location,organisationRole){

     // Create a composite key for the company to get registered in ledger
     const companyID = ctx.stub.createCompositeKey('org.pharma-network.company',[companyCRN,companyName]);

     // Create a company object to be stored in blockchain
     let company = {
       companyID: companyID,
       name: companyName,
       location: location,
       organisationRole: organisationRole,
       hierarchyKey: null,
     };

     // Convert the JSON object to a buffer and send it to blockchain for storage
     await ctx.stub.putState(companyID,Buffer.from(JSON.stringify(company)));

     // return the company object to the user
     return company;
   }

   /**
 	 * Create a new student account on the network
 	 * @param ctx - The transaction context object
 	 * @param buyerCRN - Registration Number of the buyer
   * @param drugName -  Name of the drug
   * @param transporterCRN - Registration Number of the transporter
 	 * @returns
 	 */
   async updateShipment(ctx,buyerCRN,drugName,transporterCRN){
     try{
       // catch the iterator returned by the API
       let resIterator = await ctx.stub.getStateByPartialCompositeKey('org.pharma-network.company',[transporterCRN]);
       let results = await this.getAllResults(resIterator);
       let transporter = JSON.parse(results[0]);

       // Create a composite key for the company to get registered in ledger
       const shipID = ctx.stub.createCompositeKey('org.pharma-network.shipment',[buyerCRN,drugName]);

       // fetch the corresponding user object from the ledger
       let shipmentBuf = await ctx.stub
           .getState(shipID)
           .catch(err => console.log(err));

       // Convert the received certificate dbuffer to a JSON object
       let shipment = JSON.parse(shipmentBuf.toString());

       // check if the caller is a valid transporter
       if(shipment.transporter == transporter.companyID){
         //change the state of the shipment to delivered
         shipment.status = "delivered";

         //put back the updated shipment object to the ledger
         await ctx.stub.putState(shipID, Buffer.from(JSON.stringify(shipment)));

         // get the full composite key of the buyer
         let res1Iterator = await ctx.stub.getStateByPartialCompositeKey('org.pharma-network.company',[buyerCRN]);
         let results1 = await this.getAllResults(res1Iterator);
         let buyer = JSON.parse(results1[0]);

         // update the shipment column of the all the drugs related to this shipment
         for(let i=0;i<shipment.assets.length;i++){
           // fetch the corresponding drug object from the ledger
           let drugBuf = await ctx.stub
               .getState(shipment.assets[i])
               .catch(err => console.log(err));

           // Convert the received drug dbuffer to a JSON object
           let drug = JSON.parse(drugBuf.toString());

           // update the shipment column of the drug with the shipmentID
           drug.shipment = shipment.shipmentID;

           // owner of each drug is changed to buyers name
           drug.owner = buyer.companyID;

           // put back the updated drug object to the ledger
           await ctx.stub.putState(shipment.assets[i], Buffer.from(JSON.stringify(drug)));
         }
         console.log("                                            ");
         console.log("  *******  Updated Shipment ");
       }
       // else if the invoker is not the valid transporter
       else {
         console.log("  *******  Invalid transporter onvoked ***** ");
       }
     }
     catch(err){
       console.log("                     ");
       console.log("error is ",err);
     }

   }

   /**
    * Create a new student account on the network
    * @param ctx - The transaction context object
   * @param drugName -  Name of the drug
    * @param serialNo - Serial Number of the drug
    * @returns
    */
    async viewDrugCurrentState(ctx,drugName,serialNo){
      // Create a composite key for the company to get registered in ledger
      const drugID = ctx.stub.createCompositeKey('org.pharma-network.drug',[drugName,serialNo]);

      // fetch the corresponding drug object from the ledger
      let drugBuf = await ctx.stub
          .getState(drugID)
          .catch(err => console.log(err));

      // return the drug object to the user
       return JSON.parse(drugBuf.toString());

    }

   /**
    * Create a new student account on the network
    * @param ctx - The transaction context object
   * @param drugName -  Name of the drug
    * @param serialNo - Serial Number of the drug
    * @returns
    */
    async viewHistory(ctx,drugName,serialNo){
      try{
        // Create a composite key for the company to get registered in ledger
        const drugID = ctx.stub.createCompositeKey('org.pharma-network.drug',[drugName,serialNo]);

        // ctach the iterator returned by the API
        let iterator = await ctx.stub.getHistoryForKey(drugID).catch(err => console.log(err));

        // fetch all the required results by passing it to getALLReuslts function
        let results = await this.getAllResults(iterator);

        // return the results back to the user
        return results;
      }
      catch(e){
        console.log(" The error is ",e);
      }

    }

    async getAllResults(iterator) {
      const allResults = [];
      while (true) {
        const res = await iterator.next();

        if (res.value) {
          // if not a getHistoryForKey iterator then key is contained in res.value.key
          allResults.push(res.value.value.toString('utf8'));
        }

        // check to see if we have reached then end
        if (res.done) {
          // explicitly close the iterator
          await iterator.close();
          return allResults;
        }
      }
     }
}
module.exports = PharnetTransportContract;
