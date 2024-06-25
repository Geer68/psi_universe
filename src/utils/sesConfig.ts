// import aws from "aws-sdk";
import { SESClient } from "@aws-sdk/client-ses";
import { fromEnv } from "@aws-sdk/credential-providers";
// Set the AWS Region.
const REGION = "us-east-2";

// aws.config.update({
//   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//   region: REGION,
// });

// Create SES service object.
const sesClient = new SESClient({
  region: REGION,
  credentials: fromEnv(),
});

// const sesClient = new aws.SES({ apiVersion: "2010-12-01" });

export { sesClient };
