import {generateKeyPairWithPassword,encryptWithPublicKey,decryptWithPrivateKey} from './helper'
//const { testHelper } = require('./helper.ts');
const bootstarp=async ()=>{
    const password="pasword";
    await generateKeyPairWithPassword(password);
    const encryptedData=await encryptWithPublicKey("Hello Kumar")
    console.log("encryptedData: ",encryptedData)
    const plainData=await decryptWithPrivateKey(password,encryptedData)
    console.log("DecryptedData: ",plainData)
    
}
bootstarp()