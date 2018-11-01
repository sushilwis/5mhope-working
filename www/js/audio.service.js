angular.module('5mHope.services', [])

.service('AudioSvc', [function() {

                      
                      
  var AudioSvc = {
    my_media: null,
    mediaTimer: null,
    playAudio: function(src, cb) {
      var self = this;

      // stop playing, if playing
      self.stopAudio();

      self.my_media = new Media(src, onSuccess, onError);
      self.my_media.play();


      if (self.mediaTimer == null) {
                      
     //alert(self.mediaTimer);
        self.mediaTimer = setInterval(function() {
          self.my_media.getCurrentPosition(
            function(position) {

              console.log("getting pos=" + position);


              cb(position, self.my_media.getDuration());
            },
            function(e) {
              alert("Error getting pos=" + e);
              console.log("Error getting pos=" + e);
            }
          );
        }, 1000);


      }



      function onSuccess() {
        console.log("playAudio():Audio Success");

      }

      // onError Callback
      //
      function onError(error) {
        // alert('code: ' + error.code + '\n' +
        //     'message: ' + error.message + '\n');

        // we forcefully stop


      }

    },

    resumeAudio: function() {
      var self = this;
      if (self.my_media) {
        self.my_media.play();
      }
    },
    pauseAudio: function() {
      var self = this;
      if (self.my_media) {
        self.my_media.pause();
      }
    },
    stopAudio: function() {
      var self = this;
      if (self.my_media) {
        self.my_media.stop();
      }
      if (self.mediaTimer) {
                      console.log("Media Timer:" + self.mediaTimer)
        clearInterval(self.mediaTimer);
                      console.log("interval=" + self.mediaTimer);

        self.mediaTimer = null;


      }
    }

  };

  return AudioSvc;
}])
