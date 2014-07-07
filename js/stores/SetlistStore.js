var AppDispatcher = require( '../dispatcher/AppDispatcher' );
var EventEmitter = require( 'events' ).EventEmitter;
var SetlistConstants = require( '../constants/SetlistConstants' );
var merge = require( 'react/lib/merge' );
var $ = require( 'jquery' );

var CHANGE_EVENT = 'change';
var API_HOST = 'http://localhost:8089';

var setlists = null;

var SetlistStore = merge( EventEmitter.prototype, {
    getAll: function() {
        if ( !setlists ) {
            setlists = {};

            var setlistsData = $.ajax({
                url: API_HOST + '/setlists?group_id=1',
                async: false
            }).responseJSON;

            for ( var i = 0, len = setlistsData.length; i < len; i++ ) {
                setlists[ setlistsData[ i ].id ] = setlistsData[ i ];
            }
        }

        return setlists;
    },

    emitChange: function() {
        this.emit( CHANGE_EVENT );
    },

    addChangeListener: function( callback ) {
        this.on( CHANGE_EVENT, callback );
    },

    removeChangeListener: function( callback ) {
        this.removeListener( CHANGE_EVENT, callback );
    }
});

module.exports = SetlistStore;
