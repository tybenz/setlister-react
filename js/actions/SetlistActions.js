var AppDispatcher = require( '../dispatcher/AppDispatcher' );
var SetlistConstants = require( '../constants/SetlistConstants' );

var SetlistActions = {
    updateKey: function( id, key ) {
        AppDispatcher.handleViewAction({
            actionType: SetlistConstants.SETLIST_UPDATE_KEY,
            id: id,
            key: key
        });
    }
};

module.exports = SetlistActions;
