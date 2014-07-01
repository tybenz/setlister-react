var AppDispatcher = require( '../dispatcher/AppDispatcher' );
var EventEmitter = require( 'events' ).EventEmitter;
var SetlistConstants = require( '../constants/SetlistConstants' );
var merge = require( 'react/lib/merge' );
var $ = require( 'jquery' );

var CHANGE_EVENT = 'change';
var API_HOST = 'http://localhost:8089';

var _setlist = {
    1: {
        title: 'Our God',
        originalKey: 'G',
        key: 'G',
        capo: 2,
        text: 'INTRO:\nEm C G D\n\n\nVERSE 1:\nEm         D           G \nWater you turned into wine\nEm         D             G \nOpened the eyes of the blind\n                Am \nThere\'s no one like you\n           D \nNone like you\n\nVERSE 2:\n\nInto the darkness you shine\nOut of the ashes we rise\nThere\'s no one like you\nNone like you\n\nCHORUS:\nEm\nOur God is greater\nC\nOur God is stronger\nG                       D \nGod you are higher than any other\nEm\nOur God is healer\nC\nAwesome in power\n     G       D \nOur God our God\n\nBRIDGE:\nEm\nAnd if our God is for us\nC\nThen who could ever stop us\nG \nAnd if our God with us\nD \nThen what can stand against'
    },
    2: {
        title: 'Everything Glorious',
        originalKey: 'C',
        key: 'C',
        capo: 0,
        text: 'INTRO:  C   G   F\n\n\nVERSE 1:\nC            G          F\nThe day is brighter here with You\nC            G      F\nThe night is lighter than its hue\nC               G         F\nWould lead me to believe\nC                G         F\nWhich leads me to believe\n\n\nCHORUS:\nC                G                    F\nYou make everything glorious\nC                G                    F\nYou make everything glorious\nC                G                    F          C      G      F\nYou make everything glorious and I am Yours\n\nWhat does that make me?\n\n\nVERSE 2:\nC          G             F\nMy eyes are small but they have seen\nC          G       F\nThe beauty of enormous things\nC                G         F\nWhich leads me to believe\nC                G            F\nThere’s light enough to see that\n\n\nBRIDGE:\nAm           G/B       C             \nFrom glory to glory You are glorious\n           G\nYou are glorious\nF              G/B       C             \nFrom glory to glory You are glorious\n           G\nYou are glorious\nF\nWhich leads me to believe\n\nWhy I can believe that\n\n\nOUTRO:\nC          G  F     \nFrom glory to glory\n     C          G  F\nFrom glory to glory\nC                G     F\nYou are glorious, You are glorious\nC                G     F\nYou are glorious, You are glorious'
    }
};

function update(id, updates) {
    return _setlist[id] = merge(_setlist[id], updates);
}

var _setlist = null;

var SetlistStore = merge(EventEmitter.prototype, {
    getAll: function() {
        if ( !_setlist ) {
            _setlist = {};

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

                _setlist[ newSong.id ] = newSong;
            }
        }

        return _setlist;
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

    SetlistStore.emitChange();

    return true;
});

module.exports = SetlistStore;
