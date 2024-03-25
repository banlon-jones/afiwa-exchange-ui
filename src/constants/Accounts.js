const Accounts = {
  email: "afiwa@gmail.com",
  whatsapp_number: "+79895772136",
  telegram_number: "afiwa_exchange",
};

const whatsapp_url = (transactionId) =>
  `https://api.whatsapp.com/send?phone=${Accounts.whatsapp_number}&text=transactionId: ${transactionId}`;

const telegram_url = (transactionId) =>
  `https://t.me/${Accounts.telegram_number}&text=transactionId: ${transactionId}`;

export { Accounts, whatsapp_url, telegram_url };
