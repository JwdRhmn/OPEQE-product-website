export default body => {
  	window.open(`whatsapp://send?text=${body}`, '_self');
}