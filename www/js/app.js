angular.module('5mHope', ['ionic', '5mHope.controllers','ion-floating-menu','5mHope.services','ngCordova'])

.run(function($ionicPlatform) {
     $ionicPlatform.ready(function() {
                          
                          if (window.cordova && window.cordova.plugins.Keyboard) {
                          window.cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);
                          window.cordova.plugins.Keyboard.disableScroll(true);
                          
                          }
                          
                          if (window.StatusBar) {
                          
                          StatusBar.styleDefault();
                          }
                          });
     })

.factory("$fileFactory", function($q) {
         
         var File = function() { };
         
         File.prototype = {
         
         getParentDirectory: function(path) {
         var deferred = $q.defer();
         window.resolveLocalFileSystemURL(path, function(fileSystem) {
                                          fileSystem.getParent(function(result) {
                                                               deferred.resolve(result);
                                                               }, function(error) {
                                                               deferred.reject(error);
                                                               });
                                          }, function(error) {
                                          deferred.reject(error);
                                          });
         return deferred.promise;
         },
         
         getEntriesAtRoot: function() {
         var deferred = $q.defer();
         var myPath = cordova.file.syncedDataDirectory;
         console.log(JSON.stringify(myPath) + " In getEntriesAtRoot");
         
         // We can use the default externalRootDirectory or use a path : file://my/custom/folder
         
         //window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem) {
         window.resolveLocalFileSystemURL(myPath,function (dirEntry) {
                                          console.log(JSON.stringify(myPath) + " In resolveLocalFilesSystemURL");
                                          //console.log(JSON.stringify(dirEntry));
                                          //var directoryReader = fileSystem.root.createReader();
                                          var directoryReader = dirEntry.createReader();
                                          
                                          directoryReader.readEntries(function(entries) {
                                                                      console.log(JSON.stringify(entries)+""+'amhere');
                                                                      deferred.resolve(entries);
                                                        
                                                                      }, function(error) {
                                                                      deferred.reject(error);
                                                                      });
                                          }, function(error) {
                                          deferred.reject(error);
                                          });
         
         return deferred.promise;
         },
         
         getEntries: function(path) {
         var deferred = $q.defer();
         window.resolveLocalFileSystemURL(path, function(fileSystem) {
                                          var directoryReader = fileSystem.createReader();
                                          directoryReader.readEntries(function(entries) {
                                                                      deferred.resolve(entries);
                                                                      }, function(error) {
                                                                      deferred.reject(error);
                                                                      });
                                          }, function(error) {
                                          deferred.reject(error);
                                          });
         return deferred.promise;
         }
         
         };
         
         return File;
         
         })

//.filter('myDateFilter', ['$filter',
//                         function($filter) {
//                         return function(millseconds) {
//                         console.log(millseconds);
//                         var oneSecond = 1000;
//                         var oneMinute = oneSecond * 60;
//                         var oneHour = oneMinute * 60;
//                         var oneDay = oneHour * 24;
//                         
//                         var seconds = Math.floor((millseconds / 1000) % 60);
//                         var minutes = Math.floor((millseconds / 1000) / 60);
//                         
//                         
//                         if(minutes == 0){
//                         minutes = '00';
//                         }else if(minutes >=1 && minutes<=9){
//                         minutes = '0'+minutes;
//                         }
//                         
//                         if(seconds == 0){
//                         seconds = '00';
//                         }else if(seconds >=1 && seconds<=9){
//                         seconds = '0'+seconds;
//                         }
//                         
//                         return minutes+':'+seconds;
//                         }
//                         }
//                         ])



