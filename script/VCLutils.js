window.addEventListener('load', function () {
    
    let tipsArr = ['Welcome to VCL v1.0','<br>',
            'Try \'Change Theme\'','<br>',
            'Try \'Time now\'','<br>',
            'Try \'Date today\'','<br>',
            'Try \'how are you\'', '<br>',
            'Try \'What is this\'', '<br>',
            'Try \'Who made this\'', '<br>',
            'Try \'I like this project\'', '<br>',
            'Try \'Location\'', '<br>',
            'Try \'Time Zone\'', '<br>',
            'Try \'Temperature\'', '<br>',
            'Try \'Sunrise and Sunset\'', '<br>',
            'Try \'Atmospheric pressure\'', '<br>',
            'Try \'Humidity\'', '<br>',
            'Try \'Dew point\'', '<br>',
            'Try \'Clouds\'', '<br>',
            'Try \'UV index\'', '<br>',
            'Try \'Visibility\'', '<br>',
            'Try \'Wind\'', '<br>',
            'Try \'Weather\'', '<br>',
            'For any help use command \'help me\'','<br><br>'];
    
    let cmd = document.querySelector('.cmdtxt');
    var i = 0;
    for(eachtips of tipsArr){
        cmd.innerHTML += eachtips;
    }

}, false );