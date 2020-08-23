window.addEventListener('load', function () {
    console.log('Loaded succesfully.');
    let tipsArr = ['Welcome to VCL v1.0','<br>',
            'For time use command \'Whats the time now\' or simply \'time now\'','<br>',
            'For date use command \'Whats the date today\' or simply \'date today\'','<br>',
            'Try \'how are you\'', '<br>',
            'Try \'What is this\'', '<br>',
            'For any help use command \'help me\'','<br><br>'];
    
    let cmd = document.querySelector('.cmdtxt');
    var i = 0;
    for(eachtips of tipsArr){
        cmd.innerHTML += eachtips;
    }

}, false );