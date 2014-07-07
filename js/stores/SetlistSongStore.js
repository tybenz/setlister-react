var AppDispatcher = require( '../dispatcher/AppDispatcher' );
var EventEmitter = require( 'events' ).EventEmitter;
var SetlistConstants = require( '../constants/SetlistConstants' );
var merge = require( 'react/lib/merge' );
var $ = require( 'jquery' );

var CHANGE_EVENT = 'change';
var API_HOST = 'http://localhost:8089';

function update(id, updates) {
    return setlistSongs[ id ] = merge( setlistSongs[ id ], updates );
}

var setlistSongs = null;

var SetlistSongStore = merge( EventEmitter.prototype, {
    getAll: function() {
        if ( !setlistSongs ) {
            setlistSongs = {};

            var songs = $.ajax({
                url: API_HOST + '/setlist_songs?setlist_id=1',
                async: false
            }).responseJSON;

            for ( var i = 0, len = songs.length; i < len; i++ ) {
                var song = songs[ i ];
                song.capo = song.capo ? song.capo : 0;
                var newSong = merge(
                    {
                        key: song.key,
                        capo: song.capo,
                        id: song.id
                    },
                    merge( song.song, { capo: song.capo, key: song.key ? song.key : song.song.key } )
                );
                newSong.originalKey = song.song.key;

                setlistSongs[ newSong.id ] = newSong;
            }
        }

        return setlistSongs;
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
        case SetlistConstants.SETLIST_UPDATE_KEY:
            var song = update( action.id, { key: action.key } );
            break;
        case SetlistConstants.SETLIST_UPDATE_CAPO:
            var song = update( action.id, { capo: action.capo } );
            break;
        default: return true;
    }

    if ( song.id ) {
        // update
        $.ajax({
            url: API_HOST + '/setlist_songs/' + song.id,
            type: 'PUT',
            dataType: 'json',
            data: {
                capo: song.capo,
                key: song.key,
                index: song.index
            },
            success: function( data ) {
                console.log(data);
            }
        })
    } else {
        // create
    }

    SetlistSongStore.emitChange();

    return true;
});

module.exports = SetlistSongStore;
