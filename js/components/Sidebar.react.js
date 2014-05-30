var React = require( 'react' );
var SongListItem = require( './SongListItem.react' );

var Sidebar = React.createClass({
    render: function() {
        var songs = [];

        for ( var i in this.props.songs ) {
            if ( this.props.songs.hasOwnProperty( i ) ) {
                var song = this.props.songs[i];
                songs.push( SongListItem( { id: i, title: song.title } ) );
            }
        }

        return React.DOM.aside(
            { className: 'col-sm-3 master-list-col' },
            React.DOM.ul(
                { className: 'list-group nav' },
                songs
            )
        );
    }
});

module.exports = Sidebar;
