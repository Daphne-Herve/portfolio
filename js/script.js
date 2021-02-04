if (window.matchMedia('(min-width: 1200px)').matches) {
  let x = 0;
  let y = 0;

  if (document.getElementById) {
    if (navigator.appName.substring(0, 3) == 'Net')
      document.captureEvents(Event.MOUSEMOVE);
    document.onmousemove = Pos_Cursor;
    window.onload = Bouge_Image;
  }
  function Pos_Cursor(e) {
    x =
      navigator.appName.substring(0, 3) == 'Net'
        ? e.pageX
        : event.x + document.body.scrollLeft;
    y =
      navigator.appName.substring(0, 3) == 'Net'
        ? e.pageY
        : event.y + document.body.scrollTop;
  }
  posX = 0;
  posY = 0;
  anim = true;
  oldpos = '../images/svg/soleil.svg';
  function Bouge_Image() {
    if (document.getElementById && anim) {
      posX = posX + (x - posX + 20) / 15;
      posY = posY + (y - posY + 20) / 15;
      if (posX < x) newpos = '../images/svg/soleil.svg';
      else newpos = '../images/svg/soleil.svg';
      if (newpos != oldpos) {
        document.tete.src = newpos;
        oldpos = newpos;
      }
      document.getElementById('teteronde').style.top = posY + 'px';
      document.getElementById('teteronde').style.left = posX + 'px';
      tempo = setTimeout('Bouge_Image()', 15);
    }
  }
  if (document.getElementById) {
    document.write('<div id="teteronde" style="position: absolute">');
    document.write(
      '<a href="#" onClick="anim=false;document.getElementById(\'teteronde\').style.visibility = \'hidden\';return(false)">'
    );
    document.write(
      '<img class="imagenoel" style="width:80%;" src="../images/svg/soleil.svg" style="border:0px" name="tete" alt="Cliquez ici pour faire disparaître" />'
    );
    document.write('</a>');
    document.write('</div>');
  }
} else {
  document.getElementById('animMobile').style.background =
    "url('../images/svg/soleil-mobile.svg') no-repeat right top";
  //   }
  // } else {
  //   document.getElementById('mainHello').innerHTML = listContent[0];
  //   document.getElementById('mainHello').style.color = 'rgb(253, 253, 253)';
  //   document.getElementById('mainBackground').style.background = 'white';
  //   if (window.matchMedia('(max-width: 599px)').matches) {
  //     document.getElementById('animMobile').style.background =
  //       "url('../images/svg/soleil-mobile.svg') no-repeat right top";
  //   } else {
  //     let x = 0;
  //     let y = 0;

  //     if (document.getElementById) {
  //       if (navigator.appName.substring(0, 3) == 'Net')
  //         document.captureEvents(Event.MOUSEMOVE);
  //       document.onmousemove = Pos_Cursor;
  //       window.onload = Bouge_Image;
  //     }
  //     function Pos_Cursor(e) {
  //       x =
  //         navigator.appName.substring(0, 3) == 'Net'
  //           ? e.pageX
  //           : event.x + document.body.scrollLeft;
  //       y =
  //         navigator.appName.substring(0, 3) == 'Net'
  //           ? e.pageY
  //           : event.y + document.body.scrollTop;
  //     }
  //     posX = 0;
  //     posY = 0;
  //     anim = true;
  //     oldpos = '../images/svg/soleil.svg';
  //     function Bouge_Image() {
  //       if (document.getElementById && anim) {
  //         posX = posX + (x - posX + 20) / 15;
  //         posY = posY + (y - posY + 20) / 15;
  //         if (posX < x) newpos = '../images/svg/soleil.svg';
  //         else newpos = '../images/svg/soleil.svg';
  //         if (newpos != oldpos) {
  //           document.tete.src = newpos;
  //           oldpos = newpos;
  //         }
  //         document.getElementById('teteronde').style.top = posY + 'px';
  //         document.getElementById('teteronde').style.left = posX + 'px';
  //         tempo = setTimeout('Bouge_Image()', 15);
  //       }
  //     }
  //     if (document.getElementById) {
  //       document.write('<div id="teteronde" style="position: absolute">');
  //       document.write(
  //         '<a href="#" onClick="anim=false;document.getElementById(\'teteronde\').style.visibility = \'hidden\';return(false)">'
  //       );
  //       document.write(
  //         '<img class="imagenoel" style="width:80%;" src="../images/svg/soleil.svg" style="border:0px" name="tete" alt="Cliquez ici pour faire disparaître" />'
  //       );
  //       document.write('</a>');
  //       document.write('</div>');
  //     }
  // }
}
