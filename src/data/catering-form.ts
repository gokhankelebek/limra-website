// Where catering inquiries are kept: a Google Form owned by the agency account
// (prodigitalstrategy@gmail.com), "Limra Catering Inquiries", linked to the
// Sheet "Limra Catering Inquiries (Responses)". Each new response also emails
// the form owner (Responses > Get email notifications).
//   Edit:  https://docs.google.com/forms/d/1vwJ41PGEPgSQo9qKn_GALFOxilw6zUShMrdjoaVl1dM/edit
//   Sheet: https://docs.google.com/spreadsheets/d/1uhFQawnk_MCRadZzlbyBG1EE3e8Ir89JhHRS4lg3T7k/edit
// Guests never see this form; /api/catering posts to it.

export const CATERING_FORM_POST_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSdxQFfeBHzxHxi_K6PIICbGFla_wrbQanwMSSoaYqNvr_5kZQ/formResponse";

/** entry.<id> for each question, read from the live form. */
export const CATERING_FORM_ENTRIES = {
  name: "1207750414",
  email: "1271427615",
  phone: "1161425198",
  eventDate: "1702704050",
  guests: "311670318",
  eventType: "527794240",
  serviceType: "1671439924",
  interests: "383363150",
  message: "1409150094",
} as const;
