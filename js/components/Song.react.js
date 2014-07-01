var React = require( 'react' );
var SongSidebar = require( './SongSidebar.react' );
var SongText = require( './SongText.react' );

var Song = React.createClass({
    render: function() {
        var capo = this.props.capo;

        return React.DOM.article(
            { className: 'panel panel-primary song' },
            React.DOM.div(
                { className: 'panel-heading' },
                React.DOM.div(
                    { className: 'capo-label' },
                    capo ? ( 'Capo: ' + capo ) : ''
                ),
                React.DOM.h3(
                    { className: 'panel-title' },
                    this.props.title
                )
            ),
            React.DOM.div(
                { className: 'panel-body' },
                // this._chordsHtml(),
                SongText( { text: this.props.text, originalKey: this.props.originalKey, dataKey: this.props.dataKey, capo: this.props.capo } ),
                SongSidebar( { songId: this.props.id, dataKey: this.props.dataKey, capo: this.props.capo } )
            )
        );
    }
});

module.exports = Song;
