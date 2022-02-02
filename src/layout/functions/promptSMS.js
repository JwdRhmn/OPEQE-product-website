export default body => {
  window.open(`sms:&body=${body}`, '_self');
}