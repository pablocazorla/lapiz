// LAPIZ
Lapiz = (function() {
      "use strict";

      var win = window,
        idCounter = 0;

      return function() {

          var lapiz = {},
            utils = {};

          utils.updateWindow = function() {
            lapiz.windowWidth = window.innerWidth;
            lapiz.windowHeight = window.innerHeight;
          };
          utils.updateWindow();

          lapiz.id = idCounter++;

          //-------------------------------------

          //@prepros-append lapiz/_canvas.js

          //@prepros-append lapiz/_style.js
          
          //@prepros-append lapiz/_image.js

          //@prepros-append lapiz/_draw.js

          //@prepros-append lapiz/_shape.js

          //@prepros-append lapiz/_steps.js
          //@prepros-append lapiz/_events.js

          //------------------------------------

         


          //@prepros-append lapiz/end.js