.config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
        
        .state('login',
               {
               url: '/login',
               templateUrl: 'templates/login.html',
               controller: 'LoginCtrl'
               })
        
        .state('register',
               {
               url: '/register',
               templateUrl: 'templates/register.html',
               controller: 'RegisterCtrl'
               })
        
        .state('forgotpassword',
               {
               url: '/forgotpassword',
               templateUrl: 'templates/forgotpassword.html',
               controller: 'ForgotPasswordCtrl'
               })
        
        .state('app',
               {
               url: '/app',
               abstract: true,
               templateUrl: 'templates/menu.html',
               controller: 'AppCtrl'
               })
        .state('app.songs', {
               url: '/songs',
               views: {
               'menuContent': {
               templateUrl: 'templates/songs.html',
               controller: 'SongsCtrl'
               }
               }
               })
        
        .state('app.foreverdetails', {
               url: '/foreverdetails?url',
               views: {
               'menuContent': {
               templateUrl: 'templates/foreverdetails.html',
               controller: 'ForeverDetailsCtrl'
               }
               }
               })
        .state('app.home',
               {
               url: '/home',
               views: {
               'menuContent': {
               templateUrl: 'templates/home.html',
               controller: 'HomeCtrl'
               }
               }
               })
        
        .state('app.mygroups',
               {
               url: '/mygroups',
               views: {
               'menuContent': {
               templateUrl: 'templates/mygroups.html',
               controller: 'MyGroupsCtrl'
               }
               }
               })
        
        .state('app.groupdetails',
               {
               url: '/groupdetails?id&name',
               views: {
               'menuContent': {
               templateUrl: 'templates/groupdetails.html',
               controller: 'GroupDetailsCtrl'
               }
               }
               })
        
        .state('app.inviteuser',
               {
               url: '/inviteuser?id',
               views: {
               'menuContent': {
               templateUrl: 'templates/inviteuser.html',
               controller: 'InviteUserCtrl'
               }
               }
               })
        
        .state('app.allgroups',
               {
               url: '/allgroups',
               views: {
               'menuContent': {
               templateUrl: 'templates/allgroups.html',
               controller: 'AllGroupsCtrl'
               }
               }
               })
        
        .state('app.addgroup',
               {
               url: '/addgroup',
               views: {
               'menuContent': {
               templateUrl: 'templates/addgroup.html',
               controller: 'AddGroupCtrl'
               }
               }
               })
        
        .state('app.prayers',
               {
               url: '/prayers',
               views: {
               'menuContent': {
               templateUrl: 'templates/prayers.html',
               controller: 'PrayersCtrl'
               }
               }
               })
        
        .state('app.prayersongs',
               {
               url: '/prayersongs?id&name&interval&scriptures&prayer',
               views: {
               'menuContent': {
               templateUrl: 'templates/prayersongs.html',
               controller: 'PrayerSongsCtrl'
               }
               }
               })
        
        
        .state('app.addprayer',
               {
               url: '/addprayer',
               views: {
               'menuContent': {
               templateUrl: 'templates/addprayer.html',
               controller: 'AddPrayerCtrl'
               }
               }
               })
        
        .state('app.addprayerscriptures',
               {
               url: '/addprayerscriptures?scriptures&prayertopic&minutes&prayer',
               views: {
               'menuContent': {
               templateUrl: 'templates/addprayerscriptures.html',
               controller: 'AddPrayerScriptures'
               }
               }
               })
        
        .state('app.changepassword',
               {
               url: '/changepassword',
               views: {
               'menuContent': {
               templateUrl: 'templates/changepassword.html',
               controller: 'ChangePasswordCtrl'
               }
               }
               })
        
        .state('app.becomeleader',
               {
               url: '/becomeleader',
               views: {
               'menuContent': {
               templateUrl: 'templates/becomeleader.html',
               controller: 'BecomeLeaderCtrl'
               }
               }
               })
        
        .state('app.settings',
               {
               url: '/settings',
               views: {
               'menuContent': {
               templateUrl: 'templates/settings.html',
               controller: 'SettingsCtrl'
               }
               }
               })
        
        .state('app.updateprofile',
               {
               url: '/updateprofile',
               views: {
               'menuContent': {
               templateUrl: 'templates/updateprofile.html',
               controller: 'UpdateProfileCtrl'
               }
               }
               })
        
        .state('app.musicsettings',
               {
               url: '/musicsettings',
               views: {
               'menuContent': {
               templateUrl: 'templates/musicsettings.html',
               controller: 'MusicSettingsCtrl'
               }
               }
               })
        
        
        .state('app.profilepic',
               {
               url: '/profilepic',
               views: {
               'menuContent': {
               templateUrl: 'templates/profilepic.html',
               controller: 'ProfilepicCtrl'
               }
               }
               })
        
        
        .state('app.notifications', {
               url: '/notifications',
               views: {
               'menuContent': {
               templateUrl: 'templates/notifications.html',
               controller: 'NotificationsCtrl'
               }
               }
               })
        
        .state('app.homeleader', {
               url: '/homeleader',
               views: {
               'menuContent': {
               templateUrl: 'templates/homeleader.html',
               controller: 'HomeLeaderCtrl'
               }
               }
               })
        
        .state('app.loadscriptures', {
               url: '/loadscriptures?prayertopic&minutes&prayer',
               views: {
               'menuContent': {
               templateUrl: 'templates/loadscriptures.html',
               controller: 'LoadScripturesCtrl'
               }
               }
               })
        
        .state('app.search',
               {
               url: '/search',
               views: {
               'menuContent': {
               templateUrl: 'templates/search.html'
               }
               }
               })
        
        .state('app.browse', {
               url: '/browse?id&name&interval&scriptures&prayer',
               views: {
               'menuContent': {
               templateUrl: 'templates/browse.html',
               controller: 'BrowseCtrl'               
                              }
                      }
               })
        .state('app.playlists', {
               url: '/playlists',
               views: {
               'menuContent': {
               templateUrl: 'templates/playlists.html',
               controller: 'PlaylistsCtrl'
               }
               }
               })
        
        .state('app.single', {
               url: '/playlists/:playlistId',
               views: {
               'menuContent': {
               templateUrl: 'templates/playlist.html',
               controller: 'PlaylistCtrl'
               }
               }
               })
        
        .state('app.userdetails', {
               url: '/userdetails',
               views: {
               'menuContent': {
               templateUrl: 'templates/userdetails.html',
               controller: 'UserDetailsCtrl'
               }
               }
               });
        // if none of the above states are matched, use this as the fallback
        //$urlRouterProvider.otherwise('/app/playlists');
        //$urlRouterProvider.otherwise('/login');
        if(localStorage.getItem("id") !== null && localStorage.getItem("id") !== "")
        {
        if(localStorage.getItem("role")=="user")
        {
        $urlRouterProvider.otherwise('/app/home');
        }
        else if(localStorage.getItem("role")=="leader")
        {
        $urlRouterProvider.otherwise('/app/homeleader');
        }else{
                $urlRouterProvider.otherwise('/login');     
        }
        }
        else
        {
        $urlRouterProvider.otherwise('/login');
        }
        
        });

