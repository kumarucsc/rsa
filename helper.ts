import { Console } from 'console';
import { generateKeyPairSync,publicEncrypt, privateDecrypt } from 'crypto';
import fs from 'fs';

export const generateKeyPairWithPassword=async (password:string)=>{
    const { publicKey, privateKey } = generateKeyPairSync('rsa', {
        modulusLength: 2048,
        publicKeyEncoding: {
          type: 'spki',
          format: 'pem',
        },
        privateKeyEncoding: {
          type: 'pkcs8',
          format: 'pem',
          cipher: 'aes-256-cbc',
          passphrase: password,
        },
      });
      const rsaKeys={publicKey:publicKey,privateKey:privateKey};
      await WriteJSONIntoFile(rsaKeys,"RSA.json");
}

const WriteJSONIntoFile=async (jsonData:any, fileName:string)=>{
    // Convert JSON object to a string
const jsonString = JSON.stringify(jsonData, null, 2);
try {
    // Write JSON string to a file synchronously
    fs.writeFileSync(fileName, jsonString, 'utf8');
    console.log('File has been written successfully!');
  } catch (err) {
    console.error('Error writing file:', err);
  }
}

const ReadJSONIntoFile=async (fileName:string)=>{   
        const fileContent = fs.readFileSync(fileName, 'utf8');
        const jsonObject = JSON.parse(fileContent);
        return jsonObject; 

  }
  

  export const encryptWithPublicKey=async(data: string)=>{
    const rsaKey=await ReadJSONIntoFile("RSA.json");
    console.log(`encryptWithPublicKey:publicKey: rsaKey.publicKey`)
    const encryptedBuffer = publicEncrypt(rsaKey.publicKey, Buffer.from(data, 'utf8'));  
    return encryptedBuffer.toString('base64');
  }
  // Decrypt data using password-protected private key
  export const decryptWithPrivateKey=async(password: string, encryptedData: string)=>{
 // function decryptWithPrivateKey(privateKey: string, password: string, encryptedData: string): string {
    const rsaKey=await ReadJSONIntoFile("RSA.json");  
 const decryptedBuffer = privateDecrypt(
      {
        key: rsaKey.privateKey,
        passphrase: password,
      },
      Buffer.from(encryptedData, 'base64')
    );
  
    return decryptedBuffer.toString('utf8');
  }
