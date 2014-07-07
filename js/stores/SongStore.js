var AppDispatcher = require( '../dispatcher/AppDispatcher' );
var EventEmitter = require( 'events' ).EventEmitter;
var SongConstants = require( '../constants/SongConstants' );
var merge = require( 'react/lib/merge' );
var $ = require( 'jquery' );

var CHANGE_EVENT = 'change';
var API_HOST = 'http://localhost:8089';

function update(id, updates) {
    return _songs[id] = merge( _songs[id], updates );
}

var _songs = null;

var SongStore = merge(EventEmitter.prototype, {
    getAll: function() {
        if ( !_songs ) {
            _songs = {};

            var songs = $.ajax({
                url: API_HOST + '/songs',
                type: 'get',
                async: false
            }).responseJSON;

            for ( var i = 0, len = songs.length; i < len; i++ ) {
                var song = songs[ i ];
                song.dataKey = song.key;
                delete song.key;

                _songs[ song.id ] = song;
            }
        }

        return _songs;
    },

    emitChange: function() {
        this.emit(CHANGE_EVENT);
    },

    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }
});

AppDispatcher.register( function( payload ) {
    var action = payload.action;

    switch ( action.actionType ) {
        // case SongConstants.SONG_UPDATE_CAPO:
        //     var song = update( action.id, { capo: action.capo } );
        //     break;
        default: return true;
    }

    SongStore.emitChange();

    return true;
});

module.exports = SongStore;
