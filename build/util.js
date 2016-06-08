var enterTokenDiv = document.getElementById('enterToken');
var gooutTokenDiv = document.getElementById('gooutToken');
var qrcodeDiv = document.getElementById('qrcode');
if (enterTokenDiv) {
    localStorage.setItem('enterToken', enterTokenDiv.innerHTML); 
    // console.log('------->first', localStorage.getItem('enterToken')) 
    showQrcode(enterTokenDiv.innerHTML);
    setInterval(function(){
        requestToken('enterIn')   
    }, 10000);   
} else if (gooutTokenDiv){
    localStorage.setItem('enterToken', enterTokenDiv.innerHTML);
    showQrcode(gooutTokenDiv.innerHTML);                
    setInterval(function(){
        requestToken('goout')   
    }, 10000);  
}
function showQrcode(token) {
    new QRCode(qrcodeDiv, {
        text: 'enterIn/' + token,
        width: 128,
        height: 128,
        colorLight: '#ffffff'
    }) 
}
function requestToken(type) {
    $.ajax({
        method: 'get',
        url: '/showQrcode/'+type,
        data: {
            originalToken: localStorage.getItem('enterToken')
        },
        success: function(token) {     
            // console.log('------->update', localStorage.getItem('enterToken'))
            localStorage.setItem('enterToken', token);       
            qrcodeDiv.innerHTML = null;
            showQrcode(token)
        }
    })
}
