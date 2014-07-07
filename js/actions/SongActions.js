var AppDispatcher = require( '../dispatcher/AppDispatcher' );
var SongConstants = require( '../constants/SongConstants' );

var SongActions = {
    openSetlistPopover: function( id ) {
        AppDispatcher.handleViewAction({
            actionType: SongConstants.OPEN_SETLIST_POPOVER,
            id: id
        });
    }
};

module.exports = SongActions;
