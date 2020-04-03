export default (date: Date) => date.getTime() - date.getTimezoneOffset() * 60000;
