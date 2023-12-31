export const CARD_REGEX = {
  AMEX:  /^3[47][0-9]{13}$/,
  DINNER_CLUB_CARD: /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/,
  MAESTRO_CARD: /^(5018|5020|5038|6304|6759|6761|6763)[0-9]{8,15}$/,
  MASTER_CARD: /^(5[1-5][0-9]{14}|2(22[1-9][0-9]{12}|2[3-9][0-9]{13}|[3-6][0-9]{14}|7[0-1][0-9]{13}|720[0-9]{12}))$/,
  SWITCH_CARD: /^(4903|4905|4911|4936|6333|6759)[0-9]{12}|(4903|4905|4911|4936|6333|6759)[0-9]{14}|(4903|4905|4911|4936|6333|6759)[0-9]{15}|564182[0-9]{10}|564182[0-9]{12}|564182[0-9]{13}|633110[0-9]{10}|633110[0-9]{12}|633110[0-9]{13}$/,
  UNION_PAY_CARD: /^(62[0-9]{14,17})$/,
  VISA_CARD: /^4[0-9]{12}(?:[0-9]{3})?$/,
  VISA_MASTER_CARD: /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14})$/
}