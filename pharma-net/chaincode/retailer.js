'use strict'
const {Contract} = require('fabric-contract-api');
const ClientIdentity = require('fabric-shim').ClientIdentity;

class PharnetRetailContract extends Contract {

  constructor() {
    super('org.pharma-network.com.pharnet.retailer');
  }

  /* ****** All custom functions are defined below ***** */

	// This is a basic user defined function used at the time of instantiating the smart contract
	// to print the success message on console
  async instantiate(ctx){
    console.log('************  Pharnet Retailer Smart Contract Instantiated *************');
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

     var roles = ["Manufacturer","Distributor","Retailer"];

     // check whether the role entered is valid or not
     if(roles.indexOf(organisationRole) >= 0){
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

       company.hierarchyKey = roles.indexOf(organisationRole)+1;

       // Convert the JSON object to a buffer and send it to blockchain for storage
       await ctx.stub.putState(companyID,Buffer.from(JSON.stringify(company)));

       // return the company object to the user
       return company;
     }
     else{
       console.log("Enter the valid role\n");
     }

   }

   /**
 	 * Create a new student account on the network
 	 * @param ctx - The transaction context object
 	 * @param buyerCRN - Registration Number of the buyer
   * @param sellerCRN - Registration Number of the seller
   * @param drugName -  Name of the drug
   * @param quantity - Quantiy of the drug needed
 	 * @returns
 	 */
   async createPO(ctx,buyerCRN,sellerCRN,drugName,quantity){
     try{
       let cid = new ClientIdentity(ctx.stub);

       // check whether caller is one among distributor or retailer
       if(await cid.getMSPID() == "distributorMSP" || await cid.getMSPID() == "retailerMSP"){

         // get buyer
         let resIterator = await ctx.stub.getStateByPartialCompositeKey('org.pharma-network.company',[buyerCRN]).catch(err => console.log(err));
         let results = await this.getAllResults(resIterator);
         let buyer = JSON.parse(results[0]);

         // get seller
         let res1Iterator = await ctx.stub.getStateByPartialCompositeKey('org.pharma-network.company',[sellerCRN]).catch(err => console.log(err));
         let results1 = await this.getAllResults(res1Iterator);
         let seller = JSON.parse(results1[0]);

         // check whether the buyer is buying from the correct hierarchy
         if(buyer.hierarchyKey > seller.hierarchyKey){

           // Create a composite key for the company to get registered in ledger
           const poID = ctx.stub.createCompositeKey('org.pharma-network.po',[buyerCRN,drugName]);

           // create po object to be stored in the blockchain
           let po = {
             poID: poID,
             drugName: drugName,
             quantity: quantity,
             buyer: buyer.companyID,
             seller: seller.companyID,
           };

           // Convert the JSON object to a buffer and send it to blockchain for storage
           await ctx.stub.putState(poID,Buffer.from(JSON.stringify(po)));

           return po;
         }
         // else if the middle org is missing
         else{
           console.log(" **********  Invalid hierarchy buying ********* ");
         }
       }
       // else other member invokes the function
       else{
         console.log("            *******    Invalid caller     **** ");
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
   * @param retailerCRN - Registration Number of the retailer
   * @param customerAadhar - Aadhar number of the consumer
 	 * @returns
 	 */
   async retailDrug(ctx,drugName,serialNo,retailerCRN,customerAadhar){
     try{
       // create client identity class
       let cid = new ClientIdentity(ctx.stub);

       // Create a composite key for the company to get registered in ledger
       const drugID = ctx.stub.createCompositeKey('org.pharma-network.drug',[drugName,serialNo]);

       // fetch the corresponding drug object from the ledger
       let drugBuf = await ctx.stub
           .getState(drugID)
           .catch(err => console.log(err));

       // Convert the received drug dbuffer to a JSON object
       let drug = JSON.parse(drugBuf.toString());

       // get the full composite key of the buyer
       let resIterator = await ctx.stub.getStateByPartialCompositeKey('org.pharma-network.company',[retailerCRN]).catch(err => console.log(err));
       let results = await this.getAllResults(resIterator);
       let retailer = JSON.parse(results[0]);

       // Check if caller is the retailer, who is the owner of the drug.
       if(cid.getMSPID() == "retailerMSP" && drug.owner == retailer.companyID){

         // update the ownership of the drug with the customer aadhar
         drug.owner = customerAadhar;

         // put back the updated drug object to the ledger
         await ctx.stub.putState(drugID, Buffer.from(JSON.stringify(drug)));

         // return the drug object to the user
         return drug;
       }
       else {
         console.log("  **********  Neither the call is the retailer nor the owner of the drug   *******");
       }
     }
     catch(err){
       console.log("                                        ");
       console.log(" ********** Throwing this error  ",err);
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
module.exports = PharnetRetailContract;
