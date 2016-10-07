module.exports = function(data) {
    var reContent = '';
    if (data.label === undefined) {
        reContent = data.latitude + ',' + data.longitude;
    } else {
        reContent = data.label;
    }
    return reContent;
}
