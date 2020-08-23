window.addEventListener('load', function () {
    console.log('Loaded succesfully.');
    let tipsArr = ['Welcome to VCL v1.0','<br>',
            'For time use command Whats the time now or simply time now','<br>',
            'For date use command Whats the date today or simply date today','<br>',
            'For any help use command help me','<br><br>']
    /*let tips = 'ipsum dolor sit amet consectetur adipisicing elit. At doloribus dolor maiores veritatis eveniet cum. Minima numquam, architecto cumque excepturi omnis ut. Recusandae voluptates voluptas autem, veniam a suscipit animi.Harum illum, voluptatibus voluptate recusandae, pariatur ab rem eos, quibusdam vitae praesentium corrupti ex libero similique architecto. Odio corporis vero natus alias, ex id laborum ipsam, quos totam illo isteUnde nemo inventore beatae? Impedit praesentium odit repellendus voluptate debitis ea nostrum quos eveniet, porro exercitationem accusantium dignissimos ut, accusamus consequatur? Magnam odio explicabo dignissimos blanditiis repudiandae quidem ducimus commodi?';*/
    
    let cmd = document.querySelector('.cmdtxt');
    var i = 0;
    for(eachtips of tipsArr){
        cmd.innerHTML += eachtips;
    }

}, false );