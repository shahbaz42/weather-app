module.exports.getDate = function(timestamp){
    
    const today = new Date(timestamp.dt*1000+(timestamp.timezone*1000));
  
    var options = {
      day: 'numeric',
      month : 'long',
      year : 'numeric',
      
    };
    
    return formattedDate = today.toLocaleDateString("en-IN", options);
    
  
  }