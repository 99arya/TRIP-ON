var counter = 0;

function changeBG() {
  var imgs = [
        'url(https://cdn4.benzinga.com/files/imagecache/1024x768xUP/images/story/2012/shutterstock_132468212.jpg)',
        'url(https://www.visitnc.com/resimg.php/imgcrop/2/35245/image/800/448/CampingEnoRiver.jpg)',
        'url(http://notagrouch.com/wp-content/uploads/camping-kern-river-4.jpg)'
      ];

  if (counter === imgs.length) {
    counter = 0;
  }
  document.body.style.backgroundImage = imgs[counter];

  counter++;
}

setInterval(changeBG, 2500);
