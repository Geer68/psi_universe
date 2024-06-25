import { SendEmailCommand } from "@aws-sdk/client-ses";
import { sesClient } from "./sesConfig";

const createSendEmailCommand = (toAddress: string, fromAddress: string) => {
  return new SendEmailCommand({
    Destination: {
      ToAddresses: [toAddress, "psi.universe.uy@gmail.com"],
    },
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: "HTML_FORMAT_BODY",
        },
        Text: {
          Charset: "UTF-8",
          Data: "TEXT_FORMAT_BODY",
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: "EMAIL_SUBJECT",
      },
    },
    Source: fromAddress,
  });
};

export const sendEmail = async (toAddress?: string, fromAddress?: string) => {
  const sendEmailCommand = createSendEmailCommand(
    toAddress || "grperezdiez@gmail.com",
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
