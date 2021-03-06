/*
 * app_send_money.js
 * Send Money feature module
*/

/*jslint         browser    : true, continue : true,
  devel  : true, indent     : 2,    maxerr   : 50,
  newcap : true, nomen      : true, plusplus : true,
  regexp : true, sloppy     : true, vars     : false,
  white  : true, camelcase  : false
*/

/*global $, app, Handlebars */

app.send_money = (function () {
  'use strict';
  
  //---------------- BEGIN MODULE SCOPE VARIABLES --------------
  var
    configMap = {
      main_html: Handlebars.compile($('#app-send-money-template').html()),
      friend_item_html: Handlebars.compile($('#app-friend-item-template').html())
    },
    stateMap  = { $container : null },
    jqueryMap = {},

    onSendBtnClick,
    onGetFriends,

    setJqueryMap, configModule, initModule;
  //----------------- END MODULE SCOPE VARIABLES ---------------

  //------------------- BEGIN UTILITY METHODS ------------------
  onGetFriends = function(){
    app.model.user.get_friends(function( friends ){
      jqueryMap.$friendList.append(
        configMap.friend_item_html({
          friends: friends.data
        })
      )
    });
  };
  //-------------------- END UTILITY METHODS -------------------

  //--------------------- BEGIN DOM METHODS --------------------
  // Begin DOM method /setJqueryMap/
  setJqueryMap = function () {
    var $container = stateMap.$append_target.find('#app-send-money');
    jqueryMap = { 
      $container    : $container,
      $friendList   : $container.find('#app-friend-list'),
      $sendMoneyBtn : $container.find('.app-send-money-btn')
    };
  };
  // End DOM method /setJqueryMap/
  //---------------------- END DOM METHODS ---------------------

  //------------------- BEGIN EVENT HANDLERS -------------------
  onSendBtnClick = function(){
    jqueryMap.$sendMoneyBtn.on('tap', function(){
      $.uriAnchor.setAnchor( { transactionHistory: 'opened' } );
    })
  }
  //-------------------- END EVENT HANDLERS --------------------

  //------------------- BEGIN PUBLIC METHODS -------------------
  // Begin public method /configModule/
  // Purpose    : Adjust configuration of allowed keys
  // Arguments  : A map of settable keys and values
  //   * color_name - color to use
  // Settings   :
  //   * configMap.settable_map declares allowed keys
  // Returns    : true
  // Throws     : none
  //
  configModule = function ( input_map ) {
    app.butil.setConfigMap({
      input_map    : input_map,
      settable_map : configMap.settable_map,
      config_map   : configMap
    });
    return true;
  };
  // End public method /configModule/

  // Begin public method /initModule/
  // Purpose    : Initializes module
  // Arguments  :
  //  * $container the jquery element used by this feature
  // Returns    : true
  // Throws     : none
  //
  initModule = function ( $append_target ) {
    var amountToSend = app.model.money.get_amount_to_send();
    stateMap.$append_target = $append_target;
    $append_target.append( configMap.main_html({
      amountToSend: amountToSend
    }));
    setJqueryMap();
    onSendBtnClick();
    onGetFriends();
    return true;
  };
  // End public method /initModule/

  // return public methods
  return {
    configModule : configModule,
    initModule   : initModule
  };
  //------------------- END PUBLIC METHODS ---------------------
}());
