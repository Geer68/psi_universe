import { SendEmailCommand } from "@aws-sdk/client-ses";
import { sesClient } from "./sesConfig";

const createSendEmailCommand = (
  subject: string,
  body: string,
  toAddress: string,
  fromAddress: string
) => {
  return new SendEmailCommand({
    Destination: {
      ToAddresses: [toAddress, "psi.universe.uy@gmail.com"],
    },
    Message: {
      Body: {
        Text: {
          Charset: "UTF-8",
          Data: body,
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: subject,
      },
    },
    Source: fromAddress,
  });
};

export const sendEmail = async (
  subject: string,
  body: string,
  toAddress: string,
  fromAddress?: string
) => {
  const sendEmailCommand = createSendEmailCommand(
    subject,
    body,
    toAddress,
    fromAddress || "soporte@psiuniverse.com"
  );

  try {
    return await sesClient.send(sendEmailCommand);
  } catch (caught) {
    if (caught instanceof Error && caught.name === "MessageRejected") {
      /** @type { import('@aws-sdk/client-ses').MessageRejected} */
      const messageRejectedError = caught;
      return messageRejectedError;
    }
    throw caught;
  }
};
