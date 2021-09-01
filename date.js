module.exports.getDate = function(){

    const today = new Date();
  
    var options = {
      day: 'numeric',
      month : 'long',
      year : 'numeric'
    };
    
    return formattedDate = today.toLocaleDateString("en-IN", options);
  
  }