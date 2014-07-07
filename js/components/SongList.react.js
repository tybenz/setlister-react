var React = require( 'react' );
var merge = require( 'react/lib/merge' );
var SongListItemLarge = require( './SongListItemLarge.react' );

var SongList = React.createClass({
    render: function() {
        var songData = [];
        var songs = [];
        for ( var i in this.props.songs ) {
            if ( this.props.songs.hasOwnProperty( i ) ) {
                songData.push( this.props.songs[ i ] );
            }
        }

        songData.sort( function( a, b ) {
            if ( a.title > b.title ) {
              return 1;
            }
            if ( a.title < b.title ) {
              return -1;
            }
            // a must be equal to b
            return 0;
        });

        for ( var i = 0, len = songData.length; i < len; i++ ) {
            var songProps = songData[ i ];
            songs.push( SongListItemLarge( merge( { num: i + 1 }, songProps ) ) );
        }

        return React.DOM.table(
            { className: 'table table-striped table-hover song-list' },
            React.DOM.thead(
                {},
                React.DOM.tr(
                    { className: 'info' },
                    React.DOM.th(),
                    React.DOM.th( { className: 'name-header' }, 'Name' ),
                    React.DOM.th( {}, 'Key' ),
                    React.DOM.th( {}, 'Actions' )
                )
            ),
            React.DOM.tbody(
                {},
                songs
            )
        );
    }
});

module.exports = SongList;
