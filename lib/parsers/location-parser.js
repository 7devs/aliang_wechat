module.exports = function(data,echo) {

    if (data.label === undefined) {
        echo(data.latitude + ',' + data.longitude);
    } else {
        echo(data.label);
    }
    
}
